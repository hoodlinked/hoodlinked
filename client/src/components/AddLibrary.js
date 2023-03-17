import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { CREATE_LIBRARY } from '../utils/mutations';
import { QUERY_LIBRARIES } from '../utils/queries';

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
                            <button type="submit">Add Group</button>
                        </div>
                    </form>
                </div>
                <div>
                    {library? (
                        <>
                        <h5>Libraries:</h5>
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
            </div>
        </>
    )
}   

export default AddLibrary;