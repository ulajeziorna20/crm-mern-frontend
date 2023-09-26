import React, { useEffect, useState } from "react";
import axios from 'axios';
import Client from "../components/Client";
import "./Home.css";


const Home = (props) => {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/client/')
            .then(res => setClients(res.data))
            .catch(err => {console.error(err);
            });
    }, []);

    return (
        <div className="home">
            <h1>Lista Klientów</h1>
            <div className="clientsList">
                <Client clients={clients}/>
            </div>
        </div>
    )
}

export default Home;