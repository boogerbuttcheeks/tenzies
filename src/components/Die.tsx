import { useState } from 'react'
import style from './Die.module.css'

interface DieProps {
  value: number;
  isActive: boolean;
  id: string;
  holdDice: Function;
}

function Die({value, isActive, id, holdDice}: DieProps) {

  const styles = {
    background: isActive ? '#59E391' : '',
    color: isActive ? 'black' : '',
  }

  return (
    <div
      className={style.Die}
      style={styles}
      onClick={() => {holdDice(id)}}
    >
      <p>{value}</p>
    </div>
  )
}

export default Die
