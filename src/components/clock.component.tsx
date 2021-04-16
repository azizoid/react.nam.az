import React, { useState, useEffect } from 'react';

const Clock = () =>{
  const [date, setDate] = useState(new Date().toLocaleTimeString("az", {
    timeZone: "Asia/Baku",
    hour12: false,
  }));

 useEffect(() => {
  let timerID = setInterval( () => tick(), 1000 );

  return function cleanup() {
      clearInterval(timerID);
    };
 });

   function tick() {
    setDate(
      new Date().toLocaleTimeString("az", {
        timeZone: "Asia/Baku",
        hour12: false,
      })
    );
   }

   return <p className="App-clock">{date}</p>
   
}

export default Clock