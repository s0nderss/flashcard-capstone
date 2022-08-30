import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import CancelButton from './buttons/CancelButton';
import SaveButton from './buttons/SaveButton';

const DeckEdit = () => {
    const [deck, setDeck] = useState();
    const { deckId } = useParams();
    
    useEffect(() => {
      async function loadDecks(){
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
        
      }
    
      loadDecks();
      
    }, [deckId, setDeck])
    
    if(!deck) {
        return <h1>Please wait, loading...</h1>
    }
    
    const handleNameChange = (e) => setDeck({...deck, name:(e.target.value)});
    const handleDescriptionChange = (e) => setDeck({...deck, description:(e.target.value)});

    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                </nav>        
            </div>
            
            <h1>Edit Deck</h1>
            
            <form>
                <label htmlFor='name' className='d-flex flex-column'>
                    Name
                    <input
                        id='name'
                        type='text'
                        onChange={handleNameChange}
                        value={deck.name}
                    />
                </label>
                <label htmlFor='description' className='d-flex flex-column'>
                    Description
                    <textarea
                        id='description'
                        type='text'
                        onChange={handleDescriptionChange}
                        value={deck.description}
                        rows={4}
                    />
                </label>
                <CancelButton deck={deck} />
                <SaveButton deck={deck} />
            </form>
        </div>
    )
}

export default DeckEdit;