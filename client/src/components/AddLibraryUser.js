import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuer, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { ADD_LIBRARY_USER } from '../utils/mutations';

import {
    Box,
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
                    colorScheme="orange"
                    _hover={{ color: "gray.600" }}
                >
                    Share your Items with this group
                </Button>
        </form>
    )
}