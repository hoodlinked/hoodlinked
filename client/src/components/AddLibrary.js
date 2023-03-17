import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { CREATE_LIBRARY } from '../utils/mutations';
import { QUERY_LIBRARIES } from '../utils/queries';
import { 
    Box,
    Heading, 
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react'

function AddLibrary () {

    const { data } = useQuery(QUERY_LIBRARIES);
    let library;

    if (data) {
        library = data.libraries; 
        console.log(library)
    }

    const libraryName = document.getElementById('libraryName')

    const [formState, setFormState] = useState({ name: '' })
    const [createLibrary] = useMutation(CREATE_LIBRARY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await createLibrary({
            variables: {
                name: formState.name
            },
        });

        libraryName.value = "";
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    return (
        <>
         <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4" margin="2rem 0">
            <div>
                {library? (
                    <>
                    {library.map(({ name }) => (
                        <div key={library._id} className="my-2">
                        <p>{name}</p>
                        </div>
                    ))}
                    </>
                ) :
                    null
                }
            </div>
        </Box>

        <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4">
        <VStack align="stretch">
            <Heading as="h5" size="md" mb="2">
                Create a new group for people in your community to join
            </Heading>
                <form onSubmit={handleFormSubmit}>
                <FormControl isRequired>
                        <FormLabel htmlFor="name">
                            Group Name:
                        </FormLabel>
                        <Input
                            placeholder="My Group"
                            name="name"
                            type="text"
                            id="libraryName"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button 
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="teal"
                        width="full"
                        marginTop={5}
                        >Add Group</Button>
                </form>
        </VStack>
        </Box>
        </>
    )
}   

export default AddLibrary;