import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PasswordInput from '../components/PasswordInput';
import "./UserDashboard.css"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/allusers');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/user/${id}`);
      alert('User deleted successfully.');
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  // Handle save user (update)
  const handleSave = async (id) => {
    try {
      const updatedUser = users.find(user => user.id === id);
      await axios.put(`http://localhost:5000/api/user/user/${id}`, updatedUser);
      alert('User updated successfully.');
      setEditingUser(null);
    } catch (err) {
      alert('Failed to update user.');
    }
  };

  // Handle input change for editing
  const handleInputChange = (id, field, value) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  // Handle new user addition
  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/user', newUser);
      setUsers([...users, { ...newUser, id: response.data.id }]);
      setShowForm(false);
      alert('User created successfully!');
    } catch (err) {
      alert('Failed to create user.');
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 h-full bg-white overflow-y-auto no-scrollbar">
      <div className="block right-0 top-20 fixed">
                    <button
                       onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-blue-700"
                    >
                       {showForm ? 'Cancel' : 'Add New User'}
                    </button>
                </div>
     
      <h2 className="text-3xl font-bold top-25 text-center mb-6">User Management</h2>

      {/* Add New User Button */}
      

      {/* New User Form */}
      {showForm && (
        <div className=" flex justify-center mb-10">
          <form
            className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
            onSubmit={async (e) => {
              e.preventDefault();
              const newUser = {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                dob: e.target.dob.value,
                phone: e.target.phone.value,
              };
              await handleAddUser(newUser);
            }}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">Add New User</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="username"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="email"
              required
            />
            <PasswordInput
              value=""
              placeholder="Password"
              onChange={(e) => {
                e.target.setAttribute('name', 'password'); // Ensure password field has a name attribute
              }}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="date"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Date of Birth"
              name="dob"
              required
            />
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Phone Number"
              name="phone"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
            >
              Add User
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => handleInputChange(user.id, 'username', e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="px-4 py-2">
                {editingUser === user.id ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-4 py-2 flex gap-2">
                {editingUser === user.id ? (
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleSave(user.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => setEditingUser(user.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
