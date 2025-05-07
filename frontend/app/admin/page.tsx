'use client'
import {
  Box,
  Grid,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Badge,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { sampleReadingActivities, sampleBooks, sampleStudents } from './data'

export default function AdminDashboard() {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Calculate statistics
  const totalBooks = sampleBooks.length
  const totalStudents = sampleStudents.length
  const totalActivities = sampleReadingActivities.length
  const recentActivities = sampleReadingActivities.slice(-5).reverse()

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

  return (
    <Box>
      <Heading size="lg" mb={6}>Dashboard Overview</Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Books</StatLabel>
              <StatNumber>{totalBooks}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {Math.round((totalBooks / 100) * 5)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Students</StatLabel>
              <StatNumber>{totalStudents}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {Math.round((totalStudents / 100) * 3)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Reading Activities</StatLabel>
              <StatNumber>{totalActivities}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {Math.round((totalActivities / 100) * 7)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Recent Activities</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {recentActivities.map((activity) => (
                <Box
                  key={activity.id}
                  p={4}
                  bg={bgColor}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">
                        {getStudentName(activity.studentId)} is reading {getBookTitle(activity.bookId)}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Started: {activity.startDate}
                      </Text>
                    </VStack>
                    <Badge colorScheme={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Quick Actions</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Button
                colorScheme="brand"
                onClick={() => router.push('/admin/books')}
              >
                Manage Books
              </Button>
              <Button
                colorScheme="brand"
                onClick={() => router.push('/admin/students')}
              >
                Manage Students
              </Button>
              <Button
                colorScheme="brand"
                onClick={() => router.push('/admin/activities')}
              >
                View Reading Activities
              </Button>
              <Button
                colorScheme="brand"
                onClick={() => router.push('/admin/analytics')}
              >
                View Analytics
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  )
} 