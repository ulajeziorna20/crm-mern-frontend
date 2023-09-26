import React from "react";
import "./Client.css";

const Client = (props) => {

  return (
    <>
      <a className="client-box" key="0" href="/customer/add">
        <h2>Dodaj klienta</h2>

        <div className="plus"><p>+</p></div>
      </a>
      {props.clients.map((client) => {
        return (
          <a className="client-box" key={client._id} href={"/customer/add/" + client._id}>
            <h2>{client.name}</h2>
            <table>
              <tbody>
                <tr>
                  <th>Firma</th>
                  <td>{client.company}</td>
                </tr>
                <tr>
                  <th>Adres</th>
                  <td>{client.address}</td>
                </tr>
                <tr>
                  <th>NIP</th>
                  <td>{client.nip}</td>
                </tr>
              </tbody>
            </table>
          </a>
        )
      })}
    </>
  )
}

export default Client;