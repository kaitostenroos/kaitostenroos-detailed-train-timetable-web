import { useState, useEffect } from 'react';
import { deleteSearchHistory, getSearchHistory } from '../backendapi';

const SearchHistory = ({ startStation, endStation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSearchHistory();
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [startStation, endStation]);

    const handleDelete = async (id) => {
        try {
            await deleteSearchHistory(id);
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting search history:', error);
        }
    };

    return (
        <div className='search-history-container'>
            <h2>Haku historia</h2>
            <ul>
                {data.slice().reverse().map((item, index) => (
                    <li key={index}>
                        <div><p>{item.startStation} -&gt; {item.endStation}</p>
                        <button onClick={() => handleDelete(item.id)}>❌</button></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;