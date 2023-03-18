import {
    Heading,
} from '@chakra-ui/react';

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER_ITEMS } from '../utils/queries';

export default function User() {
    const { userId } = useParams();

    const { data } = useQuery(QUERY_USER_ITEMS, {
        variables: { userId: userId }
    });
    let user;
    let email;
    let username;

    if (data) {
        user = data.userItems
        email = user.email
        username = user.username
        console.log(data);
        console.log(username)
        
    }

    return (
        <>
            {user ? (
                <>
                    <Heading mb="4">{user.username}'s Page</Heading>
                    <div> {user.username}'s Items: </div>
                    
                    {user.items.map(({ name, description }, index) => (
                            <div key={index}>
                                <p>{name}</p>
                                <p>{description}</p>
                                <p><a href={`mailto:${email}?&subject=Is%20Your%20${name}%20available?&body=Hi%20${username},%20I%20am%20interested%20in%20borrowing%20your%20${name}%20let%20me%20know%20if%20it%20is%20available!`}>Email {username} about borrowing {name}</a></p>
                            </div>
                        ))}
                </>
            ) :
                null
            }
        </>
    )
}