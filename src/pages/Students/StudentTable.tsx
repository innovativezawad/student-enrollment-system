import React from 'react'
import { Student } from '@/types'
import { Edit, Trash2, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (id: string) => void
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
  const navigate = useNavigate()

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No students found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Batch</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Admission</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.course_name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.batch}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(student.admission_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => navigate(`/students/${student.id}`)}
                    className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="p-2 hover:bg-yellow-100 rounded-lg text-yellow-600 transition"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
