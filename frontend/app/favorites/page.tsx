'use client'
import { Box, Flex, Grid, VStack, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import BookCard from '../components/BookCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

// Sample favorite books
const favoriteBooks = [
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
  }
];

export default function FavoritesPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex flex={1}>
        <Sidebar />
        <Box flex={1} p={6} bg={bgColor}>
          <VStack spacing={6} align="stretch">
            <Heading color={textColor}>Favorite Books</Heading>
            {favoriteBooks.length > 0 ? (
              <Grid
                templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                gap={6}
              >
                {favoriteBooks.map((book, index) => (
                  <BookCard key={index} {...book} />
                ))}
              </Grid>
            ) : (
              <Text color={textColor} fontSize="lg">
                No favorite books yet. Start adding books to your favorites!
              </Text>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
} 