import NextLink from 'next/link';

import { useRouter } from 'next/router';
import { useCart } from '../context/cart';

import { Flex, IconButton, Link, Box, Icon, Text, Badge, Tooltip, Container } from '@chakra-ui/react';
import {FaShoppingCart} from 'react-icons/fa';
import {SiShopify} from 'react-icons/si';

const Navbar = () => {

  const {cart, isLoading} = useCart();
  const router = useRouter();

  if(isLoading) return <div />

  return (
    <Box
      as='nav'
      w='full'
      py={3}
      bg={'gray.900'}
    >
      <Container h='full' maxW='container.xl' mx='auto'>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Box>
            <NextLink href='/' passHref>
              <Link fontWeight={'bold'} _hover={{textDecoration:'none'}} _focus={{border: 'none'}}>
                <Flex gap={1} alignItems={'center'}>
                  <Icon as={SiShopify} h={5} w={5}/>
                  <Flex mt={2} fontSize={'xl'}>
                    <Text color={'orange.400'}>Ko</Text>
                    <Text>mmerce</Text>
                  </Flex>
                </Flex>
              </Link>
            </NextLink>
          </Box>
          
          {router.pathname!=='cart' && router.pathname!=='checkout' && (
            <NextLink href='/cart'>
              <a>
                <Tooltip label='Go to your cart'>
                  <Box position={'relative'}>
                    <Badge 
                      variant='solid' 
                      colorScheme={'green'} 
                      rounded={'full'}
                      position='absolute'
                      top={0}
                      fontSize={'md'}
                      right={'0.5'}
                    >
                      {cart?.total_unique_items ?? 0}
                    </Badge>
                    <IconButton 
                      aria-label='Your Shopping Cart' 
                      icon={<FaShoppingCart/>} 
                      size='lg' 
                    />
                  </Box>
                </Tooltip>
              </a>
            </NextLink>
          )}
        </Flex>
      </Container>
    </Box>
  )
};

export default Navbar;