import { Center, Heading } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { Box } from "@chakra-ui/react"


export default function Home() {
  return (
<>
    <Box bgImage="url('/img_bg2.jpg')" bgSize="cover" bgRepeat='no-repeat'>
      <Layout title="Moviebase">
        <Center h="full">
        <Heading as="h1" color='white'>Moviebase is up and running</Heading>
        </Center>
      </Layout> 
      </Box>
      </>
  );
}
