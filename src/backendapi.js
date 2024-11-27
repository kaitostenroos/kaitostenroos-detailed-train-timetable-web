import { request } from "./helpers/axios_helper";

export async function getSearchHistory() {
    try {
        const response = await request("GET", "/history", {});
        if (response.status !== 200) {
            throw new Error("Error in fetch: " + response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching search history:", error);
        throw error;
    }
}

export function postSearchHistory(startStationId,startStation, endStationId,endStation) {
    const data = { startStation, endStation };
    return request("POST",`http://localhost:8080/api/history/${startStationId}/${startStation}/${endStationId}/${endStation}`, data);
}