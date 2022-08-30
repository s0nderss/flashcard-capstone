import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readCard, readDeck } from '../../utils/api';
import CancelButton from './buttons/CancelButton';
import SaveButton from './buttons/SaveButton';

const CardEdit = () => {
    const [deck, setDeck] = useState();
    const [card, setCard] = useState();
    const { deckId, cardId } = useParams();
    
    useEffect(() => {
        async function loadDeck() {
            const currDeck = await readDeck(deckId);
            setDeck(currDeck);

        }
        loadDeck()
    }, [deckId, setDeck]);
    
    useEffect(() => {
        async function loadCard() {
            const currCard = await readCard(cardId);
            setCard(currCard);
        }
        loadCard();
    }, [cardId, setCard]);

    if(!deck || !card) {
        return <h1>Please wait, loading...</h1>
    }
    
    const handleFrontChange = (e) => setCard({...card, front:(e.target.value)});
    const handleBackChange = (e) => setCard({...card, back:(e.target.value)})
    
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card #{cardId}</li>
                    </ol>
                </nav>        
            </div>
            
            <h2>Edit Card</h2>
            
            <form>
            <label htmlFor='front' className='d-flex flex-column'>
                    Front
                    <textarea
                        id='front'
                        type='text'
                        rows={3}
                        className='my-1'
                        onChange={handleFrontChange}
                        value={card.front}
                    />
                </label>
                <label htmlFor='back' className='d-flex flex-column'>
                    Back
                    <textarea
                        id='back'
                        type='text'
                        rows={3}
                        className='my-1'
                        onChange={handleBackChange}
                        value={card.back}
                    />
                </label>
                <CancelButton deck={deck}/>
                <SaveButton deck={deck} card={card}/>
            </form>      
        </div>
    );
}

export default CardEdit;