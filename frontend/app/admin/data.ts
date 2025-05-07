export interface Book {
  id: string
  title: string
  author: string
  category: string
  isbn: string
  totalCopies: number
  availableCopies: number
  publishedYear: number
  addedDate: string
}

export interface Student {
  id: string
  name: string
  email: string
  studentId: string
  department: string
  joinDate: string
  totalBooksRead: number
}

export interface ReadingActivity {
  id: string
  studentId: string
  bookId: string
  startDate: string
  endDate: string | null
  status: 'reading' | 'completed' | 'overdue'
}

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    isbn: '9780743273565',
    totalCopies: 5,
    availableCopies: 3,
    publishedYear: 1925,
    addedDate: '2023-01-15'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    category: 'Science Fiction',
    isbn: '9780451524935',
    totalCopies: 4,
    availableCopies: 2,
    publishedYear: 1949,
    addedDate: '2023-02-20'
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Classic',
    isbn: '9780446310789',
    totalCopies: 6,
    availableCopies: 4,
    publishedYear: 1960,
    addedDate: '2023-03-10'
  }
]

export const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    studentId: 'STU001',
    department: 'Computer Science',
    joinDate: '2023-01-01',
    totalBooksRead: 5
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    studentId: 'STU002',
    department: 'Electrical Engineering',
    joinDate: '2023-02-15',
    totalBooksRead: 3
  }
]

export const sampleReadingActivities: ReadingActivity[] = [
  {
    id: '1',
    studentId: '1',
    bookId: '1',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    status: 'completed'
  },
  {
    id: '2',
    studentId: '2',
    bookId: '2',
    startDate: '2023-04-10',
    endDate: null,
    status: 'reading'
  }
] 