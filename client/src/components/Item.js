import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_ITEM } from '../utils/mutations';
import { Button } from '@chakra-ui/react'

function Item() {

    const itemName = document.getElementById('itemName')
    const itemDescription = document.getElementById('itemDescription')

    const [formState, setFormState] = useState({ name: '', description: ''});
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
                        {/* <div className="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value="true"
                                id="flexCheckDefault"
                                name="available"
                                onChange={handleChange}
                            />
                            <label htmlFor="available" class="form-check-label" for="flexCheckDefault">
                                Available
                            </label>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="available">Available</label>
                            <input
                                name="available"
                                type="checkbox"
                                id="available"
                                onChange={handleChange}
                            />
                        </div> */}
                        <div className="form-group mb-3">
                            <Button colorScheme='blue'type="submit">Add Item</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Item;