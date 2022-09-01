import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function Study() {
    
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    const [cardNum, setCardNum] = useState(1);
    const [front, isFront] = useState(true);
    
    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {

        async function getDecks() {

            const abortController = new AbortController();
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
            setCards(response.cards);

            return () => {
                abortController.abort();
            };
        }
        getDecks();

    }, []);

    function notEnough() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are only {cards.length}{" "}
                    cards in this deck.
                </p>

                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
            </div>
        );
    }
    
    function flip() {
        if (front) {
            isFront(false);
        } else {
            isFront(true);
        }
    }

    function nextCard(index, total) {
        console.log(index);
        
        if (index < total) {
            setCardNum(cardNum + 1);
            isFront(true);
        } else {

            if (window.confirm(`Go one more time? 'Cancel' returns to home page`)) {
                setCardNum(1);
                isFront(true);
            } else {
                history.push("/");
            }

        }
    }

    function nextButton(cards, index) {
        if (front) {
            return null;
        } else {
            return (
                <button onClick={() => nextCard(index + 1, cards.length)} className="btn btn-primary">
                    Next
                </button>
            );
        }
    }

    function enough() {
        return (
            <div className="card">

                {cards.map((card, index) => {

                    if (index === cardNum - 1) {
                        return (

                            <div className="card-body" key={card.id}>

                                <div className="card-title">
                                    {`Card ${index + 1} of ${cards.length}`}
                                </div>

                                <div className="card-text">
                                    {front ? card.front : card.back}
                                </div>

                                <button onClick={flip} className="btn btn-secondary">
                                    Flip
                                </button>

                                {nextButton(cards, index)}
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    return (
        <div>
            <ol className="breadcrumb">

                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>

                <li className="breadcrumb-item active">Study</li>

            </ol>

            <div>
                <h2>{`${deck.name}: Study`}</h2>

                <div>
                    {cards.length === 0 ? notEnough() : cards.length > 2 ? enough() : notEnough()}
                </div>
                
            </div>

        </div>
    )

}

export default Study;
