'use client'
import { Box, Flex, VStack, Text, Heading, useColorModeValue, FormControl, FormLabel, Switch, Select, Button, useToast, useColorMode } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const [settings, setSettings] = useState({
    darkMode: colorMode === 'dark',
    fontSize: 'medium',
    emailNotifications: true,
    readingReminders: true
  })

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Update dark mode when settings change
  useEffect(() => {
    if (settings.darkMode !== (colorMode === 'dark')) {
      toggleColorMode()
    }
  }, [settings.darkMode])

  // Update font size when changed
  useEffect(() => {
    const root = document.documentElement
    switch (settings.fontSize) {
      case 'small':
        root.style.fontSize = '14px'
        break
      case 'medium':
        root.style.fontSize = '16px'
        break
      case 'large':
        root.style.fontSize = '18px'
        break
    }
  }, [settings.fontSize])

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))

    // Show toast notification for changes
    toast({
      title: 'Setting Updated',
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Here you would typically call your API to delete the account
      toast({
        title: 'Account Deletion Requested',
        description: 'Your account deletion request has been submitted.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex flex={1}>
        <Sidebar />
        <Box flex={1} p={6} bg={bgColor}>
          <VStack spacing={8} align="stretch" maxW="800px" mx="auto">
            <Heading color={textColor}>Settings</Heading>
            
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color={textColor}>Appearance</Heading>
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="dark-mode" mb="0" color={textColor}>
                    Dark Mode
                  </FormLabel>
                  <Switch 
                    id="dark-mode" 
                    colorScheme="brand" 
                    isChecked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Font Size</FormLabel>
                  <Select 
                    placeholder="Select font size" 
                    color={textColor}
                    value={settings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Select>
                </FormControl>
              </VStack>
            </Box>

            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color={textColor}>Notifications</Heading>
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="email-notifications" mb="0" color={textColor}>
                    Email Notifications
                  </FormLabel>
                  <Switch 
                    id="email-notifications" 
                    colorScheme="brand" 
                    isChecked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="reading-reminders" mb="0" color={textColor}>
                    Reading Reminders
                  </FormLabel>
                  <Switch 
                    id="reading-reminders" 
                    colorScheme="brand" 
                    isChecked={settings.readingReminders}
                    onChange={(e) => handleSettingChange('readingReminders', e.target.checked)}
                  />
                </FormControl>
              </VStack>
            </Box>

            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color={textColor}>Account</Heading>
                
                <Button 
                  colorScheme="red" 
                  variant="outline"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
} 