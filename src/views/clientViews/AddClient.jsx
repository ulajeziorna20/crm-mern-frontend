import React from "react";
import './AddClient.css';

const AddClient = (props) => {

  return (
    <div className="formAdd">
      <h2>Dodaj klienta</h2>
      <div className="errors" style={{ display: props.errors.length > 0 ? 'block' : 'none' }}>
        <ul>
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={props.addClient}>
        <label htmlFor="name">Nazwa klienta</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="company">Firma</label>
        <input type="text" name="company" id="company" />
        <label htmlFor="address">Adres</label>
        <input type="text" name="address" id="address" />
        <label htmlFor="nip">NIP</label>
        <input type="number" name="nip" id="nip" />
        <button type="submit" className="addBtn">Dodaj</button>
      </form>

    </div>
  )
}

export default AddClient;