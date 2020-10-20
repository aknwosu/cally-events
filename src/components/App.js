import React, { useState} from 'react';
import GoogleAuth from './Authorization/GoogleAuth'

function App() {
  const [calendars, setCalendars] = useState({});
  const [colourToSummary, setColourToSummary] = useState({})

  return (
    <div className="App">
      <GoogleAuth
        setColourToSummary={setColourToSummary}
        setCalendars={setCalendars}
      />
      {console.log(calendars)}
    </div>
  );
}

export default App;
