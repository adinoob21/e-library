'use client'
import { useState } from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
  Badge,
  Select,
  Input,
  HStack,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react'
import { sampleReadingActivities, sampleBooks, sampleStudents, ReadingActivity } from '../data'

export default function ReadingActivities() {
  const [activities, setActivities] = useState(sampleReadingActivities)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reading':
        return 'blue'
      case 'completed':
        return 'green'
      case 'overdue':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getStudentName = (studentId: string) => {
    const student = sampleStudents.find(s => s.id === studentId)
    return student ? student.name : 'Unknown'
  }

  const getBookTitle = (bookId: string) => {
    const book = sampleBooks.find(b => b.id === bookId)
    return book ? book.title : 'Unknown'
  }

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.status === filter
    const matchesSearch = search === '' || 
      getStudentName(activity.studentId).toLowerCase().includes(search.toLowerCase()) ||
      getBookTitle(activity.bookId).toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleAddActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newActivity: ReadingActivity = {
      id: String(activities.length + 1),
      studentId: formData.get('studentId') as string,
      bookId: formData.get('bookId') as string,
      startDate: formData.get('startDate') as string,
      endDate: null,
      status: 'reading'
    }

    setActivities([...activities, newActivity])
    toast({
      title: 'Reading activity added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    onClose()
  }

  const handleUpdateStatus = (activityId: string, newStatus: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, status: newStatus as 'reading' | 'completed' | 'overdue' }
        : activity
    ))
    toast({
      title: 'Status updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Reading Activities</Heading>
        <Button colorScheme="brand" onClick={onOpen}>
          Add New Activity
        </Button>
      </Flex>

      <HStack spacing={4} mb={6}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="200px"
        >
          <option value="all">All Status</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </Select>
        <Input
          placeholder="Search by student or book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="300px"
        />
      </HStack>

      <Box bg="white" borderRadius="lg" boxShadow="sm" p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student</Th>
              <Th>Book</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredActivities.map((activity) => (
              <Tr key={activity.id}>
                <Td>{getStudentName(activity.studentId)}</Td>
                <Td>{getBookTitle(activity.bookId)}</Td>
                <Td>{activity.startDate}</Td>
                <Td>{activity.endDate || '-'}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </Td>
                <Td>
                  <Select
                    value={activity.status}
                    onChange={(e) => handleUpdateStatus(activity.id, e.target.value)}
                    size="sm"
                    maxW="150px"
                  >
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </Select>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Reading Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleAddActivity}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Student</FormLabel>
                  <Select name="studentId" required>
                    {sampleStudents.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Book</FormLabel>
                  <Select name="bookId" required>
                    {sampleBooks.map(book => (
                      <option key={book.id} value={book.id}>
                        {book.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    name="startDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="brand" width="full">
                  Add Activity
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 