import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_LIBRARY_USER } from '../utils/mutations';

import {
    Button,
} from '@chakra-ui/react'

export default function AddLibraryUser() {
    const { libraryId } = useParams();

    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    const [addLibraryUser] = useMutation(ADD_LIBRARY_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addLibraryUser({
            variables: {
                libraryId: libraryId,
                user: user
            },
        });
        document.location.reload();
    };

    return (
        <form onSubmit={handleFormSubmit}>
                <Button
                    type="submit"
                    variant="solid"
                    bg="orange.100"
                    margin="1rem 0"
                    color="orange.500"
                    _hover={{ color: "gray.600" }}
                >
                    Share your Items with this group
                </Button>
        </form>
    )
}