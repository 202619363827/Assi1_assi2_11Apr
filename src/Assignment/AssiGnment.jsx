import React, { useState } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setUsers([...users, formData]);
      setFormData({
        name: '',
        age: '',
        email: '',
        phone: ''
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (data) => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    if (!data.name) {
      errors.name = 'Name is required';
    }
    if (!data.age) {
      errors.age = 'Age is required';
    } else if (isNaN(data.age) || parseInt(data.age) <= 0) {
      errors.age = 'Age must be a positive number';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(data.email)) {
      errors.email = 'Invalid email';
    }
    if (!data.phone) {
      errors.phone = 'Phone is required';
    } else if (!phonePattern.test(data.phone)) {
      errors.phone = 'Invalid phone number';
    }
    return errors;
  }

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  }

  const handleEditUser = (index) => {
    const user = users[index];
    setFormData({
      name: user.name,
      age: user.age,
      email: user.email,
      phone: user.phone
    });
    handleDeleteUser(index);
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Form</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <br />
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" name="age" value={formData.age} onChange={handleInputChange} />
            {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <br />
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            <br />
            <button type="submit">Add User</button>
          </form>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Added Users</h2>
          {users.length === 0 ? (
            <p>No users added yet</p>
          ) : (
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  <strong>Name: </strong> {user.name}<br />
                  <strong>Age: </strong> {user.age}<br />
                  <strong>Email: </strong> {user.email}<br />
                  <strong>Phone: </strong> {user.phone}<br />
                  <button onClick={() => handleDeleteUser(index)}>Delete</button>
                  <button onClick={() => handleEditUser(index)}>Edit</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default User;