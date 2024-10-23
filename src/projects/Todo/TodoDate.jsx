import { useEffect, useState } from "react";
export const TodoDate = () =>{
    //todo date and time/////////////////////////////////////////////////////////

    const [dateTime, setDateTime] = useState("");

    const getDateTime=()=>{
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        setDateTime(`${formattedDate} - ${formattedTime}`)
        };
        useEffect(()=>{
            const interval = setInterval(()=>{
                getDateTime();
            },1000);
            return ()=>clearInterval()
        },[]);

    return <h2 className="date-time">{dateTime}</h2>

}