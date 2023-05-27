import { useState, useEffect } from 'react';
import { Card } from './components/Card';
import type { CardType } from './components/Card';

const cardImages: CardType[] = [
  { src: 'img/rick.jpg', matched: false },
  { src: 'img/morty.png', matched: false },
  { src: 'img/beth.jpg', matched: false },
  { src: 'img/summer.jpg', matched: false },
  { src: 'img/jerry.png', matched: false },
  { src: 'img/evil-morty.jpg', matched: false }
];

const App = () => {
  const [cards, setCards] = useState<CardType[] | []>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const startGame = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: CardType) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="app">
      <img src="logo.png" width={500} alt="logo" />
      <div className="actions-container">
        <button onClick={startGame}>New Game</button>
        <p>Turns: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
