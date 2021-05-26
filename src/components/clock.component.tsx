import { useState, useEffect } from 'react';

const date2date = () => (
  new Date().toLocaleTimeString("az", {
    timeZone: "Asia/Baku",
    hour12: false,
  })
)

const Clock = () =>{
  const [date, setDate] = useState(date2date());

  useEffect(() => {
    let timerID = setInterval( () => tick(), 1000 );

    return () => {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setDate(date2date());
  }

  return <p className="App-clock">{date}</p>
   
}

export default Clock