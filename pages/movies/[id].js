import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  Divider,
} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';
import Layout from '../../components/Layout';
import HistoryButton from '../../components/HistoryButton';

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);


  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  const getRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  }

  const getStarRating = (rating) => {
    const starRating = [];

    for (let i = 0; i < Math.floor(rating); i++) {  
      starRating.push(<StarIcon key={i} color="yellow.500" />);
    }
    if (rating % 1 >= 0.5) {
      starRating.push(<StarIcon key={Math.floor(rating)} color="yellow.500" />);
    }
    return starRating;
  }


  return (
<>
<Stack direction={['column', 'row']} spacing={4}>
  <Heading as="h1"  fontSize='5xl'>{data.title}</Heading>
</Stack>
<Box>Original title: {data.original_title}</Box>
<Box mt='2'>
  <Tag colorScheme="purple" variant="solid" mr='3'>{data.release_date}</Tag>
  <Tag colorScheme="green" variant="solid">{getRuntime(data.runtime)}</Tag>
</Box>
    <Stack direction={['column', 'row']} spacing={4} mt='4'>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
        </HStack >
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>
      <Stack>
        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="blue" fontSize='md' variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box fontSize='md'>{data.overview}</Box>
        <Divider  bg='blue' />
        <Box> 
           {data.production_countries?.map((country, index)=>
          (<Text key={index}> Production countries: {country.name}</Text>
          ))}
        </Box>
        <Divider  bg='blue' />
        <Box>{getStarRating(data.vote_average)} {data.vote_average}/10 ({data.vote_count} reviews) </Box>
        </Stack> 
    </Stack>
    </>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}