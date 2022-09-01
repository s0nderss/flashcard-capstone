import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {

    const { deckId, cardId } = useParams();
    const history = useHistory();

    const deckStartState = { id: "", name: "", description: "",};
    const cardEditStartState = { id: "", front: "", back: "", deckId: "",};

    const [deck, setDeck] = useState(cardEditStartState);
    const [card, setCard] = useState(deckStartState);

    useEffect(() => {
        async function getDecks() {

            const abortController = new AbortController();

            try {

                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );

                const cardResponse = await readCard(
                    cardId,
                    abortController.signal
                );
                setCard(cardResponse);
                setDeck(deckResponse);

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
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }


    async function handleSubmit(event) {

        event.preventDefault();

        const abortController = new AbortController();
        const response = await updateCard({ ...card }, abortController.signal);

        history.push(`/decks/${deckId}`);
        return response;
    }


    return(
        <div>
            {(
            <ol className="breadcrumb">

                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>

                <li className="breadcrumb-item active">Edit Card {cardId}</li>

            </ol>
            )}   

            <h2>Edit "{card.front}" Card</h2>

            <CardForm
                    deckId={deckId}
                    card={card}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
        </div>
    )
}

export default EditCard;
