import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Table() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:2233/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (index) => {
    const selectedUser = users[index];
    const isSelected = selectedRows.includes(selectedUser);

    if (isSelected) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((user) => user !== selectedUser)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, selectedUser]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...users]);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete the selected users?');
  
      if (isConfirmed) {
        const selectedUserIds = selectedRows.map((user) => user._id);
  
        const response = await fetch('http://localhost:2233/users/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIds: selectedUserIds }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete users');
        }
  
        fetchUsers();
        setSelectedRows([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = () => {
    if (selectedRows.length > 0) {
      const userIds = selectedRows.map(user => user._id);
      navigate(`/update/${userIds.join(',')}`);
    } else {
      alert('Please select at least one user to update.');
    }
  };

  return (
    <div id="table">
      <div className="header">
        <h1 className="pt-3 ps-5">Form-Admin</h1>
        <button className="upbtn" onClick={handleUpdateClick}>
            Update
        </button>
        <button className="delbtn" onClick={handleDeleteSelected}>
          Delete 
        </button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
