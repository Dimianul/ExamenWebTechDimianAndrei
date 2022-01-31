import React, { Fragment, useEffect, useState } from "react";

import EditShip from "./EditShip";

const ListShips = () => {
  const [ships, setShips] = useState([]);

  //delete ship function

  const deleteShip = async id => {
    try {
      const deleteShip = await fetch(`http://localhost:5000/ships/${id}`, {
        method: "DELETE"
      });

      setShips(ships.filter(ship => ship.ship_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getShips = async () => {
    try {
      const response = await fetch("http://localhost:5000/ships");
      const jsonData = await response.json();

      setShips(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getShips();
  }, []);

  console.log(ships);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {ships.map(ship => (
            <tr key={ship.ship_id}>
              <td>{ship.description}</td>
              <td>
                <EditShip ship={ship} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteShip(ship.ship_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListShips;