import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';


const EditClient = (props) => {

  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [client, setClient] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8001/client/${id}`)
      .then(res => {
        setClient(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const editClient = (e) => {
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
      setErrors(newErrors);
    } else {
      setErrors([])
      axios.put(`http://localhost:8001/client/${id}`, {
        name,
        company,
        address,
        nip
      })
        .then(() => navigate(`../${id}`))
        .catch(err => console.error(err));
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="formAdd">
      <h2>Edytuj klienta</h2>
      <div className="errors" style={{ display: errors.length > 0 ? 'block' : 'none' }}>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={editClient}>
        <label htmlFor="name">Nazwa klienta</label>
        <input type="text" name="name" id="name" value={client.name || ''} onChange={handleInputChange} />
        <label htmlFor="company">Firma</label>
        <input type="text" name="company" id="company" value={client.company || ''} onChange={handleInputChange} />
        <label htmlFor="address">Adres</label>
        <input type="text" name="address" id="address" value={client.address || ''} onChange={handleInputChange} />
        <label htmlFor="nip">NIP</label>
        <input type="number" name="nip" id="nip" value={client.nip || ''} onChange={handleInputChange} />
        <button type="submit" className="addBtn" >Zapisz</button>
      </form>

    </div>
  )
}

export default EditClient;