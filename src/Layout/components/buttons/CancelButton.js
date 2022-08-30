import React from 'react';
import { useHistory } from 'react-router-dom';

const CancelButton = ({ deck }) => {
    const history = useHistory();
    
    const cancelHandler = (e) => {
        e.preventDefault();
        deck ? history.push(`/decks/${deck.id}`) : history.push(`/`);
    }
    
    return (
        <button onClick={cancelHandler} className="btn btn-secondary">
        Cancel
        </button>
      )
}

export default CancelButton;