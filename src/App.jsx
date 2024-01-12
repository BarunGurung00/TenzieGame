import { useState,useEffect } from 'react'
import './index.css'
import Die from './Die.jsx'
import React from 'react';

function App() {
  //provides 10 random number between 1 to 6
  const generateNewDice = () => {
    const Dice = []
    for (let i = 0; i < 10; i++) {
      Dice.push({ 
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    }
    return Dice
  }
  
  const [dice, setDice] = useState(generateNewDice())
  const[tenzies, setTenzies] = useState(false)

  useEffect(()=>{
        const isAllHeld = dice.every((die) => die.isHeld)
        const firstValue = dice[0].value
        const isSameValue = dice.every(die => die.value === firstValue)
        if(isAllHeld && isSameValue){
          setTenzies(true)
          alert("Hurrary! You got Tenzies")
        }
  }, [dice])

  const rollDice = () => {
    if(!tenzies){
      setDice(dice.map((die) => {
        if(die.isHeld)return die
        else return {
          ...die,
          value: Math.floor(Math.random() * 6) + 1
        }
      }))
    }
    else {
      setDice(generateNewDice())
      setTenzies(false)
    }
  }
  
  //this function is responsible to mark the dice as held
  function holdDice(id) {
     setDice(dice.map((die, index) => {
       if (index === id) {
         return {
           ...die,
           isHeld: !die.isHeld
         }
       }
       return die
     }))
  }
  //10 dice Elements
  const diceElements = dice.map((die, index) => 
        <Die key={index} value={die.value} isHeld={die.isHeld} hold={()=> holdDice(index)}/>
  )

  return (
    <>
      <main className="w-[400px] h-[40vh] border-8 border-blue-950 border-solid rounded-lg flex flex-col justify-end items-center pb-8 gap-2">
        <h2 className="text-[1.7rem] font-thin mt-[-10px] text-blue-900">Tenzies</h2>
        <p className="p-4">Roll the dice and if they are same click it to freeze the dice.</p>
          <div className="container flex border-gray-400 w-full border-solid flex-wrap justify-center items-end gap-2">
               {diceElements}
          </div>
          <button onClick={rollDice} className="w-1/2 h-12 bg-blue-950 text-white rounded-md shadow-md mt-4">{tenzies ? "New Game":"Roll"}</button>  
      </main>
    </>
  )
}

export default App
