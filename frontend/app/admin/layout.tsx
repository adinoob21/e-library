'use client'
import { Box, Flex, VStack, Text, Icon, useColorModeValue } from '@chakra-ui/react'
import { 
  FaBook, 
  FaUsers, 
  FaChartLine, 
  FaHistory, 
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface NavItemProps {
  icon: any
  label: string
  href: string
}

function NavItem({ icon, label, href }: NavItemProps) {
  const bgColor = useColorModeValue('brand.50', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900')

  return (
    <Link href={href}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: bgColor,
          color: textColor,
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          as={icon}
        />
        {label}
      </Flex>
    </Link>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogout = () => {
    router.push('/admin-login')
  }

  return (
    <Flex minH="100vh">
      <Box
        w="280px"
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        py={8}
      >
        <VStack spacing={6} align="stretch">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="brand.500"
            px={4}
            mb={4}
          >
            Admin Panel
          </Text>
          
          <NavItem icon={FaBook} label="Books Management" href="/admin/books" />
          <NavItem icon={FaUsers} label="Students" href="/admin/students" />
          <NavItem icon={FaHistory} label="Reading Activities" href="/admin/activities" />
          <NavItem icon={FaChartLine} label="Analytics" href="/admin/analytics" />
          <NavItem icon={FaCog} label="Settings" href="/admin/settings" />
          
          <Box mt="auto" px={4}>
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              color="red.500"
              onClick={handleLogout}
              _hover={{
                bg: 'red.50',
              }}
            >
              <Icon
                mr="4"
                fontSize="16"
                as={FaSignOutAlt}
              />
              Logout
            </Flex>
          </Box>
        </VStack>
      </Box>

      <Box flex={1} p={8}>
        {children}
      </Box>
    </Flex>
  )
} 