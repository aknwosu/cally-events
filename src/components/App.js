import React, { useState} from 'react';
import GoogleAuth from './Authorization/GoogleAuth'

function App() {
  const [calendars, setCalendars] = useState({});
  const [colorToSummary, setColorToSummary] = useState({})

  return (
    <div className="App">
      <GoogleAuth
        setColorToSummary={setColorToSummary}
        setCalendars={setCalendars}
      />
      {console.log(calendars, colorToSummary)}
    </div>
  );
}

export default App;
