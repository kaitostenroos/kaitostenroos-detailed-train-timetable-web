import { useState, useEffect } from 'react';
import { getSearchHistory } from '../backendapi';

const SearchHistory = ({ startStation, endStation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSearchHistory();
                console.log(response);
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [startStation, endStation]);

    return (
        <div>
            <h2>Haku historia</h2>
            <ul>
                {data.slice().reverse().map((item, index) => (
                    <li key={index}>
                        <p>{item.startStation} - {item.endStation}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;