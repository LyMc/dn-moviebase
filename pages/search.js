import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { buildImageUrl } from '../utils/api';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Container,
  Progress,
  Text,
  VStack,
  Button,
  Box,
  Image,
  SimpleGrid,
  Center,
  Badge,
} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';
import Layout from '../components/Layout';

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };  
  return (
    <>
    </>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  
  return (
<SimpleGrid minChildWidth='180px' spacing='40px'>
      {data.results.map(({ id, poster_path, title, release_date, vote_average }) => (
          <Box maxW='280px' borderWidth='2px' borderRadius='lg' overflow='hidden' key={id}>
    
      <Link href={`/movies/${id}`} passHref>
        <Image src={buildImageUrl(poster_path)}
          height="330" layout="responsive"  alt={poster_path}/>
          </Link>
          <SimpleGrid columns={[1, 1, 1, 1]} spacing={2}>
          <Link href={`/movies/${id}`} passHref>
             <Text fontWeight='semibold' fontSize='md' padding='10px'>
          {title} ({release_date})
          <StarIcon ml='2' mr='1' size='sm'/>
          <Badge variantColor='green' variant='solid'>{vote_average}</Badge>
      </Text>
      </Link>
            </SimpleGrid>
        </Box>
      ))}
</SimpleGrid>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}

