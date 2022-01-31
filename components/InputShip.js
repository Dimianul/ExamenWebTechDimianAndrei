import React, {Fragment, useState} from 'react';

const InputShip = () => {

    const [name, setName] = useState ("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/create", {
                method: "POST",
                headers: { "Content-Type": "application/json"}
            });

            console.log(response);
        } catch (error) {
            console.error(error.message)
            
        }
    }
  return (
      <Fragment>
        <h1 className="text-center ny-5">Input ship!</h1>
        <form className="d-flex " onSubmit={onSubmitForm}>
            <input type="text" placeholder="Add Ship!" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder="Add Displacement!" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
            <button className ="btn btn-success"> Add! </button>
        </form>
      </Fragment>
  )
};
export default InputShip;
