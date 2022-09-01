import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {

    //create history, start state variable for newDeck creation
    const history = useHistory();
    
    
    //useState for deck creation
    const startState = {
        name: "",
        description: "",
    };
    const [newDeck, setNewDeck] = useState(startState);

    function handleChange({ target }) {
        setNewDeck({
            //shallow copy of formatting and update
            ...newDeck,
            [target.name]: target.value,
        });
    }


    //handling submit button for creating deck
    async function handleSubmit(event) {

        event.preventDefault();

        const abortController = new AbortController();
        const response = await createDeck(
            //shallow copy of formatting and update
            { ...newDeck },
            abortController.signal
        );
        
        //go home and return response data containing shallow copy 
        history.push("/");
        return response;
    }
    //return home when cancel button is pushed
    async function handleCancel() {
        history.push("/");
    }


//rendering
// There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
// A form is shown with the appropriate fields for creating a new deck.
// The name field is an <input> field of type text.
// The description field is a <textarea> field that can be multiple lines of text.

    return (

        <div>
            
            <ol className="breadcrumb">

                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item active">Create Deck</li>
                
            </ol>
            {/* creating create deck form */}
            <form onSubmit={(event) => handleSubmit(event)}>

                <h2>Create Deck</h2>

               {/* name information that also contains reference to handleChange function */}
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.name}
                    />
                </div>

                {/* adding description information to new deck */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.description}
                    />
                </div>

                   {/* creating cancel and submit buttons */}
                <button className="btn btn-secondary" onClick={() => handleCancel()}>
                    Cancel
                </button>

                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateDeck;
