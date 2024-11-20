import { useState} from "react";
import { TextField, Autocomplete, Button } from "@mui/material";

const TrainSearch = ({ onSearch}) => {

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
        onSearch(shortcodes);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
    <div className="search-container">
                <h2>Asemat</h2>
                <Autocomplete
                    disablePortal
                    options={trainStations}
                    sx={{ width: 150 }}
                    onChange={(event, value) => setShortcodes({ ...shortcodes, start: value?.id || "" })}
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
                    onChange={(event, value) => setShortcodes({ ...shortcodes, end: value?.id || "" })}
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
    );
};

export default TrainSearch;