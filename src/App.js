
import './App.css';
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./components/Die"


function App() {
  const [newDiceArray, setNewDiceArray] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const diceElements = newDiceArray.map(die => 
    <Die key={die.id}
         value={die.value}
         index={newDiceArray.indexOf(die)}
         isHeld={die.isHeld}
         onclick={() => holdDice(die.id)} 
    /> 
    )
 

   React.useEffect(() => {
      const allHeld = newDiceArray.every(die => die.isHeld)
      const winValue = newDiceArray[0].value
      const allSameValue = newDiceArray.every(die => die.value === winValue)
      if(allHeld && allSameValue){
        setTenzies(true)
        console.log("You won!")
      }
}, [newDiceArray]) 
    
    if(tenzies === true){

    }


    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    } 

    function allNewDice() {
      const nrArray = []
      for (let i = 0; i < 10; i++) {
        nrArray.push(generateNewDie())
      }
      return nrArray
    }



    function holdDice(id) {
     setNewDiceArray(preDices => preDices.map(die => {
        return die.id === id ? {
          ...die,
          isHeld: !die.isHeld
        } : die;
      })
      )
      
    }


    function rollDice() {
      
      if(!tenzies){setNewDiceArray(oldDices => oldDices.map(die => {
        return die.isHeld ? 
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setNewDiceArray(allNewDice())
    }
    }
  return (
    <main>
      <div className='confetti'>{tenzies && <Confetti />}</div>
      <h1 className="title">Tenzies</h1>
      <hr/>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='container'>
        {diceElements}
      </div>
      
      <button 
        className="roll-dice" 
        onClick={rollDice}>{tenzies ? "New Game" : "Roll"}
      </button>
      
                  
           
        
    </main>
  );
}
export default App;
