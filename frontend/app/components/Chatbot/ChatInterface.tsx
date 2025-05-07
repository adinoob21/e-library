'use client'
import { 
  Box, 
  Flex, 
  Input, 
  Button, 
  IconButton, 
  Text, 
  VStack, 
  HStack,
  useColorModeValue,
  Avatar,
  CloseButton,
  Tooltip
} from '@chakra-ui/react'
import { FaPaperPlane, FaRobot, FaQuestionCircle } from 'react-icons/fa'
import { useState } from 'react'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: string
}

interface ChatInterfaceProps {
  onClose: () => void
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your ITPedia assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const botBg = useColorModeValue('brand.100', 'brand.800')
  const userBg = useColorModeValue('brand.500', 'brand.600')
  const userTextColor = 'white'
  const botTextColor = useColorModeValue('gray.800', 'white')
  const timestampColor = useColorModeValue('gray.500', 'gray.400')
  const inputTextColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const inputBgColor = useColorModeValue('white', 'gray.700')
  const inputBorderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          text: "I'm processing your request. Please wait a moment.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  return (
    <VStack h="full" spacing={0}>
      {/* Chat Header */}
      <Flex
        w="full"
        p={3}
        bg={bgColor}
        borderBottomWidth="1px"
        borderColor={borderColor}
        align="center"
        justify="space-between"
      >
        <HStack spacing={3}>
          <Avatar size="sm" icon={<FaRobot />} bg="brand.500" />
          <VStack spacing={0} align="start">
            <Text fontWeight="bold" fontSize="md" color={useColorModeValue('gray.800', 'white')}>Library Assistant</Text>
            <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>Ask me anything about books!</Text>
          </VStack>
        </HStack>
        <Tooltip label="Close chat" placement="left">
          <CloseButton onClick={onClose} />
        </Tooltip>
      </Flex>

      {/* Messages Area */}
      <Box 
        flex={1} 
        w="full" 
        p={4} 
        overflowY="auto" 
        bg={useColorModeValue('gray.50', 'gray.900')}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
            background: useColorModeValue('gray.100', 'gray.800'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('brand.500', 'brand.400'),
            borderRadius: '24px',
          },
        }}
      >
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Box
                maxW="85%"
                p={4}
                borderRadius="xl"
                bg={message.sender === 'user' ? userBg : botBg}
                color={message.sender === 'user' ? userTextColor : botTextColor}
                boxShadow="md"
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  ...(message.sender === 'user' 
                    ? { right: '-8px', borderLeft: '8px solid', borderColor: userBg }
                    : { left: '-8px', borderRight: '8px solid', borderColor: botBg }
                  ),
                }}
              >
                <Text fontSize="md" fontWeight="medium">
                  {message.text}
                </Text>
                <Text 
                  fontSize="xs" 
                  color={message.sender === 'user' ? 'whiteAlpha.800' : timestampColor}
                  mt={1}
                >
                  {message.timestamp}
                </Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Input Area */}
      <Flex
        w="full"
        p={3}
        bg={bgColor}
        borderTopWidth="1px"
        borderColor={borderColor}
      >
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          mr={2}
          borderRadius="full"
          borderWidth="2px"
          color={inputTextColor}
          bg={inputBgColor}
          borderColor={inputBorderColor}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
          _placeholder={{
            color: useColorModeValue('gray.500', 'whiteAlpha.400')
          }}
        />
        <Tooltip label="Send message">
          <IconButton
            aria-label="Send message"
            icon={<FaPaperPlane />}
            colorScheme="brand"
            onClick={handleSendMessage}
            borderRadius="full"
          />
        </Tooltip>
      </Flex>
    </VStack>
  )
}