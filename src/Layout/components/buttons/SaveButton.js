import React from 'react';
import { updateCard, updateDeck } from '../../../utils/api';
import { useHistory } from 'react-router-dom';

const SaveButton = ({ deck, card }) => {
    const history = useHistory();
    
    const saveHandler = (e) => {
        e.preventDefault();
        updateDeck(deck).then(card ? updateCard(card).then(resp => history.push(`/decks/${deck.id}`)) : resp => history.push(`/decks/${deck.id}`));
    }

    return (
        <button onClick={saveHandler} className="btn btn-primary mx-2">
        Save
        </button>
      )
}

export default SaveButton;