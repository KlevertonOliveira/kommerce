import { Box, Flex, Grid, Text } from '@chakra-ui/react';
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
        fontWeight={'bold'} fontSize={'sm'}
      >
        <Text>
          &copy; {' '} 
          <Box display={'inline'} color='orange.400'>K</Box>
          leverton {' '}
          <Box display={'inline'} color='orange.400'>O</Box>
          liveira 
        </Text>
        <Text>
          20
          <Box display={'inline'} color='orange.400'>22</Box>
        </Text>
      </Flex>
    </Grid>
  )
};

export default Layout;