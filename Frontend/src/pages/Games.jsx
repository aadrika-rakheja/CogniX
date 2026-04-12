import React from "react";
import { useState } from "react";

function Games()
{
     const[scores,setScores]=useState(0);

    return(
        <>
           <div>
            <h1>Game Dashboard</h1>
            <h2>Score:{scores}</h2>

            <button onClick={()=>{
                setScores(scores+1)
            }}>Increase Scores</button>

            <button onClick={()=>{
                setScores(0);
            }}>Reset</button>
           </div>
        </>
    );
}

export default Games;