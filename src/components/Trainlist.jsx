import { useState } from "react";
import TrainSearch from "./TrainSearch";


import { getTrainsByRoute  } from "../trainapi";
import FormatIsoDate  from "../utils/Timeformatter";
import AuthContent from "./SearchHistory";


function Trainlist() {
    const [trains, setTrains] = useState([]);

    const handleFetch = (shortcodes) => {
        getTrainsByRoute(shortcodes)
        .then(data => 
            {
                if (data.code === "TRAIN_NOT_FOUND") {
                    alert("Junia ei löytynyt");
                    setTrains([]);
                } else {
                     const filteredTrains = data.filter(train => train.trainType === "HL" || train.trainType === "HLV");
                    setTrains(filteredTrains);

                    const updatedTrains = filteredTrains.map(train => {
                        const startIndex = train.timeTableRows.findIndex(row => row.stationShortCode === shortcodes.start);
                        const endIndex = train.timeTableRows.findIndex(row => row.stationShortCode === shortcodes.end);
                        return { ...train, startIndex, endIndex };
                    });
    
                    const validTrains = updatedTrains.filter(train => {
                        const startTime = new Date(train.timeTableRows[train.startIndex]?.scheduledTime);
                        const endTime = new Date(train.timeTableRows[train.endIndex]?.scheduledTime);
                        return startTime <= endTime;
                    });
    
                    setTrains(validTrains);
                    console.log("loaded");
    
                    if (updatedTrains.length === 0) {
                        alert("Junia ei löytynyt");
                        setTrains([]);
                    }

                }
            })
            .catch(error => console.log(error));
    }




    return(
        <>
            <h1 className="title">Lähijunahaku</h1>
            <TrainSearch onSearch={handleFetch}/>
            <AuthContent/>
            <div className="train-info-container">
                {trains.map((train, index) => {
                    const startTime = train.timeTableRows[train.startIndex]?.scheduledTime;
                    const endTime = train.timeTableRows[train.endIndex]?.scheduledTime;
                    if (startTime && endTime) {
                        return (
                            <div key={index} className="train-info">
                                <h2>{train.commuterLineID}</h2>
                                <div className="time-container">
                                    {FormatIsoDate(startTime)}
                                    <p>—{">"}</p>
                                    {FormatIsoDate(endTime)}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </>
    )
}

export default Trainlist