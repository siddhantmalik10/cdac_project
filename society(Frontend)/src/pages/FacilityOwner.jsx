import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

import { Table } from 'react-bootstrap';
import "../Styles/adduser.css";

const FacilityOwner = () => {
  const [users, setUsers] = useState([]);



  const [btn, setBtn] = useState("");


  const fetchUsers = async (e) => {
    const url = 'http://localhost:8080/Facility/get'; // Replace with your actual API endpoint

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        // console.log(response.data);
        setUsers(response.data);
        console.log(users);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const [credentials, setCredentials] = useState({
    id: undefined,
    available: undefined,
    code: "",
  });

  const handleButton = (action, id, available, code) => {
    setBtn(action);
    setCredentials({
      id: id,
      available: available,
      code: code,
    })
    console.log(credentials);

    // console.log(selectedHouseNo); // Store the selected houseNo when Update/Delete is clicked
  };

  const deleteFacilityById = async (id) => {
    const url = `http://localhost:8080/Facility/delete/${id}`; // Replace with your actual API endpoint

    try {
      const response = await axios.delete(url);

      if (response.status === 200) {
        alert(`Facility with id  ${ id } is deleted`)
      } else {
        // Handle other response statuses
      }
    } catch (error) {
      // Handle error
    }
  };
  const handleDelete = (id) => {
    deleteFacilityById(id);

  };

  return (
    <div className='container'>
      <div className='user-display'>
        <Button onClick={fetchUsers}>Show Facilities</Button>
        <h2>Facility List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Status</th>
              <th>Facility Name</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (

              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.available}</td>
                <td>{user.code}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='user-add'>

      </div>
    </div>
  )
}

export default FacilityOwner
