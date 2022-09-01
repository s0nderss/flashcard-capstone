import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {

    const { deckId } = useParams();
    const history = useHistory();

    const startState = {front: "", back: "",};

    const [card, setCard] = useState(startState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        
        async function getDecks() {

            const abortController = new AbortController();
            //getting deck data, run once
            try {
                //using readDeck, useParams to get response in setDeck
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
         //shallow copy of formatting and update
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    //handling creating card in specific deck
    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();

        const response = await createCard(
            deckId,
            { ...card },
            abortController.signal
        );
        history.go(0);
        setCard(startState);
        return response;
    }

    return(
        //bootstrap for formatting add card functionality
        (<div>
            <ol className="breadcrumb">

                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>

            </ol>

            <h2>{deck.name}: Add Card</h2>

            <CardForm
                    deckId={deckId}
                    card={card}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
        </div>)
    )
}

export default AddCard;
