
import './App.css';
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./components/Die"



function App() {
  const [newDiceArray, setNewDiceArray] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [records, setRecords] = React.useState(() => JSON.parse(localStorage.getItem("records")) || []) 
  const [currentRecord, setCurrentRecord] = React.useState(Math.min(...records) || "")
   

  React.useEffect(() => {
      localStorage.setItem("records", JSON.stringify(records))
}, [records])


  React.useEffect(() => {
    let intervalId;
    if (isRunning) {
     //setting time from 0 to 1 every 10 milisecond 
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    //stop the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  React.useEffect(() => {
    const allHeld = newDiceArray.every(die => die.isHeld)
    const winValue = newDiceArray[0].value
    const allSameValue = newDiceArray.every(die => die.value === winValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      setIsRunning(false)
    }
}, [newDiceArray]) 

  const stopWatch = () => { 
    const minutes = Math.floor((time % 360000) / 6000); 
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100; 
    const timeScore = `${seconds}.${milliseconds}`
    if(tenzies){
      if(timeScore < Math.min(...records)){
      setCurrentRecord(timeScore) 
      records.push(currentRecord)
      setRecords(prevRecords => [...prevRecords, timeScore])
    }}
    

    //console.log(records)
    //console.log(time)
    //console.log(Math.min(...records))
    //console.log(currentRecord)

    return (
      <div className="stopwatch-container">
        <p className="stopwatch-time">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
      </div>
    );
  }

  const clearRecord = ()=> {
    window.location.reload(false)
    localStorage.clear()
  }
 

  const diceElements = newDiceArray.map(die => 
    <Die key={die.id}
         value={die.value}
         index={newDiceArray.indexOf(die)}
         isHeld={die.isHeld}
         onclick={() => holdDice(die.id)} 
    /> 
    )
 
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

      setIsRunning(true)
      if(!tenzies){setNewDiceArray(oldDices => oldDices.map(die => {
        return die.isHeld ? 
          die :
          generateNewDie()
             
      } 
      ))
    } else {
      setIsRunning(false)
      setTenzies(false)
      setNewDiceArray(allNewDice())
      setTime(0)
      stopWatch()
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
      <div className='stopwatch'>{stopWatch()}</div> 
      
      <p className='record'   >Current Record: <i style={{color: 'rgb(172, 78, 78)', fontWeight: 'bold'}}>{records[records.length - 1]}</i>
                                       <button className='clear' 
                                            style={{
                                            fontSize: 12, 
                                            padding: 0, 
                                            width: 80, 
                                            height: 20, 
                                            marginLeft: 10,
                                            background: 'rgba(87, 87, 87, 0.7)',
                                            color: 'white'
                                            }} 
                                            onClick={() =>{clearRecord()}}>clear record
                                       </button>
      </p>  
      <hr/>                  
      <p style = {{fontSize: 10, margin: '5px auto 10px'}}>QIN勤©2023 up&qu</p>    
    </main>
  );
}
export default App;
