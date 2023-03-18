import {
    Heading,
} from '@chakra-ui/react';

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_LIBRARY } from '../utils/queries';

export default function Library() {
    const { libraryId } = useParams();

    const { data } = useQuery(QUERY_LIBRARY, {
        variables: { libraryId: libraryId }
    });
    let library;

    if (data) {
        library = data.library
        console.log(data);
        console.log(library)
    }

    return (
        <>
            {library ? (
                <>
                <Heading mb="4">{library.name}</Heading>
                {library.users.map((user) => (
                    <div key={user._id}>
                        <div>User: <Link to={`/user/${user._id}`}>{user.username}</Link> </div>
                        <div>Items from {user.username}:</div>
                        {user.items.map(({ name, description }, index) => (
                            <div key={index}>
                                <p>{name}</p>
                                <p>{description}</p>
                            </div>
                        ))}
                        <div><a href={`mailto:${user.email}`}>Email {user.username}</a></div>
                        <div><Link to={`/user/${user._id}`}>Go to {user.username}'s page</Link></div>
                    </div>
                ))}
                </>
            ) :
                null
            }
        </>
    )
}