'use client'
import { Box, Flex, Grid, VStack, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import BookCard from '../components/BookCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

// Sample book data
const sampleBooks = [
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
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.7,
    category: "Classic"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    category: "Fantasy"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.6,
    category: "Romance"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.3,
    category: "Classic"
  }
];

export default function BooksPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex flex={1}>
        <Sidebar />
        <Box flex={1} p={6} bg={bgColor}>
          <VStack spacing={6} align="stretch">
            <Heading color={textColor}>All Books</Heading>
            <Grid
              templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
              gap={6}
            >
              {sampleBooks.map((book, index) => (
                <BookCard key={index} {...book} />
              ))}
            </Grid>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
} 