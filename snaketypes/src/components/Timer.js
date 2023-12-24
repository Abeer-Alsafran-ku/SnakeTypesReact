import { useEffect, useState } from "react";
import "../assets/css/Timer.css"

const Timer = (props) => {
    

    useEffect(() => {
        let interval;
        if (props.running) {
            interval = setInterval(() => {
                props.setTime((prevTime) => prevTime + 10)
            }, 10);
        }
        else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [props.running]);


    return (
        <div className="Timer">
            <h5>Timer</h5>
            <div>
                <span className="time">{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
                <span className="time">{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
                <span className="time">{("0" + (props.time / 10) % 100).slice(-2)}</span>
            </div>



            {/* <div>
                {props.running ? 
                    (<button onClick={() => { props.setRunning(false) }}>Stop</button>)
                    :
                    ( <button onClick={() => { props.setRunning(true) }}>Start</button>)
                }
                <button onClick={() => { props.setTime(0) }}>Reset</button>
            </div> */}

        </div>
    );
}

export default Timer;