import FlipCard from './components/FlipCard';

import './App.css';
import { useEffect, useState } from 'react';
import { useAppContext } from './context/AppContext';

interface CardProps {
  id: string
  name: string
  image: string
  flipped: boolean
  checked: boolean
}

function App() {
  const [indexSelected, setIndexSelected] = useState(-1)

  const {
    cards, setCards,
    numberFlipped, setNumberFlipped,
  } = useAppContext();

  const getCards = async () => {
    try {
      let response = await fetch('../src/db/cards.json');
      const data01: CardProps[] = await response.json();
      for (let i = 0; i < data01.length; i++) {
        data01[i].flipped = true
        data01[i].checked = false
        data01[i].id = (Math.floor(Math.random() * (256 - 1 + 1)) + 1).toString()
      }

      response = await fetch('../src/db/cards.json');
      const data02: CardProps[] = await response.json();
      for (let i = 0; i < data02.length; i++) {
        data02[i].flipped = true
        data02[i].checked = false
        data02[i].id = (Math.floor(Math.random() * (256 - 1 + 1)) + 1).toString()
      }

      const initialCards: CardProps[] = data01.concat(data02)

      initialCards.sort((a, b) => parseInt(a.id) - parseInt(b.id));

      setCards(initialCards)

    } catch (error) {
      console.error('Erro ao carregar JSON:', error);
    }
  }

  function restartOrigin() {
    const prevCards = cards
    for (let i = 0; i < prevCards.length; i++) {
      prevCards[i]!.flipped = true  
      setCards(prevCards) 
    }   
    setNumberFlipped(0)
    setIndexSelected(-1)
  }

  function handleClickCard(index: number) {
    const prevCards = cards
    if (prevCards[index]?.checked) {
      return
    }
    prevCards[index]!.flipped = false
    setNumberFlipped(numberFlipped + 1)

    if (numberFlipped === 0) {
      setIndexSelected(index)
    } else {
      if (prevCards[indexSelected]?.image === prevCards[index]?.image) {
        prevCards[indexSelected]!.checked = true
        prevCards[index]!.checked = true 
      }
    }

    setCards(prevCards)

   if (numberFlipped === 1)
    setTimeout(() => {
          restartOrigin()
    }, 1000);

  }

  useEffect(() => {
    getCards()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <div className="App-container">
        {cards.map((card, index) => (
          <FlipCard
            key={index}
            index={index}
            flipped= {card!.flipped}
            handeleClick={()=>handleClickCard(index)}
            frontImage={card!.image}
            checked={card!.checked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
