'use client'
import { Box, Flex, Grid, VStack, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import BookCard from '../components/BookCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

// Sample bookmarked books
const bookmarkedBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.5,
    category: "Classic"
  },
  {
    title: "1984",
    author: "George Orwell",
    coverImage: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.8,
    category: "Science Fiction"
  }
];

export default function BookmarkedPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex flex={1}>
        <Sidebar />
        <Box flex={1} p={6} bg={bgColor}>
          <VStack spacing={6} align="stretch">
            <Heading color={textColor}>Bookmarked Books</Heading>
            {bookmarkedBooks.length > 0 ? (
              <Grid
                templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                gap={6}
              >
                {bookmarkedBooks.map((book, index) => (
                  <BookCard key={index} {...book} />
                ))}
              </Grid>
            ) : (
              <Text color={textColor} fontSize="lg">
                No bookmarked books yet. Start bookmarking your favorite books!
              </Text>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
} 