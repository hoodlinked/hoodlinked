import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_ITEM } from '../utils/mutations';

function Item() {
    // const { data } = useQuery(QUERY_USER);
    // let user;

    // if (data) {
    //     user = data.user;
    // }

    const [formState, setFormState] = useState({ name: '', description: '', 
    // available: 'true' 
});
    const [addItem] = useMutation(ADD_ITEM);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addItem({
            variables: {
                name: formState.name,
                description: formState.description,
                // available: formState.available
            },
        });
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
                <div className="col-lg">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Item:</label>
                            <input
                                className="form-control"
                                placeholder="Item"
                                name="name"
                                type="name"
                                id="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                className="form-control"
                                placeholder="Item Description"
                                name="description"
                                type="Textarea"
                                id="description"
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
                            <button type="submit">Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Item;