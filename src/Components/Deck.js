import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function Deck() {

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    const history = useHistory();
    const { deckId } = useParams();

    //load up deck(s), deck info
    useEffect(() => {
        async function getDecks() {
            
            const abortController = new AbortController();

            try {
                const response = await readDeck(
                    deckId,
                    abortController.signal
                );
                setDeck(response);
                setCards(response.cards);
            } catch (error) {
                console.error("There was an error", error);
            }

            return () => {
                abortController.abort();
            };
        }
        getDecks();
    }, []);

    async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    async function handleEditCard(card) {
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }    

    //deletes
    async function handleDeleteCard(card) {
        if (
            window.confirm(`Warning: Card will be permanently deleted. Delete "${card.front}?"`)
        ) {
            const abortController = new AbortController();
            try {
                history.go(0);
                return await deleteCard(card.id, abortController.signal);
            } catch (error) {
                console.error("There was an error", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleDeleteDeck(deck) {
        if (
            window.confirm(`Warning: Deck will be permanently deleted. Delete "${deck.name}"?`)
        ) {
            const abortController = new AbortController();
            try {
                history.push("/");
                return await deleteDeck(deck.id, abortController.signal);
            } catch (error) {
                console.error("There was an error", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    if (cards.length > 0) {

        return (
            <div>

                <ol className="breadcrumb">

                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{deck.name}</li>

                </ol>
                {/* //decks card */}
                <div className="card">

                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>

                        <p>{deck.description}</p>

                        <button onClick={() => handleEditDeck()} className="btn btn-secondary">
                            Edit
                        </button>

                        <button onClick={() => handleStudy()} className="btn btn-primary">
                            Study
                        </button>

                        <button onClick={() => handleAddCard()} className="btn btn-primary">
                            Add Cards
                        </button>

                        <button onClick={() => handleDeleteDeck(deck)} className="btn btn-danger">
                            Delete
                        </button>

                    </div>

                </div>

                {/* cards card */}

                <h1>Cards</h1>

                {cards.map((card) => {

                    return (

                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>

                                    <div className="container row">
                                        
                                        <button onClick={() => handleEditCard(card)} className="btn btn-secondary">
                                            Edit
                                        </button>

                                        <button onClick={() => handleDeleteCard(card)} className="btn btn-danger">
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );

    } else {
        return null;
    }


}

export default Deck;
