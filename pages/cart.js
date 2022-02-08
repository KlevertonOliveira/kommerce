import { useCart } from '../context/cart';
import { Box, Flex, Container, Heading, Text, Button, Table, Thead, Tr, Tbody, Th, useBreakpointValue, useToast, CircularProgress, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Grid } from '@chakra-ui/react';

import CartItem from '../components/CartItem';

import commerce from '../lib/commerce';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const CartPage = () => {

  const {cart, setCart, isLoading} = useCart();
  const toast = useToast();
  const router = useRouter();

  const responsiveQuantityWord = useBreakpointValue({base: 'Qty', sm: 'Quantity'});

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onAlertClose = () => setIsAlertOpen(false);
  const cancelRef = useRef();

  async function refreshCart(){
    let title, status, description;

    try{
      const {cart: newCart} = await commerce.cart.refresh();
      setCart(newCart);

      title='Cart Emptied';
      status='success';
      description='The cart has been reset successfully.';
    }
    catch(error){
      title = 'Error!';
      status = 'error';
      description = 'An error has ocurred. Pleaase, try again later.'
    }
    
    toast({
      title,
      status,
      description,
      duration: 9000,
      isClosable: true,
    })
  }

  const isEmpty = !isLoading && !cart?.line_items.length;

  if(isLoading) return (
    <Grid h='full' justifyItems={'center'} alignContent={'center'}>
      <Heading fontSize={'5xl'} textAlign={'center'}>Loading...</Heading>
      <CircularProgress isIndeterminate color='green.300' />
    </Grid>
  )

  if(isEmpty) return (
    <Grid h='full' justifyItems={'center'} alignContent={'center'} gap={16}>
      <Heading fontSize={{base: '4xl', md: '5xl'}} textAlign={'center'}>Your cart is empty!</Heading>
      <Button colorScheme={'red'} onClick={()=>router.push('/')}>Return to Shop</Button>
    </Grid>
  )

  return (
    <Flex h={'full'} direction={'column'}>  
      <Box bg={'whiteAlpha.200'} rounded={'sm'} py={4}>
        <Container h='full' maxW={{base: 'container.xl', md: 'container.lg'}} display={'flex'} alignItems={'center'}>
          <Heading size={'lg'}>Your Cart</Heading>
        </Container>
      </Box>

      <Flex flex={1} direction={'column'} justifyContent={'space-around'}>  
        <Container maxW={{base: 'container.xl', md: 'container.lg'}}>
          <Table p={4} size={{base: 'sm', md: 'md'}}>
            <Thead>
              <Tr bg='orange.600'>
                <Th></Th>
                <Th textAlign={'left'} color='white'>Product</Th>
                <Th textAlign={'left'} color='white'>Price</Th>
                <Th textAlign={{base: 'center', sm: 'left'}} color='white'>{responsiveQuantityWord}</Th>
                <Th textAlign={'left'} color='white'>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart?.line_items.map(item =><CartItem key={item.id} {...item} setCart={setCart}/>)}
            </Tbody>
          </Table>
        </Container>

        <Container maxW={{base: 'container.xl', md: 'container.lg'}}>
          <Flex 
            justifyContent={'space-between'} 
            bg={'whiteAlpha.200'}
            py={4}
            px={{base: 2, sm: 4, md: 8}}
            rounded={'md'}
            fontSize={'xl'}
            fontWeight={'bold'}
          >
            <Text>Subtotal:</Text>
            <Text>{cart?.subtotal.formatted_with_symbol}</Text>
          </Flex>
        </Container>

        <Container maxW={{base: 'container.xl', md: 'container.lg'}} >
          <Flex direction={{base: 'column', sm: 'row'}} justifyContent={{base: 'initial', sm: 'space-between'}} gap={2}>
            <Button 
              w={{base: 'full', sm: 'fit-content'}}
              colorScheme={'yellow'}
              onClick={()=>{setIsAlertOpen(true)}}
            >
              Empty Cart
            </Button>
            <Button 
              w={{base: 'full', sm: 'fit-content'}} 
              colorScheme={'blue'} 
              onClick={()=>{router.push('/checkout')}}
            >
              Go to Checkout
            </Button>
          </Flex>
        </Container>

        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Empty Cart
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onAlertClose}>
                  Cancel
                </Button>
                <Button colorScheme='yellow' onClick={refreshCart} ml={3}>
                  Yes, empty it
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Flex>
  )
};

export default CartPage;