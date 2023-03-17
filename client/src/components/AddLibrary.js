import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { CREATE_LIBRARY } from '../utils/mutations';
import { Button,}
  from "@chakra-ui/react";

function AddLibrary() {

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
            <div className="container my-1">
                <h5>Create a new group for people in your community to join</h5>
                <div className="col-lg">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Group Name:</label>
                            <p></p>
                            <input
                                className="form-control"
                                placeholder="My Group"
                                name="name"
                                type="name"
                                id="libraryName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <Button colorScheme='blue'
                                type="submit">Add Group</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddLibrary;