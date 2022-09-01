import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function EditDeck() {

    const { deckId } = useParams();
    const history = useHistory();

    const startState = {id: "", name: "", description: "",};
    const [deck, setDeck] = useState(startState);

    useEffect(() => {
        async function getDecks() {

            const abortController = new AbortController();

            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("There was an error", error);
            }
            return () => {
                abortController.abort();
            };
        }
        getDecks();
    }, []);

    function handleChange({ target }) {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }

    async function handleCancel() {
        history.push(`/decks/${deckId}`);
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const abortController = new AbortController();
        const response = await updateDeck({ ...deck }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    return(
        <div>

            <ol className="breadcrumb">

                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>

                <li className="breadcrumb-item active">Edit Deck</li>

            </ol>


            <form onSubmit={handleSubmit}>

                <h1>Edit Deck</h1>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={deck.name}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={deck.description}
                    />
                </div>

                <button className="btn btn-secondary" onClick={() => handleCancel()}>
                    Cancel
                </button>

                <button className="btn btn-primary" type="submit">
                    Submit
                </button>

            </form>

        </div>
    )
}

export default EditDeck;
