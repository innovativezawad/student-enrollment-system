import React, { useState, useEffect } from 'react'
import { supabase } from '@/config/supabase'
import { useToast } from '@/context/ToastContext'
import { Student } from '@/types'

interface StudentFormProps {
  student: Student | null
  onSuccess: () => void
}

export const StudentForm: React.FC<StudentFormProps> = ({ student, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course_name: '',
    batch: '',
    admission_date: '',
  })
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        phone: student.phone,
        email: student.email || '',
        course_name: student.course_name,
        batch: student.batch,
        admission_date: student.admission_date,
      })
    }
  }, [student])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || !formData.phone || !formData.course_name || !formData.batch || !formData.admission_date) {
        addToast('Please fill in all required fields', 'warning')
        setLoading(false)
        return
      }

      if (student) {
        // Update
        const { error } = await supabase
          .from('students')
          .update(formData)
          .eq('id', student.id)

        if (error) throw error
        addToast('Student updated successfully', 'success')
      } else {
        // Create
        const { error } = await supabase.from('students').insert([formData])

        if (error) throw error
        addToast('Student added successfully', 'success')
      }

      onSuccess()
    } catch (error: any) {
      addToast(error.message || 'Operation failed', 'error')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Student name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Phone number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Email (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.course_name}
          onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Course name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Batch <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Batch (e.g., Batch 2024-01)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admission Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          required
          value={formData.admission_date}
          onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  )
}
