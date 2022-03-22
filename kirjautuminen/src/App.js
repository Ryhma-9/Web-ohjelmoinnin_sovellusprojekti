import './App.css';

function Kirjautuminen() {
  return (
    <div className='Main'>
   
      <h1>Tervetuloa Leipäjonoon!</h1>
       <div className="Kirjautumisboksi">
      
      <div className='Asiakaskirjautuminen'>
        Asiakas<br></br>
       
        <div className='käyttäjänimi'>
        Käyttäjänimi:<br></br><input className='input'></input>
        <br></br>
        Salasana:<br></br><input className='input'></input>
        <br></br>
        <div className='buttonlayout'>
        <button className='kirjaudu'>Kirjaudu</button>
        <br></br>
        <button className='rekisteröidy'>Rekisteröidy</button>
        </div>
      </div>
      </div>
     
     <div className='Ravintoloitsijakirjautuminen'>
        Ravintoloitsija<br></br>
        
        <div className='käyttäjänimi'>
        Käyttäjänimi:<br></br><input className='input'></input>
        <br></br>
        Salasana:<br></br><input className='input'></input>
        <br></br>
        <div className='buttonlayout'>
        <button className='kirjaudu'>Kirjaudu</button>
        <br></br>
        <button className='rekisteröidy'>Rekisteröidy</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Kirjautuminen;
