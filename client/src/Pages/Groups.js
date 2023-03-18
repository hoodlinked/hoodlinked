import {
    Container, Card, Text, CardBody, CardFooter, Image, Stack, Heading, Divider, Button, ButtonGroup,
    Flex, Center, SimpleGrid
} from '@chakra-ui/react'

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import CardsContext from '../components/CardsContext';
import Cards from '../components/Cards';

import { QUERY_USER } from "../utils/queries";

function Groups() {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
        console.log("---user---")
        console.log(user)
    }

    return (
        <Container>
            {/* logic for showing the cards page - with context has option for user to join/view library page */}
            {user ? (
                <>
                    <CardsContext/>
                </>
            ) :
                <Cards/>
            }

        </Container >
    )
}

export default Groups;