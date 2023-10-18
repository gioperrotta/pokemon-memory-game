// import { useState } from 'react';
// import BackSideImage from 'BackSidePokemon.jpg'
// import CheckImage from 'pokemon.png'
import { useAppContext } from '../context/AppContext';

interface FlipCardProps {
  index: number
  frontImage: string
  handeleClick: (i: number) => void
  flipped: boolean
  checked: boolean
}

const FlipCard = ({
  index, 
  frontImage, 
  handeleClick, 
  flipped, 
  checked 
}: FlipCardProps) => {

  const { numberFlipped } = useAppContext()


  function flipCardClick() {
    if (numberFlipped < 2) {
      handeleClick(index)
    }
    return
  }


  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img className="img-card" src={`${frontImage}`} alt={frontImage}/>
        </div>
        <div onClick={() => flipCardClick()} className="flip-card-back">
          {
            checked ? <img className="img-card" src={'pokemon.png'} alt="" /> : <img className="img-card" src={'BackSidePokemon.jpg'} alt="" />
          }
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
