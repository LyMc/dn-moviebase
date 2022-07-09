import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="purple.300">
      <Container>
        <Stack
          as="nav"
          direction={['column', , 'row']}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
          <Image src='/favicon.ico' h="50px" alt="icon" />
            <MenuItem href="/">
              <Heading size="lg" ml={2}  me={20}>Moviebase</Heading>
            </MenuItem>

            <Box display={['block', , 'none']} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={['column', , 'row']}
            justify="start"
            align={['start', , 'center']}
            display={[isOpen ? 'flex' : 'none', , 'flex']}
            spacing={10}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/" disabled>
              Watchlist
            </MenuItem>
            <MenuItem href="/" disabled>
              History
            </MenuItem>
          </Stack>

          <Spacer />

          <Box display={[isOpen ? 'block' : 'none', , 'block']}>
            <MenuItem href="/" variant="outline" disabled>
              What to watch
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
