import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/UserList.css';
import UserDetails from './UserDetails'; // Import the UserDetails component
// import {List} from 'antd';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State to manage selected user

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user); // Set the selected user to display UserDetails
    };

    const handleBackClick = () => {
        setSelectedUser(null); // Clear the selected user to show UserList again
    };

    return (
        <div className="user-list">
            {/*<List
                header={<div><h1>User List</h1></div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={users}
                renderItem={(item) => (
                    <List.Item>
                        <h2>{item.username}</h2>
                        <h3>{item.email}</h3>
                    </List.Item>
                )}
            /> */}
            {!selectedUser ? (
                <div>
                    <h1>User List</h1>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <span
                                    style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    onClick={() => handleUserClick(user)}
                                >
                                    {user.username}
                                </span><br />
                                <span style={{ fontSize: '14px', color: 'gray' }}>{user.email}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                // Render UserDetails if a user is selected
                <UserDetails user={selectedUser} onBack={handleBackClick} />
            )}
        </div>
    );
};

export default UserList;
