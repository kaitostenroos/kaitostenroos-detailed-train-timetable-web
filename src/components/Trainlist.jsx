import { useState } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";


import { getTrainsByRoute  } from "../trainapi";
import FormatIsoDate  from "../utils/Timeformatter";


function Trainlist() {
    const [trains, setTrains] = useState([]);
    const [shortcodes, setShortcodes] = useState({
        start: "",
        end: ""
    });

    const trainStations = [
        { label: "Helsinki", id:"HKI"},
        { label: "Pasila", id:"PSL"},
        { label: "Tikkurila", id:"TKL"},
        { label: "Kerava", id:"KE"}
    ];

    const handleSubmit = () => {
        console.log("loading")
        if (shortcodes.start === "" || shortcodes.end === "") {
            alert("Valitse asemat");
            return;
        } else if (shortcodes.start === shortcodes.end) {
            alert("Valitse eri asemat");
            return;
        } else
        handleFetch();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleFetch = () => {
        getTrainsByRoute(shortcodes)
        .then(data => 
            {
                const filteredTrains = data.filter(train => train.trainType === "HL");
                setTrains(filteredTrains);

                // Set station indexes based on the first train's timeTableRows
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
                }
            })
            .catch(error => console.log(error));
    }

    const  handleStationChange = (event, value, startOrEnd) => { 
        if (startOrEnd === "start") {
            setShortcodes({ start: value ? value.id : '', end: shortcodes.end });
        } else {
            setShortcodes({ start: shortcodes.start, end: value ? value.id : '' });
        }
    }


    return(
        <>
            <h1 className="title">Lähijunahaku</h1>
            <div className="search-container">
                <h2>Asemat</h2>
                <Autocomplete
                    disablePortal
                    options={trainStations}
                    sx={{ width: 150 }}
                    onChange={(event, value) => handleStationChange(event, value, "start")}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Mistä"
                        sx={{
                            backgroundColor: 'transparent', 
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'transparent', 
                                '&:hover fieldset': {
                                    borderColor: 'green', 
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'green', 
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'green', 
                            },
                        }}
                    />
                )}
                />
                <Autocomplete
                    disablePortal
                    options={trainStations}
                    sx={{ width: 150 }}
                    onChange={(event, value) => handleStationChange(event, value, "end")}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Mihin"
                        sx={{
                            backgroundColor: 'transparent',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'transparent',
                                '&:hover fieldset': {
                                    borderColor: 'green', 
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'green', 
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'green', 
                            },
                        }}
                    />
                )}
                />
                <Button
                    variant="contained"
                    color="green"
                    onClick={handleSubmit}
                    sx={{ margin: 0,
                        height: 55,
                    }}
                >
                    Hae junia
                </Button>
            </div>
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