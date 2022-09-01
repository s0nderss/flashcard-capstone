import react from "react"
import { useHistory, useParams } from "react-router-dom";


function CardForm({deckId, handleSubmit, handleChange, card}){

    const { cardId } = useParams();
    const history = useHistory();

    return (

    <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Front</label>
                    <textarea
                    id="front"
                    name="front"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={card.front}
                    />
                </div>

                <div className="form-group">
                    <label>Back</label>
                    <textarea
                    id="back"
                    name="back"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={card.back}
                    />
                </div>

                    <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
                        {cardId ? "Cancel" : "Done"}
                    </button>

                    <button className="btn btn-primary" type="submit">
                        {cardId ? "Submit" : "Save"}
                    </button>
    </form>

    )
}

export default CardForm;

