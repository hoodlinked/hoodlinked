import React, { Component } from "react";

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
        this.setState({ data: data.data.libraries });
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
                            <Card key={library.name}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'
                                
                            >
                                <Image
                                    objectFit='cover'
                                    maxW={{ base: '100%', sm: '200px' }}
                                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                    alt='Caffe Latte'
                                />
                                <Stack align='center' >
                                    <CardBody >
                                        <Heading size='md'>{library.name}</Heading>

                                        <Text py='2'>
                                            Maybe put member(user) count here?
                                        </Text>
                                    </CardBody>

                                    <CardFooter>
                                        <Button variant='solid' colorScheme='blue'>
                                            <a href="mailto:xxxxiheartyouxxxxx@example.com">Email owner to join group</a>
                                        </Button>
                                    </CardFooter>
                                </Stack>
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




