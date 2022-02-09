import { Tab, TabList, TabPanel, TabPanels, Tabs, Grid, Container, Heading, Stack, CircularProgress } from '@chakra-ui/react';
import Head from 'next/head';
import Product from '../components/Product';
import { useCart } from '../context/cart';

import commerce from "../lib/commerce";

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list({sortBy: 'price'});

  return {
    props: {
      categories,
      products,
    },
  };
}

const Home = ({ categories, products }) => {

  const {isLoading} = useCart();

  if(isLoading){
    return (
      <Grid h='full' justifyItems={'center'} alignContent={'center'}>
        <Heading fontSize={'5xl'} textAlign={'center'}>Loading...</Heading>
        <CircularProgress isIndeterminate color='green.300' />
      </Grid>
    )
  }

  return (
    <Container h='full' maxW='container.xl' mx='auto' my={8}>
      <Head>
        <title>Kommerce | Home</title>
        <meta name="description" content="Kommerce store homepage." />
      </Head>
      <Tabs isFitted variant='enclosed'>
        <TabList>
          {categories.map(category=><Tab key={category.id} fontWeight={'bold'} fontSize={'lg'}>{category.name}</Tab>)}
        </TabList>
        <TabPanels>
          {categories.map((category)=>(
            <TabPanel key={category.id} px={0}>
              <Grid gap={4} templateColumns={{base: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)'}}>
                {products.map(product=> {
                  const productCategoryName = product.categories[0]?.name ?? 'undefined';
                  if(productCategoryName.includes(category.name)) return <Product key={product.id} {...product}/>
                })}
              </Grid>
            </TabPanel>
            ))
          }
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Home;