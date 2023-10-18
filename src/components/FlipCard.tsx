// import { useState } from 'react';
import BackSideImage from '../../public/images/BackSidePokemon.jpg'
import CheckImage from '../../public/images/pokemon.png'
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

  const image = `../../public/images/${frontImage}`

  return (

    <div className={`flip-card ${flipped ? 'flipped' : ''}`} >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img className="img-card" src={image} alt="" />
        </div>
        <div onClick={() => flipCardClick()} className="flip-card-back">
          {
            checked ? <img className="img-card" src={CheckImage} alt="" /> : <img className="img-card" src={BackSideImage} alt="" />
          }
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
