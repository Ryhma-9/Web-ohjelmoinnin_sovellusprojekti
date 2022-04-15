import React from 'react'

export default function Customerprofile() {
    return (
        <div className='Main2'>
            <h1>Asiakas profiili</h1>
        
        <div className='form'>
          
          <div className='formbuttons'>
          <button>Muokkaa tietoja</button>
          <button>Tilaushistoria</button>
          <button><b>Takaisin</b></button>
          </div>
            <div className='forminner'>
               <div><label>Nimi:</label></div><input></input>
           <label>Osoite:</label><input></input>
           <label>Puhelin:</label><input></input>
           <label>Käyttäjänimi:</label><input></input>
           <label>Salasana:</label><input></input>
            
           <div className='vaihdabutton'> 
             <button>Vaihda tiedot</button> <br></br>
             
             
                </div>  
            
    </div>
        </div>
        </div>
      )
    }
    