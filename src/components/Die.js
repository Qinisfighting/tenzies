import '../App.css';
import React from "react"

function Die(props) {

    function styles() {
      if (props.isHeld === false) {
        if (props.index === 3 || props.index === 6) {
          return "one item"
        }
        if (props.index === 1 || props.index === 8) {
          return "two item"
        }
        if (props.index === 4 || props.index === 7) {
          return "three item"
        }
        if (props.index === 0 || props.index === 9) {
          return "four item"
        }
        if (props.index === 2 || props.index === 5) {
          return "five item"
        }
      } else {
        return "held"
      }
    
  }
  /**/
    function diceStyles(props){
       
      if(props.value === 1){
        return <div className="face">
                 <span className="pip" style={{marginTop: 14}}></span>        
               </div>
      }
      if(props.value === 2){
        return <div className="face">
                 <span className="pip"></span>
                 <span className="pip" style={{marginTop: 14}}></span>   
               </div>
      }
      if(props.value === 3){
        return <div className="face">
                 <span className="pip"></span>
                 <span className="pip"></span>
                 <span className="pip"></span>          
               </div>
      }
      if(props.value === 4){
         return <div className="face">
                  <span className="pip" style={{marginTop: 2}}></span>
                  <span className="pip" style={{marginTop: 10}}></span>
                  <span className="pip" style={{marginTop: 2}}></span>
                  <span className="pip" style={{marginTop: 10}}></span>
               
               </div>
      }
      if(props.value === 5){
        return <div className="face">
                  <span className="pip"></span>
                  <span className="pip"></span>  
                  <span className="pip"></span>  
                  <span className="pip"></span>  
                  <span className="pip"></span>          
               </div>
      }
      if(props.value === 6){
        return <div className="face">
                  <span className="pip"></span>
                  <span className="pip"></span>  
                  <span className="pip"></span>  
                  <span className="pip"></span>  
                  <span className="pip"></span>  
                  <span className="pip"></span>          
              </div>
    }
  }
   return (
  <div
    className={styles()}
    onClick={typeof props.onclick === 'function' ? props.onclick : () => {}}
  >
    {diceStyles(props)}
  </div>
)
    
  }
  

  export default Die
