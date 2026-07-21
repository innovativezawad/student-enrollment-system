import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import { useToast } from '@/context/ToastContext'
import { Student } from '@/types'
import { Plus, Search, Filter } from 'lucide-react'
import { StudentTable } from './StudentTable'
import { StudentForm } from './StudentForm'
import { Modal } from '@/components/Modal'

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [courses, setCourses] = useState<string[]>([])
  const { addToast } = useToast()

  useEffect(() => {
    fetchStudents()
    fetchCourses()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [students, searchTerm, courseFilter])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (error: any) {
      addToast('Failed to load students', 'error')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('course_name')
        .not('course_name', 'is', null)

      if (error) throw error
      
      const uniqueCourses = [...new Set(data?.map((s) => s.course_name) || [])]
      setCourses(uniqueCourses as string[])
    } catch (error: any) {
      console.error('Error:', error)
    }
  }

  const filterStudents = () => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.phone.includes(searchTerm)
      )
    }

    if (courseFilter) {
      filtered = filtered.filter((s) => s.course_name === courseFilter)
    }

    setFilteredStudents(filtered)
  }

  const handleAdd = () => {
    setEditingStudent(null)
    setIsFormOpen(true)
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return

    try {
      const { error } = await supabase.from('students').delete().eq('id', id)
      if (error) throw error

      setStudents((prev) => prev.filter((s) => s.id !== id))
      addToast('Student deleted successfully', 'success')
    } catch (error: any) {
      addToast('Failed to delete student', 'error')
      console.error('Error:', error)
    }
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  const handleFormSuccess = () => {
    handleFormClose()
    fetchStudents()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-2">Manage student enrollments</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-gray-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="flex-1 outline-none text-gray-900 cursor-pointer"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        size="medium"
      >
        <StudentForm student={editingStudent} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  )
}
