import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import './SingleClient.css';
import Actions from '../../components/Actions';

const SingleClient = (props) => {

  const { id } = useParams();
  const [clientData, setClientData] = useState([]);
  const [actions, setActions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const findOne = async () => {
      try {
        const oneClient = await axios.get(`http://localhost:8001/client/${id}`);
        setClientData(oneClient.data);
      } catch (err) {
        console.error(err);
      }
    };

    const byClient = async () => {
      try {
        const clientsAction = await axios.get(`http://localhost:8001/action/${id}`);
        setActions(clientsAction.data);
      } catch (err) {
        console.error(err);
      }
    };

    byClient();
    findOne();

  }, [id, setClientData, setActions]);

  const deleteClient = async () => {
    const shouldDelete = window.confirm('Czy na pewno chcesz usunąć klienta?');
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:8001/client/${clientData._id}`);
        navigate(`/customer/`)
      } catch (err) {
        console.error(err);
      }
    }
  };



  return (
    <div className="singleClient">
      <div className="infoBox">
        <h2>{clientData.name}
          <Link className="editbtn" to={`/customer/add/${clientData._id}/edit`}>⚙Edytuj</Link>
          <button className="deletebtn" onClick={deleteClient}>🗑Usuń</button></h2>
        <table className="actionTable">
          <thead>
            <tr>
              <th colSpan={2}>Informacje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Firma</th>
              <td>{clientData.company}</td>
            </tr>
            <tr>
              <th>Adres</th>
              <td>{clientData.address}</td>
            </tr>
            <tr>
              <th>NIP</th>
              <td>{clientData.nip}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Actions clientData={clientData} actions={actions} />
    </div>
  )
}

export default SingleClient;