import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_ITEM, REMOVE_ITEM } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import {
    Box,
    Heading,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
} from '@chakra-ui/react'

function Item() {

    const { data } = useQuery(QUERY_USER);
    let user;


    if (data) {
        user = data.user;

    }

    const itemName = document.getElementById('itemName')
    const itemDescription = document.getElementById('itemDescription')

    const [formState, setFormState] = useState({ name: '', description: '' });
    const [addItem] = useMutation(ADD_ITEM);
    const [showForm, setShowForm] = useState(false); // new state variable

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addItem({
            variables: {
                name: formState.name,
                description: formState.description,
            },
        });

        itemDescription.value = "";
        itemName.value = "";
        document.location.reload();
    };

    const [removeItem] = useMutation(REMOVE_ITEM);

    const handleRemoveItem = async (_id) => {
        const mutationResponse = await removeItem({
            variables: {itemId: _id }
        });
        
        document.location.reload();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    return (
        <>
            <Box borderWidth="1px" borderColor="gray.200" bgGradient='linear(to-r, orange.500, orange.300)' borderRadius="lg" p="4" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" margin="2rem 0">
                {user.items.map(({ name, description, _id }, index) => (
                    <Box key={index} bg="white" margin="1rem 0" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4" width={{ base: "100%", sm: "48%", md: "30%" }}>
                        <Heading as="h5" size="md" mb="2">{name}</Heading>
                        <Text>{description}</Text>
                        <Stack spacing={4} direction='row' align='center'>
                            <Button
                                className="btn-block btn-danger"
                                onClick={() => handleRemoveItem(_id)}
                            >
                                Remove
                            </Button>
                            {/* <Button
                                className="btn-block btn-danger"
                                onClick={() => handleRemoveItem(_id)}
                            >
                                Edit Item
                            </Button> */}
                        </Stack>

                    </Box>
                ))}
            </Box>

            {/* New button to toggle the form */}
            <Button onClick={() => setShowForm(!showForm)} variant="solid" colorScheme="orange" margin="1rem 0">
                {showForm ? 'Hide form' : 'New item +'}
            </Button>

            {/* Show the form only if showForm is true */}
            {
                showForm && (
                    <Box borderWidth="1px" borderColor="gray.200" bg='orange.100' borderRadius="lg" p="4">
                        <Heading as="h5" size="md" mb="2">
                            Add an item to your list to share with people in your groups
                        </Heading>
                        <div className="col-lg">
                            <form onSubmit={handleFormSubmit}>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="itemName">Item Name:</FormLabel>
                                    <Input
                                        placeholder="Item"
                                        name="name"
                                        type="name"
                                        id="itemName"
                                        bg="white"
                                        value={formState.name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="itemDescription">Description:</FormLabel>
                                    <Textarea
                                        placeholder="Item Description"
                                        name="description"
                                        type="Textarea"
                                        id="itemDescription"
                                        bg="white"
                                        value={formState.description}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="solid"
                                    colorScheme="orange"
                                    marginTop={5}
                                >
                                    Add Item
                                </Button>
                            </form>
                        </div>
                    </Box>)
            }

        </>
    )
}

export default Item;