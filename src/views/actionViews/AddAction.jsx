import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddAction.css';

const AddAction = (props) => {

  const [errors, setErrors] = useState([]);
  const [clientData, setClientData] = useState([]);
  const { id } = useParams();

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
    findOne();

  }, [id, setClientData]);

  const add = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const type = e.target.type.value;
    const description = e.target.description.value;
    const withWho = id;

    const newErrors = [];

    if (date === '') {
      newErrors.push('Data jest wymagana');
    }
    if (type === '-') {
      newErrors.push('Typ jest wymagany');
    }
    if (description === '') {
      newErrors.push('Opis jest wymagany');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([])
      axios.post(`http://localhost:8001/action/${id}/add`, {
        date,
        type,
        description,
        withWho
      })
        .then(() => { navigate(`../${id}`) })
        .catch(err => console.error(err));
    }
  }


  return (
    <div id="oneAfter">
      <div className="infoBox">
        <h2>{clientData.name}</h2>
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
      <div className="formAdd">
        <h2>Dodaj akcję</h2>
        <div className="errors" style={{ display: errors.length > 0 ? 'block' : 'none' }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={add}>
          <label htmlFor="date">Termin</label>
          <input type="date" name="date" id="date" />
          <label htmlFor="type">Typ</label>
          <select name="type" id="type">
            <option value="-"></option>
            <option value="Meeting">Meeting</option>
            <option value="Videocall">Videocall</option>
            <option value="Phonecall">Phonecall</option>
            <option value="Podpisanie umowy">Podpisanie umowy</option>
            <option value="Rozwiązanie umowy">Rozwiązanie umowy</option>
          </select>
          <label htmlFor="description">Opis</label>
          <textarea name="description" id="description" />
          <button type="submit" className="addBtn">Dodaj</button>
        </form>

      </div>
    </div>
  )
}

export default AddAction;