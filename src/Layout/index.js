import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";

import DeckList from "./components/DeckList";
import Home from "./components/Home";
import Deck from "./components/Deck";
import DeckEdit from "./components/DeckEdit";
import Study from "./components/Study";
import CardEdit from "./components/CardEdit";
import DeckCreate from "./components/DeckCreate";
import CardCreate from "./components/CardCreate";

function Layout() {
  const [decks, setDecks] = useState([]);
    
  return (
    <>
      <Header />
      <div className="d-flex flex-column px-5">
        <Switch>
          <Route exact path='/'>
            <Home />
            <DeckList decks={decks} setDecks={setDecks}/>
          </Route>
          <Route exact path='/decks/new'>
            <DeckCreate />
          </Route>
          <Route exact path='/decks/:deckId'>
            <Deck />
          </Route>
          <Route exact path='/decks/:deckId/edit'>
            <DeckEdit />
          </Route>          
          <Route exact path='/decks/:deckId/cards/new'>
            <CardCreate />
          </Route>
          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
            <CardEdit />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>         
        </Switch>
      </div>
    </>
  );
}

export default Layout;
