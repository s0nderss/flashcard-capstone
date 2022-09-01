import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function Home() {

    //need consts to reload page, useState for displaying deck data    
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    //getting deck data if any deck data, abort fetch request after try, run once with second argument as empty array
    useEffect(() => {
        async function getDecks() {
            const abortController = new AbortController();

            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } 
            //error handling if fetch goes wrong
                catch (error) {
                console.error("There was an error", error);
            }
            //clean up last fetch request before continuing
            return () => {
                abortController.abort();
            };
        }
        getDecks();
        // add blank [] for second argument preventing rerun
    }, []);

    
//     Clicking the Delete button shows a warning message before deleting the deck. create separate function for delete message prompt
// Delete Deck prompt
// When the user clicks the Delete button, a warning message is shown and the user can click OK or Cancel. If the user clicks OK, the deck is deleted and the deleted deck is no longer visible on the Home screen.
//adding handle delete functionality 
    async function handleDelete(deck) {
        if (
            window.confirm(
                `Warning: Deck will be permanently deleted. Delete ${deck.name}?`
            )
        ) {
            //reload page after delete
            history.go(0);
            return await deleteDeck(deck.id);
        }
    }

    //formatting of home component to render deck info in card form and adding delete button to each card if card is present
    return (
        <div className="container">
            
            <Link className="btn btn-secondary" to="/decks/new">
                Create Deck
            </Link>

            <div className="card-deck">
                {decks.map((deck) => {
                    return (
                        <div className="card" key={deck.id}>

                            <div className="card-body">
                                {/* deck name */}
                                <div className="card-title">
                                    {`${deck.name}`}
                                </div>

                                {/* number of cards */}
                                <div className="card-subtitle text-muted">
                                    {`${deck.cards.length} cards`}
                                </div>
                                {/* deck description */}
                                <div className="card-text">
                                    {`${deck.description}`}
                                </div>

                                {/* Clicking the View button brings the user to the Deck screen. use linkto */}
                                <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
                                    View
                                </Link>
                                
                                    {/* Clicking the Study button brings the user to the Study screen. use linkto */}
                                <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                                    Study
                                </Link>
                                {/* delete button with onclick to handledelete */}
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(deck)}>
                                    Delete
                                </button>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
