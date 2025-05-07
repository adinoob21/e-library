'use client'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Link,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  type: 'admin' | 'student'
  onSwitchType: () => void
}

export default function LoginForm({ type, onSwitchType }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const gradient = useColorModeValue(
    'linear(to-r, brand.500, brand.600)',
    'linear(to-r, brand.300, brand.400)'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // Sample credentials for demonstration
      if (type === 'student') {
        if (email === 'student@example.com' && password === 'student123') {
          toast({
            title: 'Login successful',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          router.push('/')
        } else {
          setError('Invalid email or password')
        }
      } else {
        if (email === 'admin@example.com' && password === 'admin123') {
          toast({
            title: 'Login successful',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          router.push('/admin')
        } else {
          setError('Invalid email or password')
        }
      }
    } catch (err) {
      setError('An error occurred during login')
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="md" py={20}>
      <Box
        p={8}
        bg={bgColor}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading
              size="xl"
              bgGradient={gradient}
              bgClip="text"
              mb={2}
            >
              {type === 'admin' ? 'Admin Login' : 'Student Login'}
            </Heading>
            <Text color="gray.500">Sign in to your account</Text>
          </Box>

          <Box textAlign="center">
            <Text color="gray.500">
              {type === 'admin' ? 'Sample Admin Credentials' : 'Sample Student Credentials'}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Email: {type === 'admin' ? 'admin@example.com' : 'student@example.com'}<br />
              Password: {type === 'admin' ? 'admin123' : 'student123'}
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!error}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  isDisabled={isLoading}
                />
              </FormControl>

              <FormControl isInvalid={!!error}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    isDisabled={isLoading}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      isDisabled={isLoading}
                    />
                  </InputRightElement>
                </InputGroup>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                width="full"
                mt={4}
                isLoading={isLoading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>

              <Button
                variant="outline"
                colorScheme="brand"
                width="full"
                mt={2}
                onClick={onSwitchType}
                type="button"
              >
                {type === 'admin' 
                  ? 'Are you a student? Sign in here' 
                  : 'Are you an admin? Sign in here'}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  )
} 