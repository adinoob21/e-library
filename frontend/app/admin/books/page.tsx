'use client'
import { useState } from 'react'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { FaPlus, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import { sampleBooks, Book } from '../data'

export default function BooksManagement() {
  const [books, setBooks] = useState<Book[]>(sampleBooks)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleAddBook = () => {
    setSelectedBook(null)
    onOpen()
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    onOpen()
  }

  const handleDeleteBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId))
    toast({
      title: 'Book deleted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newBook: Book = {
      id: selectedBook?.id || String(books.length + 1),
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      isbn: formData.get('isbn') as string,
      totalCopies: Number(formData.get('totalCopies')),
      availableCopies: Number(formData.get('availableCopies')),
      publishedYear: Number(formData.get('publishedYear')),
      addedDate: new Date().toISOString().split('T')[0],
    }

    if (selectedBook) {
      setBooks(books.map(book => book.id === selectedBook.id ? newBook : book))
      toast({
        title: 'Book updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      setBooks([...books, newBook])
      toast({
        title: 'Book added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }

    onClose()
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Books Management</Heading>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="brand"
          onClick={handleAddBook}
        >
          Add New Book
        </Button>
      </Flex>

      <Box bg="white" borderRadius="lg" boxShadow="sm" p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Category</Th>
              <Th>ISBN</Th>
              <Th>Copies</Th>
              <Th>Available</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td>{book.title}</Td>
                <Td>{book.author}</Td>
                <Td>{book.category}</Td>
                <Td>{book.isbn}</Td>
                <Td>{book.totalCopies}</Td>
                <Td>{book.availableCopies}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaEllipsisV />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FaEdit />}
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<FaTrash />}
                        color="red.500"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedBook ? 'Edit Book' : 'Add New Book'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    defaultValue={selectedBook?.title}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Author</FormLabel>
                  <Input
                    name="author"
                    defaultValue={selectedBook?.author}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input
                    name="category"
                    defaultValue={selectedBook?.category}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>ISBN</FormLabel>
                  <Input
                    name="isbn"
                    defaultValue={selectedBook?.isbn}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Copies</FormLabel>
                  <Input
                    name="totalCopies"
                    type="number"
                    defaultValue={selectedBook?.totalCopies}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Available Copies</FormLabel>
                  <Input
                    name="availableCopies"
                    type="number"
                    defaultValue={selectedBook?.availableCopies}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Published Year</FormLabel>
                  <Input
                    name="publishedYear"
                    type="number"
                    defaultValue={selectedBook?.publishedYear}
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="brand" width="full">
                  {selectedBook ? 'Update Book' : 'Add Book'}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 