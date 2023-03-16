import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
    Container, Card, Text, CardBody, CardFooter, Image, Stack, Heading, Divider, Button, ButtonGroup,
    Flex, Center, SimpleGrid
} from '@chakra-ui/react'


class Cards extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }

    async componentDidMount() {
        const res = await fetch('http://localhost:3001/graphql', {
            method: 'POST',

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                query: `query Library {
                        libraries {
                          name
                        }
                      }`
            })
        })
        const data = await res.json();
        this.setState({ data : data.data.libraries });
    }

    // export default function Cards() {
    // const groupLoader = async () => {
    //     const res = await fetch('http://localhost:3001/graphql', {
    //         method: 'POST',

    //         headers: {
    //             "Content-Type": "application/json"
    //         },

    //         body: JSON.stringify({
    //             query: `query Library {
    //                 libraries {
    //                   name
    //                 }
    //               }`
    //         })
    //     })
    //     const libraries = await res.json()
    //     return (libraries.data.libraries)
    // }


    // const libraries = await groupLoader()
    // const libraries = [
    //     {
    //     name:"group1"
    // },
    // {
    //     name:"group2"
    // },
    // {
    //     name:"group3"
    // },
    // ]
    render() {
        return (
        <Container>
            <Flex>
                <SimpleGrid>
                    {this.state.data.map(library => (
                        <Card key={library.name} maxW='sm'>
                            <CardBody>
                                <Image
                                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{ library.name }</Heading>
                                    {/* <Text>
                                        This sofa is perfect for modern tropical spaces, baroque inspired
                                        spaces, earthy toned spaces and for people who love a chic design with a
                                        sprinkle of vintage design.
                                    </Text> */}
                                    {/* <Text color='blue.600' fontSize='2xl'>
                                    $450
                                </Text> */}
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <Center my='6'>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'>
                                            Email owner to join group
                                        </Button>
                                        {/* <Button variant='ghost' colorScheme='blue'>
                                        Add to cart
                                    </Button> */}
                                    </ButtonGroup>
                                </Center>
                            </CardFooter>
                        </Card>
                    )
                    )
                    }
                </SimpleGrid>
            </Flex>
        </Container >
        )
    }
}

export default Cards;
// const groupLoader = async () => {
//     const res = await fetch('http://localhost:3001/graphql', {
//         method: 'POST',

//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify({
//             query: `query Library {
//                 libraries {
//                   name
//                 }
//               }`
//         })
//     })
//     const libraries = await res.json()
//     return (libraries.data.libraries)
// }

