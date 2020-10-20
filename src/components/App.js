import React, { useState} from 'react';
import GoogleAuth from './Authorization/GoogleAuth'

function App() {
  const [calendars, setCalendars] = useState({});
  const [colourToSummary, setColourToSummary] = useState({})

  return (
    <div className="App">
      <GoogleAuth
        setCalendars={setCalendars}
      />
    </div>
  );
}

export default App;
