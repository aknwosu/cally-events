import React, { useState} from 'react';
import GoogleAuth from './Authorization/GoogleAuth'
import Calendar from './Calendar'
function App() {
  const [calendars, setCalendars] = useState({});
  const [colorToSummary, setColorToSummary] = useState({})

  return (
    <div className="App">
      <GoogleAuth
        setColorToSummary={setColorToSummary}
        setCalendars={setCalendars}
      />

      <Calendar calendars={calendars} colorToSummary={colorToSummary} />
    </div>
  );
}

export default App;
