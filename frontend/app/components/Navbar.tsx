'use client'
import { Box, Flex, Input, Button, IconButton, useColorModeValue, useColorMode, useToast } from '@chakra-ui/react'
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const toast = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  const { colorMode, toggleColorMode } = useColorMode()

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Search query is empty',
        description: 'Please enter a search term',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    toast({
      title: 'Searching...',
      description: `Searching for: ${searchQuery}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    })

    console.log('Searching for:', searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <Flex 
      as="nav" 
      align="center" 
      justify="space-between" 
      padding="1rem" 
      bg={bgColor}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Box 
        fontSize="xl" 
        fontWeight="bold" 
        color="brand.500"
        cursor="pointer"
        onClick={handleLogoClick}
        _hover={{ color: 'brand.600' }}
        transition="color 0.2s"
      >
        ITPedia
      </Box>

      <Flex maxW="400px" flex={1} mx={6}>
        <Input 
          placeholder="Search books..." 
          borderRadius="full"
          mr={2}
          bg={useColorModeValue('white', 'gray.700')}
          borderColor={useColorModeValue('gray.200', 'gray.600')}
          color={textColor}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          _placeholder={{
            color: useColorModeValue('gray.500', 'whiteAlpha.400')
          }}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
        />
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          borderRadius="full"
          colorScheme="brand"
          onClick={handleSearch}
        />
      </Flex>

      <Flex align="center" gap={2}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          colorScheme="brand"
          borderRadius="full"
        />
      </Flex>
    </Flex>
  )
} 