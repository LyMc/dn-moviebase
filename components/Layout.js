import Head from 'next/head';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
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
    Image,
    InputGroup,
    InputRightElement,
    Input,
    IconButton,
    Label,
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {HamburgerIcon} from '@chakra-ui/icons';

const MenuItem = ({
    href,
    children,
    ...props
}) => (
    <Link href={href} passHref>
        <Button as="a" variant="link" {...props}>
            {children}
        </Button>
    </Link>
);

function Header() {
    const {isOpen, onToggle} = useDisclosure();

    let style = {
        textDecoration: 'none'

    }

    const router = useRouter();
    const {terms} = router.query;
    const [text,
        setText] = useState('');

    // Update text input when route changes (ex when user goes back/forward)
    useEffect(() => {
        setText(terms || '');
    }, [terms]);

    // Update router history if a search was performed
    const handleSearch = (event) => {
        event.preventDefault();
        if (text !== terms) {
            router.push(`/search/?terms=${text}`, undefined, {shallow: true});
        }
    };
    const stylePlaceholder = {
    
    }
    return (
        <Box bg="black" opacity='0.8'>
            <Container>
                <Stack
                    as="nav"
                    direction={['column',, 'row']}
                    justify="space-between"
                    wrap="wrap"
                    py="1rem">
                    <HStack justify="space-between">
                        <MenuItem href="/" style={style}>
                            <Image src='/favicon.ico' h="50px" alt="icon"/>
                            <Heading size="lg" ml={2} me={20}>Moviebase</Heading>
                        </MenuItem>
                        <InputGroup as="form" onSubmit={handleSearch}>
                            <Input
                                placeholder="Search for a movie..."
                                value={text}
                                onChange={(event) => setText(event.target.value)}/>
                            <InputRightElement>
                                <IconButton
                                    aria-label="Search for a movie"
                                    icon={< SearchIcon />}
                                    type="submit"/>
                            </InputRightElement>
                        </InputGroup>

                        <Box display={['block',, 'none']} onClick={onToggle}>
                            <Button variant="outline">
                                <HamburgerIcon/>
                            </Button>
                        </Box>
                    </HStack>

                    <Stack
                        direction={['column',, 'row']}
                        justify="start"
                        align={['start',, 'center']}
                        display={[
                        isOpen
                            ? 'flex'
                            : 'none',,
                        'flex'
                    ]}
                        spacing={10}>
                        <MenuItem href="/watchlist">Watchlist</MenuItem>
                        <MenuItem href="/history">History</MenuItem>
                        <MenuItem href="/" disabled>TV Show</MenuItem>

                    </Stack>

                    <Spacer/>

                    <Box
                        display={[
                        isOpen
                            ? 'block'
                            : 'none',,
                        'block'
                    ]}>
                        <MenuItem href="/" variant="outline" disabled>
                            What to watch
                        </MenuItem>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default function Layout({title, children}) {
    return ( 
    <> 
    <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico"/>
    </Head> 
    <Grid minH = "100vh" > <VStack w="full" align="stretch" spacing={5}>
        <Header/>
        <Box as="main" h="full">
            {children}
        </Box>
    </VStack> 
    </Grid>
    </>
    );
}
