export function getTrainsByRoute(locations) {
 return fetch(import.meta.env.VITE_TRAIN_API_URL + locations.start + "/" + locations.end)
 .then(response =>{
    if (!response.ok) 
        throw new Error("Error in fetch" + response.statusText);
    
        return response.json();
    
 })   
}