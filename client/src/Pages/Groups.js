import {
    Input,
    InputGroup, 
    InputLeftElement,
    Box,
    Heading,
    Center
} from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";


import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import CardsContext from '../components/CardsContext';
import Cards from '../components/Cards';

import { QUERY_USER } from "../utils/queries";

function Groups() {
    const { data } = useQuery(QUERY_USER);

    const [searchQuery, setSearchQuery] = useState('');


    let user;
  
    if (data) {
      user = data.user;
    }
  
    return (
      <>
        {/* logic for showing the cards page - with context has option for user to join/view library page */}
      
        <Heading 
        textAlign="center"
        mb="4"
        mt="8">
            Hoodlinked Groups
        </Heading>

        <Center>
        <Box my={4} px={4} maxW="lg" >
            <InputGroup >
                <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" />}
                />
                <Input
                type="text"
                placeholder="Search items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                borderRadius={0}
                _hover={{ borderColor: "gray.300" }}
                _focus={{ borderColor: "orange.400", boxShadow: "none" }}
                />
            </InputGroup>
        </Box>
        </Center>
        
        {user ? (
              <CardsContext searchQuery={searchQuery}/>
        
        ) : (
              <Cards searchQuery={searchQuery}/>
        )}
      </>
    );
  }
  

export default Groups;