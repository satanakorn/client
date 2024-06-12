import logo from "./logo.svg";
import "./App.css";
import Axios from 'axios';
import { useState } from 'react';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [newname, setNewName] = useState("");
  const [newage, setNewAge] = useState(0);
  const [newcountry, setNewCountry] = useState("");
  const [newposition, setNewPosition] = useState("");
  const [newsalary, setNewSalary] = useState(0);

  const [employeelist, setEmployeelist] = useState([]);

  const getEmployee = () => {
    Axios.get('http://localhost:3001/employee').then((response) => {
      setEmployeelist(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary
    }).then(() => {
      setEmployeelist([
        ...employeelist,
        {
          id: employeelist.length + 1, // Assign a temporary ID
          name: name,
          age: age,
          country: country,
          position: position,
          salary: salary
        }
      ]);
    });
  };

  const updateEmployee = (id) => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      name: newname,
      age: newage,
      country: newcountry,
      position: newposition,
      salary: newsalary
    }).then((response) => {
      setEmployeelist(
        employeelist.map((val) => {
          return val.id === id
            ? {
                ...val,
                name: newname || val.name, // Use updated value or retain old if empty
                age: newage || val.age,
                country: newcountry || val.country,
                position: newposition || val.position,
                salary: newsalary || val.salary
              }
            : val;
        })
      );
    }).catch((error) => {
      console.error('Error updating employee:', error);
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeelist(
        employeelist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="enter age"
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter country"
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter position"
              onChange={(event) => setPosition(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="enter salary"
              onChange={(event) => setSalary(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success" onClick={addEmployee}>Add employee</button>
        </form>
      </div>
      <hr />

      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployee}>Show Employees</button>
        <br /><br />
        {employeelist.map((val, key) => {
          return (
            <div className="employee card" key={val.id}>
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <div className="d-flex">
                  <input type="text" placeholder="New Name" onChange={(event) => setNewName(event.target.value)} />
                </div>
                <p className="card-text">Age: {val.age}</p>
                <div className="d-flex">
                  <input type="number" placeholder="New Age" onChange={(event) => setNewAge(event.target.value)} />
                </div>
                <p className="card-text">Country: {val.country}</p>
                <div className="d-flex">
                  <input type="text" placeholder="New Country" onChange={(event) => setNewCountry(event.target.value)} />
                </div>
                <p className="card-text">Position: {val.position}</p>
                <div className="d-flex">
                  <input type="text" placeholder="New Position" onChange={(event) => setNewPosition(event.target.value)} />
                </div>
                <p className="card-text">Salary: {val.salary}</p>
                <div className="d-flex">
                  <input type="number" placeholder="New Salary" onChange={(event) => setNewSalary(event.target.value)} />
                </div>
                <button className="btn btn-warning" onClick={() => { updateEmployee(val.id); }}>Update</button>
                <button className="btn btn-danger" onClick={() => { deleteEmployee(val.id); }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
