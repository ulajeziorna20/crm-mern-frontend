import React from "react";
import './Actions.css';

const Actions = (props) => {

  return (
    <div className="actions">
      <table className="actionTable">
        <thead>
          <tr>
            <th colSpan={4}>Akcje</th>
          </tr>
          <tr>
            <th>Data</th>
            <th>Rodzaj</th>
            <th>Opis</th>
            <th>Zakończone</th>
          </tr>
          {(props.actions.length > 0) ? ('') : (<tr>
            <td colSpan={4}>Brak Akcji</td>
          </tr>)}

        </thead>
        <tbody>
          {props.actions.sort((a, b) => new Date(b.date) - new Date(a.date)).map((action) =>
            <tr key={action._id}>
              <td>{action.date}</td>
              <td>{action.type}</td>
              <td>{action.description}</td>
              <td>{(new Date(action.date) < new Date()) ? '✅' : '▪▪▪'}</td>
            </tr>
          )}
        </tbody>
      </table>

      <a id="addActionBtn" href={`http://localhost:3000/customer/add/${props.clientData._id}/addAction`}>Dodaj akcję</a>
    </div>

  )
}

export default Actions;