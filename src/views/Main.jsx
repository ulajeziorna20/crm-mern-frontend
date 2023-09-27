import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import MainRoutes from "../routes/MainRoutes";
import './Main.css';

const Main = (props) => {

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);

    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8001/client/')
            .then(res => setClients(res.data))
            .catch(err => console.error(err));
    }, []);

    const addClient = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const company = e.target.company.value;
        const address = e.target.address.value;
        const nip = e.target.nip.value;

        const newErrors = [];

        if (name === '') {
            newErrors.push('Nazwa jest wymagana');
        }
        if (company === '') {
            newErrors.push('Firma jest wymagana');
        }
        if (address === '') {
            newErrors.push('Adres jest wymagany');
        }
        if (nip === '') {
            newErrors.push('NIP jest wymagany');
        }
        if (nip.length !== 10) {
            newErrors.push('NIP musi zawierać 10 cyfr');
        }

        if (newErrors.length > 0) {
            props.setErrors(newErrors);
        } else {
            props.setErrors([])
            axios.post('http://localhost:8001/client/', {
                name,
                company,
                address,
                nip
            })
                .then(() => { navigate(`../customer/`) })
                .catch(err => console.error(err));
        }
    }

    const handleSearchText = (event) => {
        const searchString = event.target.value;
        setSearchText(searchString);
        console.log(searchText);
    }

    useEffect(() => {
        const filterClients = () => {
            const filteredClients = clients.filter((client) =>
                client.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredClients(filteredClients);
        }

        filterClients();
    }, [clients, searchText])


    return (
        <div className="main">
            <div className="divide">
                <div id="shortClients">
                    <input placeholder="szukaj..." onChange={handleSearchText} value={searchText}></input>
                    <ul>
                        {filteredClients.map((client) => {
                            return (
                                <li className="clientShort" key={client._id}>
                                    <a href={"/customer/add/" + client._id}>{client.name}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <MainRoutes token={props.token} clients={clients} addClientMtd={addClient} errors={props.errors} />
            </div>
        </div>
    )
}

export default Main;