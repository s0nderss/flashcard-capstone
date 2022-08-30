import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import CancelButton from './buttons/CancelButton';
import CreateNewCardButton from './buttons/CreateNewCardButton';

const CardCreate = () => {
    const [deck, setDeck] = useState();
    const [newCard, setNewCard] = useState({
        front: '',
        back: '',
    });
    const { deckId } = useParams();
    
    useEffect(() => {
        async function loadDeck() {
            const currDeck = await readDeck(deckId);
            setDeck(currDeck);
        }
        loadDeck();
    }, [deckId, setDeck]);
    
    if(!deck) return <h1>Please wait, loading...</h1>
    
    const frontChangeHandler = (e) => setNewCard({ ...newCard, front: e.target.value });
    const backChangeHandler = (e) => setNewCard({ ...newCard, back: e.target.value });
    
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
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
                        placeholder='Front side of card'
                        onChange={frontChangeHandler}
                    />
                </label>
                <label htmlFor='back' className='d-flex flex-column'>
                    Back
                    <textarea
                        id='back'
                        type='text'
                        rows={3}
                        className='my-1'
                        placeholder='Back side of card'
                        onChange={backChangeHandler}
                    />
                </label>
                <CancelButton deck={deck}/>
                <CreateNewCardButton deckId={deckId} newCard={newCard} />
            </form>      
        </div>
    );
}

export default CardCreate;