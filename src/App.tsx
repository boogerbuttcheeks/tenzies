import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    console.log('dice state changed')

    const allActive = dice.every(die => die.isActive)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allActive && allSameValue) {
      setTenzies(true)
      console.log('tenzies!')
    }
  }, [dice])

  function allNewDice() {
    let newDice = []
    for (let i=0; i<10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isActive: false,
      id: nanoid()
    }
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isActive ?
        die :
        generateNewDie()
    }))
  }

  function holdDice(id: string) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isActive: !die.isActive} :
        die
    }))
  }

  const diceElements = dice.map(die =>
    <Die
      value={die.value}
      isActive={die.isActive}
      id={die.id}
      holdDice={holdDice}
    />
  )

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <div className='tile-wrapper'>
        {diceElements}
      </div>
      <button className='roll' onClick={tenzies ? () => {
        setDice(allNewDice())
        setTenzies(false)
      } : rollDice}>
        {tenzies ? 'New game' : 'Roll'}
      </button>
    </div>
  )
}

export default App
