import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { buildImageUrl } from '../utils/api';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  UnorderedList,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Box,
  Image,
  Stack,
  Flex,
  Grid,
  SimpleGrid,
  Center,
  Badge,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
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
    <InputGroup as="form" onSubmit={handleSearch}>
   <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
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
      {data.results.map(({ id, poster_path, title, release_date }) => (
          <Box maxW='280px' borderWidth='2px' borderRadius='lg' overflow='hidden' key={id}>
      <Link href={`/movies/${id}`} passHref>
        <Image src={buildImageUrl(poster_path)}
          height="330" layout="responsive"  alt={poster_path}/>
          </Link>
          <Link href={`/movies/${id}`} passHref>
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge>{release_date}</Badge>}
              >
             <Center
          fontWeight='semibold'
          fontSize='sm'
          padding='10px'
        >
          {title}
        </Center>
            </Button>
            </Link>
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

