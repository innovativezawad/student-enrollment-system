import React, { useState } from 'react'
import { supabase } from '@/config/supabase'
import { useToast } from '@/context/ToastContext'

interface PaymentModalProps {
  studentId: string
  onSuccess: () => void
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ studentId, onSuccess }) => {
  const [amount, setAmount] = useState('')
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!amount) {
        addToast('Please enter amount', 'warning')
        setLoading(false)
        return
      }

      // Add payment record
      const { error: paymentError } = await supabase.from('payments').insert([
        {
          student_id: studentId,
          amount: parseFloat(amount),
          payment_date: paymentDate,
          note: note || null,
        },
      ])

      if (paymentError) throw paymentError

      // Update student payment info
      const { data: paymentInfo } = await supabase
        .from('student_payment_info')
        .select('paid_amount')
        .eq('student_id', studentId)
        .single()

      if (paymentInfo) {
        const newPaidAmount = paymentInfo.paid_amount + parseFloat(amount)
        await supabase
          .from('student_payment_info')
          .update({ paid_amount: newPaidAmount })
          .eq('student_id', studentId)
      }

      addToast('Payment recorded successfully', 'success')
      onSuccess()
    } catch (error: any) {
      addToast(error.message || 'Failed to record payment', 'error')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Date
        </label>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note (Optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Add a note (e.g., Check number, payment method)"
          rows={3}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Recording...' : 'Record Payment'}
        </button>
      </div>
    </form>
  )
}
