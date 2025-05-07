'use client'
import { useState } from 'react'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from '@chakra-ui/react'
import { FaPlus, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import { sampleStudents, Student } from '../data'

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>(sampleStudents)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleAddStudent = () => {
    setSelectedStudent(null)
    onOpen()
  }

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student)
    onOpen()
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId))
    toast({
      title: 'Student deleted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newStudent: Student = {
      id: selectedStudent?.id || String(students.length + 1),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      studentId: formData.get('studentId') as string,
      department: formData.get('department') as string,
      joinDate: formData.get('joinDate') as string,
      totalBooksRead: selectedStudent?.totalBooksRead || 0,
    }

    if (selectedStudent) {
      setStudents(students.map(student => student.id === selectedStudent.id ? newStudent : student))
      toast({
        title: 'Student updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      setStudents([...students, newStudent])
      toast({
        title: 'Student added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }

    onClose()
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Students Management</Heading>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="brand"
          onClick={handleAddStudent}
        >
          Add New Student
        </Button>
      </Flex>

      <Box bg="white" borderRadius="lg" boxShadow="sm" p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Student ID</Th>
              <Th>Department</Th>
              <Th>Join Date</Th>
              <Th>Books Read</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student.id}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.studentId}</Td>
                <Td>{student.department}</Td>
                <Td>{student.joinDate}</Td>
                <Td>
                  <Badge colorScheme="green">{student.totalBooksRead}</Badge>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaEllipsisV />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FaEdit />}
                        onClick={() => handleEditStudent(student)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<FaTrash />}
                        color="red.500"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedStudent ? 'Edit Student' : 'Add New Student'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    defaultValue={selectedStudent?.name}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    defaultValue={selectedStudent?.email}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Student ID</FormLabel>
                  <Input
                    name="studentId"
                    defaultValue={selectedStudent?.studentId}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Input
                    name="department"
                    defaultValue={selectedStudent?.department}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Join Date</FormLabel>
                  <Input
                    name="joinDate"
                    type="date"
                    defaultValue={selectedStudent?.joinDate}
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="brand" width="full">
                  {selectedStudent ? 'Update Student' : 'Add Student'}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 