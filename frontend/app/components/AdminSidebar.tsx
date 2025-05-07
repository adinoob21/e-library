'use client'
import { VStack, Box, Stack, Icon, Text, useColorModeValue, Flex, Avatar, Heading } from '@chakra-ui/react'
import { FaBook, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaUserShield } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function AdminSidebar() {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('brand.50', 'gray.700')
  const activeColor = useColorModeValue('brand.500', 'brand.300')
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900')
  const iconColor = useColorModeValue('brand.500', 'brand.300')
  const titleColor = useColorModeValue('brand.500', 'brand.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const gradient = useColorModeValue(
    'linear(to-r, brand.500, brand.600)',
    'linear(to-r, brand.300, brand.400)'
  )

  const menuItems = [
    { icon: FaBook, text: 'Manage Books', path: '/admin/books' },
    { icon: FaUsers, text: 'Manage Users', path: '/admin/users' },
    { icon: FaChartBar, text: 'Analytics', path: '/admin/analytics' },
    { icon: FaCog, text: 'Settings', path: '/admin/settings' },
    { icon: FaSignOutAlt, text: 'Switch to Student View', path: '/' },
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
      borderRight="1px solid"
      borderColor={borderColor}
    >
      <VStack spacing={8} alignItems="stretch" px={4}>
        <Flex direction="column" align="center" mb={4}>
          <Avatar
            size="xl"
            name="Admin User"
            bgGradient={gradient}
            color="white"
            mb={4}
          />
          <Heading size="md" color={titleColor}>Admin User</Heading>
          <Text fontSize="sm" color="gray.500">Administrator</Text>
        </Flex>

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

        <Box 
          mt="auto" 
          p={4} 
          borderRadius="lg" 
          bg={hoverBg}
          border="1px solid"
          borderColor={borderColor}
        >
          <Flex align="center">
            <Icon as={FaUserShield} color={iconColor} mr={3} boxSize={5} />
            <Box>
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                Admin Panel
              </Text>
              <Text fontSize="xs" color="gray.500">
                Version 1.0.0
              </Text>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>
  )
} 