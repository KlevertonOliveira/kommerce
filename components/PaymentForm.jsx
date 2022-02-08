import { Heading, Divider, Flex, Button, Box} from '@chakra-ui/react';
import OrderReview from './OrderReview';

import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentForm = ({checkoutToken, shippingData, onCaptureCheckout, backStep, nextStep, timeout}) => {

  async function handleSubmit(event, elements, stripe){
    event.preventDefault();

    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement}); 

    if(error) console.log(error);

    const {firstName, lastName, address1, email, city, zip, selectedSubdivision, selectedCountry, selectedOption} = shippingData;
    
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: { firstname: firstName, lastname: lastName, email},
      shipping: { 
        name: 'Primary', 
        street: address1, 
        town_city: city,
        county_state: selectedSubdivision,
        postal_zip_code: zip,
        country: selectedCountry
      },
      fullfilment: { shipping_method: selectedOption},
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id
        }
      }
    }

    onCaptureCheckout(checkoutToken.id, orderData);
    timeout();
    nextStep();
  }

  return (
    <>
      <OrderReview checkoutToken={checkoutToken}/>
      <Divider />
      <Box 
        as='section' 
        w='full'
        py={10}
        px={{base: 4, md: 6}}
      >
        <Heading fontSize={'2xl'} mb={4}>Payment Method</Heading>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {
              ({elements, stripe})=>(
                <form onSubmit={(e)=>handleSubmit(e, elements, stripe)}>
                  <Box bg='whiteAlpha.900' p={4}>
                    <CardElement />
                  </Box>
                  <br /> <br/>
                  <Flex justifyContent={'space-between'}>
                    <Button colorScheme={'red'} onClick={()=>backStep()}>Back</Button>
                    <Button colorScheme={'blue'} type='submit' disabled={!stripe}>
                      Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Button>
                  </Flex>
                </form>
              )
            }
          </ElementsConsumer>
        </Elements>
      </Box>
    </>
  )
};

export default PaymentForm;