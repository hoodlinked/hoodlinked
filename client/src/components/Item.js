import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_ITEM } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

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
                <h5>Add an item to your list to share with people in your groups</h5>
                <div className="col-lg">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Item Name:</label>
                            <input
                                className="form-control"
                                placeholder="Item"
                                name="name"
                                type="name"
                                id="itemName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description:</label>
                            <p>Provide a description to let other users know important details, like size, piece count, etc.</p>
                            <textarea
                                className="form-control"
                                placeholder="Item Description"
                                name="description"
                                type="Textarea"
                                id="itemDescription"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit">Add Item</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h5>{user.username}'s Items: </h5>
                    {user.items.map(({ name, description }, index) => (
                        <div key={index} className="my-2">
                            <p>{name}</p>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Item;