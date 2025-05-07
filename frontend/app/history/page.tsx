'use client'
import { Box, Flex, VStack, Text, Heading, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

// Sample reading history
const readingHistory = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    lastRead: "2023-05-15",
    progress: "75%"
  },
  {
    title: "1984",
    author: "George Orwell",
    lastRead: "2023-04-20",
    progress: "100%"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    lastRead: "2023-03-10",
    progress: "100%"
  }
];

export default function HistoryPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')
  const tableBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex flex={1}>
        <Sidebar />
        <Box flex={1} p={6} bg={bgColor}>
          <VStack spacing={6} align="stretch">
            <Heading color={textColor}>Reading History</Heading>
            {readingHistory.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple" bg={tableBg} borderRadius="lg">
                  <Thead>
                    <Tr>
                      <Th color={textColor}>Title</Th>
                      <Th color={textColor}>Author</Th>
                      <Th color={textColor}>Last Read</Th>
                      <Th color={textColor}>Progress</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {readingHistory.map((book, index) => (
                      <Tr key={index} borderBottomWidth="1px" borderColor={borderColor}>
                        <Td color={textColor}>{book.title}</Td>
                        <Td color={textColor}>{book.author}</Td>
                        <Td color={textColor}>{book.lastRead}</Td>
                        <Td color={textColor}>{book.progress}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Text color={textColor} fontSize="lg">
                No reading history yet. Start reading some books!
              </Text>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
} 