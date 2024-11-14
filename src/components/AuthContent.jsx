import { useState, useEffect } from 'react';
import { request } from '../helpers/axios_helper';

const AuthContent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        request(
            "GET",
            "/messages",
            {}
        ).then((response) => {
            setData(response.data);
        });
    }, []); 

    return (
        <div>
            {data && data.map((line, index) => <p key={index}>{line}</p>)}
        </div>
    );
};

export default AuthContent;