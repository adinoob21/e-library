'use client'
import { VStack, Box, Stack, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { FaBook, FaBookmark, FaHistory, FaHeart, FaCog } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('brand.50', 'gray.700')
  const iconColor = useColorModeValue('brand.500', 'brand.300')
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900')
  const titleColor = useColorModeValue('brand.500', 'brand.300')

  const menuItems = [
    { icon: FaBook, text: 'All Books', path: '/books' },
    { icon: FaBookmark, text: 'Bookmarked', path: '/bookmarked' },
    { icon: FaHistory, text: 'Reading History', path: '/history' },
    { icon: FaHeart, text: 'Favorites', path: '/favorites' },
    { icon: FaCog, text: 'Settings', path: '/settings' },
  ]

  return (
    <Box
      as="aside"
      w="280px"
      h="100vh"
      bg={bgColor}
      boxShadow="lg"
      py={8}
      position="sticky"
      top={0}
    >
      <VStack spacing={6} alignItems="stretch" px={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={titleColor}
          px={4}
          mb={4}
          cursor="pointer"
          onClick={() => router.push('/')}
          _hover={{ color: 'brand.600' }}
          transition="color 0.2s"
        >
          ITPedia
        </Text>
        <Stack spacing={1}>
          {menuItems.map((item, index) => (
            <Box 
              key={index}
              cursor="pointer"
              p={3}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              transition="all 0.2s"
              _hover={{ 
                bg: hoverBg,
                transform: 'translateX(4px)',
              }}
              onClick={() => router.push(item.path)}
            >
              <Icon 
                as={item.icon} 
                color={iconColor} 
                mr={3} 
                boxSize={5}
              />
              <Text
                fontSize="md"
                fontWeight="medium"
                color={textColor}
              >
                {item.text}
              </Text>
            </Box>
          ))}
        </Stack>
      </VStack>
    </Box>
  )
} 