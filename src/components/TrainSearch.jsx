import { useState} from "react";
import { TextField, Autocomplete, Button } from "@mui/material";

const TrainSearch = ({ onSearch }) => {

    const [stationNames, setStationNames] = useState({
        start: "",
        end: ""
    });

    const [shortcodes, setShortcodes] = useState({
        start: "",
        end: ""
    });

    const trainStations = [
        { label: "Ainola", id:"AIN" },
        { label: "Aviapolis", id:"AVP" },
        { label: "Espoo", id:"EPO" },
        { label: "Haarajoki", id:"HAA" },
        { label: "Helsinki", id:"HKI" },
        { label: "Henna", id:"HNN" },
        { label: "Hiekkaharju", id:"HKH" },
        { label: "Huopalahti", id:"HPL" },
        { label: "Hyvinkää", id:"HY" },
        { label: "Ilmala", id:"ILA" },
        { label: "Jokela", id:"JK" },
        { label: "Jorvas", id:"JRS" },
        { label: "Järvenpää", id:"JP" },
        { label: "Kaivoksela", id:"KAI" },
        { label: "Kannelmäki", id:"KAN" },
        { label: "Kauklahti", id:"KLH" },
        { label: "Kauniainen", id:"KNI" },
        { label: "Kerava", id:"KE" },
        { label: "Kera", id:"KEA" },
        { label: "Kirkkonummi", id:"KKN" },
        { label: "Kilo", id:"KIL" },
        { label: "Kivistö", id:"KTÖ" },
        { label: "Koivuhovi", id:"KVH" },
        { label: "Koivukylä", id:"KVY" },
        { label: "Korso", id:"KRS" },
        { label: "Käpylä", id:"KÄP" },
        { label: "Lahti", id:"LH" },
        { label: "Leinelä", id:"LNÄ" },
        { label: "Leppävaara", id:"LPV" },
        { label: "Lentoasema", id:"LEN" },
        { label: "Lempäälä", id:"LPÄ" },
        { label: "Louhela", id:"LOH" },
        { label: "Malmi", id:"ML" },
        { label: "Malminkartano", id:"MLO" },
        { label: "Martinlaakso", id:"MRL" },
        { label: "Masala", id:"MAS" },
        { label: "Mäkkylä", id:"MÄK" },
        { label: "Mäntsälä", id:"MLÄ" },
        { label: "Myyrmäki", id:"MYR" },
        { label: "Nokia", id:"NOA" },
        { label: "Oulunkylä", id:"OLK" },
        { label: "Pasila", id:"PSL" },
        { label: "Pitäjänmäki", id:"PJM" },
        { label: "Pohjois-Haaga", id:"POH" },
        { label: "Puistola", id:"PLA" },
        { label: "Pukinmäki", id:"PMK" },
        { label: "Rekola", id:"RKL" },
        { label: "Riihimäki", id:"RI" },
        { label: "Saunakallio", id:"SAU" },
        { label: "Savio", id:"SAV" },
        { label: "Siuntio", id:"STI" },
        { label: "Tampere", id:"TPE" },
        { label: "Tapanila", id:"TNA" },
        { label: "Tikkurila", id:"TKL" },
        { label: "Toijala", id:"TL" },
        { label: "Tolsa", id:"TOL" },
        { label: "Tuomarila", id:"TRL" },
        { label: "Valimo", id:"VMO" },
        { label: "Vantaankoski", id:"VKS" },
        { label: "Vehkala", id:"VEH" }
    ];

    const handleStartStationChange = (event, value) => {
        setShortcodes({ ...shortcodes, start: value?.id || "" });
        setStationNames({ ...stationNames, start: value?.label || "" });
    };

    const handleEndStationChange = (event, value) => {
        setShortcodes({ ...shortcodes, end: value?.id || "" });
        setStationNames({ ...stationNames, end: value?.label || "" });
    };

    const handleSubmit = () => {
        console.log("loading")
        if (shortcodes.start === "" || shortcodes.end === "") {
            alert("Valitse asemat");
            return;
        } else if (shortcodes.start === shortcodes.end) {
            alert("Valitse eri asemat");
            return;
        } else {
            onSearch(shortcodes, stationNames);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
    <div className="search-container">
                <Autocomplete
                    disablePortal
                    options={trainStations}
                    onChange={handleStartStationChange}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Mistä"
                        sx={{
                            width: 300,
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
                    onChange={handleEndStationChange}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Mihin"
                        sx={{
                            width: 300,
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
    );
};

export default TrainSearch;