import React, { useState } from 'react';
import CancelButton from './buttons/CancelButton';
import CreateDeckButton from './buttons/CreateDeckButton';

const DeckCreate = () => {
    
    const [newDeck, setNewDeck] = useState({
        name: '',
        description: '',
    });
    
    const nameChangeHandler = (e) => setNewDeck({ ...newDeck, name: e.target.value });
    const descChangeHandler = (e) => setNewDeck({ ...newDeck, description: e.target.value});
    
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                    </ol>
                </nav>        
            </div>
            
            <h1>Create Deck</h1>
            
            <form>
                <label htmlFor='name' className='d-flex flex-column'>
                    Name
                    <input
                        id='name'
                        type='text'
                        placeholder='Deck Name'
                        onChange={nameChangeHandler}
                    />
                </label>
                <label htmlFor='description' className='d-flex flex-column'>
                    Description
                    <textarea
                        id='description'
                        type='text'
                        rows={4}
                        placeholder='Breif description of the deck'
                        onChange={descChangeHandler}
                    />
                </label>
                <CancelButton  />
                <CreateDeckButton newDeck={newDeck} />
            </form>
        </div>
    );
}

export default DeckCreate;