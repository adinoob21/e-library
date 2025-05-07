'use client'
import { useState } from 'react'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Switch,
  Text,
  Divider,
  useToast,
  Card,
  CardHeader,
  CardBody,
  HStack,
} from '@chakra-ui/react'

export default function Settings() {
  const [settings, setSettings] = useState({
    libraryName: 'E-Library',
    maxBooksPerStudent: 3,
    loanDuration: 14,
    overdueFine: 1,
    notifications: true,
    theme: 'light',
    language: 'en',
  })

  const toast = useToast()

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // In a real application, this would save to a backend
    toast({
      title: 'Settings saved',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>Settings</Heading>

      <Card mb={6}>
        <CardHeader>
          <Heading size="md">General Settings</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Library Name</FormLabel>
              <Input
                value={settings.libraryName}
                onChange={(e) => handleChange('libraryName', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Theme</FormLabel>
              <Select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Language</FormLabel>
              <Select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Select>
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Card mb={6}>
        <CardHeader>
          <Heading size="md">Library Rules</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Maximum Books Per Student</FormLabel>
              <Input
                type="number"
                value={settings.maxBooksPerStudent}
                onChange={(e) => handleChange('maxBooksPerStudent', parseInt(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Loan Duration (days)</FormLabel>
              <Input
                type="number"
                value={settings.loanDuration}
                onChange={(e) => handleChange('loanDuration', parseInt(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Overdue Fine (per day)</FormLabel>
              <Input
                type="number"
                value={settings.overdueFine}
                onChange={(e) => handleChange('overdueFine', parseFloat(e.target.value))}
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Card mb={6}>
        <CardHeader>
          <Heading size="md">Notifications</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="medium">Email Notifications</Text>
                <Text fontSize="sm" color="gray.500">
                  Receive email notifications for important updates
                </Text>
              </Box>
              <Switch
                isChecked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      <Button colorScheme="brand" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  )
} 