import './App.css';
import React, { Fragment } from 'react';
import InputShip from './components/InputShip';
import ListShips from './components/ListShips';

function App() {
  return ( <Fragment>
    <div className="container">
    <InputShip />
    <ListShips />
    </div>
    </Fragment>
  );
}

export default App;
