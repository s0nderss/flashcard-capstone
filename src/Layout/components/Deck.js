import React, { useEffect, useState } from 'react';
import { readDeck } from '../../utils/api';
import { useParams } from 'react-router-dom';
import StudyButton from './buttons/StudyButton';
import DeleteDeckButton from './buttons/DeleteDeckButton';
import CardList from './CardList';
import EditDeckButton from './buttons/EditDeckButton';
import AddCardsButton from './buttons/CreateCardButton';

const Deck = () => {
    const [deck, setDeck] = useState();
    const { deckId } = useParams();
    
    useEffect(() => {
      async function loadDecks(){
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
      }
      
      loadDecks();
      
    }, [deckId]);
    
    if(!deck) {
        return <h1>Please wait, loading...</h1>
    }
    
    
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
                </nav>        
            </div>
            

            <div className='card my-2 border-0' >
                <div className='card-body p-0'>
                    <h5 className='card-title'>{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <EditDeckButton deck={deck}/>
                            <StudyButton deck={deck}/>
                            <AddCardsButton deck={deck} />
                        </div>
                        <div>
                            <DeleteDeckButton deck={deck} />
                        </div>
                    </div>                       
                </div>                
            </div>
            
            <br/>
            <h1>Cards</h1>
            
            <CardList cards={deck.cards} key={deck.id} />
            
        </div>
    )
}

export default Deck;