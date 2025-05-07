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
  Progress,
  Badge,
} from '@chakra-ui/react'
import { sampleReadingActivities, sampleBooks, sampleStudents } from '../data'

export default function Analytics() {
  // Calculate statistics
  const totalBooks = sampleBooks.length
  const totalStudents = sampleStudents.length
  const totalActivities = sampleReadingActivities.length
  const completedActivities = sampleReadingActivities.filter(a => a.status === 'completed').length
  const readingActivities = sampleReadingActivities.filter(a => a.status === 'reading').length
  const overdueActivities = sampleReadingActivities.filter(a => a.status === 'overdue').length

  // Calculate completion rate
  const completionRate = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100) 
    : 0

  // Get most read books
  const bookReadCount = sampleReadingActivities.reduce((acc, activity) => {
    acc[activity.bookId] = (acc[activity.bookId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostReadBooks = Object.entries(bookReadCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([bookId, count]) => {
      const book = sampleBooks.find(b => b.id === bookId)
      return { title: book?.title || 'Unknown', count }
    })

  return (
    <Box>
      <Heading size="lg" mb={6}>Analytics Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
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

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Completion Rate</StatLabel>
              <StatNumber>{completionRate}%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {Math.round((completionRate / 100) * 2)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Reading Activity Status</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text>Completed</Text>
                  <Badge colorScheme="green">{completedActivities}</Badge>
                </HStack>
                <Progress value={(completedActivities / totalActivities) * 100} colorScheme="green" />
              </Box>
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text>Currently Reading</Text>
                  <Badge colorScheme="blue">{readingActivities}</Badge>
                </HStack>
                <Progress value={(readingActivities / totalActivities) * 100} colorScheme="blue" />
              </Box>
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text>Overdue</Text>
                  <Badge colorScheme="red">{overdueActivities}</Badge>
                </HStack>
                <Progress value={(overdueActivities / totalActivities) * 100} colorScheme="red" />
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Most Read Books</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {mostReadBooks.map((book, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text>{book.title}</Text>
                    <Badge colorScheme="purple">{book.count} reads</Badge>
                  </HStack>
                  <Progress 
                    value={(book.count / Math.max(...mostReadBooks.map(b => b.count))) * 100} 
                    colorScheme="purple" 
                  />
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  )
} 