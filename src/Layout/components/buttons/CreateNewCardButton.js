import React from 'react';
import { useHistory } from 'react-router-dom';
import { createCard } from '../../../utils/api';

const CreateNewCardButton = ({ deckId, newCard }) => {
    const history = useHistory();
  
    const handleCreate = (e) => {
      e.preventDefault();
      async function postCard() {
        await createCard(deckId, newCard);
        history.push(`/decks/${deckId}`);
      };
      postCard();
    }

    
    return (
      <button onClick={handleCreate} className="btn btn-primary mx-2">
      Create
      </button>
    )
}

export default CreateNewCardButton;