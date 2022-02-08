import { Flex, Grid, Text } from '@chakra-ui/react';
import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <Grid 
      minH={'100vh'}
      templateRows={'auto 1fr auto'}
      bg={'whiteAlpha.50'}
    >
      <Navbar />

      <main>{children}</main>

      <Flex 
        as='footer' 
        bg={'gray.900'}
        p={4}
        direction={'column'} 
        alignItems={'center'}
      >
        <Text fontWeight={'bold'} fontSize={'sm'}>
          &copy; Kleverton Oliveira 
        </Text>
        <Text fontWeight={'semibold'} fontSize={'sm'}>2022</Text>
      </Flex>
    </Grid>
  )
};

export default Layout;