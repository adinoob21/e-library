'use client'
import { Box, Image, Text, Badge, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

interface BookCardProps {
  title: string
  author: string
  coverImage: string
  rating: number
  category: string
}

export default function BookCard({ title, author, coverImage, rating, category }: BookCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      maxW="240px"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      cursor="pointer"
      bg={bgColor}
    >
      <Box position="relative" h="300px">
        <Image
          src={coverImage || "https://via.placeholder.com/150"}
          alt={title}
          h="100%"
          w="100%"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: 'scale(1.05)' }}
        />
        <Badge
          position="absolute"
          top="2"
          right="2"
          borderRadius="full"
          px="3"
          py="1"
          colorScheme="brand"
          fontSize="xs"
        >
          {category}
        </Badge>
      </Box>

      <Box p="4">
        <VStack align="start" spacing={2}>
          <Text
            fontWeight="bold"
            fontSize="lg"
            noOfLines={2}
            color={useColorModeValue('gray.800', 'white')}
          >
            {title}
          </Text>

          <Text
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize="sm"
            noOfLines={1}
          >
            {author}
          </Text>

          <HStack spacing={1}>
            <FaStar color="gold" />
            <Text fontSize="sm" fontWeight="medium">
              {rating.toFixed(1)}/5
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
} 