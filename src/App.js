import { nanoid } from "nanoid";
import React from "react";
import Die from './Die.js';
import Confetti from 'react-confetti'
function App() {

  const [ Dice , setDice]=React.useState(allNewDice())
  const [ win, setWin]=React.useState(false)

  React.useEffect(()=>{
    const allHeld= Dice.every( die => die.isHeld)
    const firstvalue=Dice[0].value
    const allSame=Dice.every(die => die.value === firstvalue)
    if( allHeld && allSame){
      setWin(true)
      console.log("You have won!");
    }
  },[Dice])
  const dieElements = Dice.map((die)=> {
    return(
      <Die 
      num={die.value} 
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      holdDice={holdDice}
      />
    )
  })

  function holdDice(id) {
    setDice( oldDice => oldDice.map( die => {
      return die.id === id ?
      {...die, isHeld:!die.isHeld} :
      die
    }))
  }

  // Does the same thing as above but does
  // trigger a re-render
  // function holdDice(id) {
  //   const newDice= Dice
  //   for (let x of newDice){
  //     if( x.id == id){
  //       x.isHeld= !x.isHeld
  //     }
  //   }
  //   setDice(newDice)
  //   console.log(Dice)
  // }

  
  function allNewDice() {
    const arr=[]
    for(let i=0; i < 10 ;i++){
      arr.push({
        value: Math.floor(Math.random()*6)+1,
        isHeld: false,
        id:nanoid()
      })
    }
    return arr
  }

  function rollDice() {
     setDice( oldDice => oldDice.map( die => {
        return die.isHeld ? die : {
          value: Math.floor(Math.random()*6)+1,
          isHeld: false,
          id:nanoid()
        }

     
    }))
  }

  function reset() {
    setDice(allNewDice)
    setWin(false)
  }

  return (
    <main>
      { win && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all the dice are same</p>
      <div className="container">
      {dieElements}
      </div>
      <button   
          onClick={win ? reset : rollDice}
          className="roll-button">
            { win ? "Reset" : "Roll"}</button>
    </main>
  )
}
export default App;
