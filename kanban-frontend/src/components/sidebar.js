import React, { useState } from 'react';
import './styles/sidebar.css';

const Sidebar = ({ onSelect }) => {
  const [selected, setSelected] = useState(null); // State to track the selected item

  const handleSelect = (item) => {
    setSelected(item); // Update the selected state
    onSelect(item); // Call the onSelect function passed from the parent component
  };

  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li
          onClick={() => handleSelect('Dashboard')}
          className={selected === 'Dashboard' ? 'active' : ''}
        >
          Dashboard
        </li>
        <li
          onClick={() => handleSelect('tasks')}
          className={selected === 'tasks' ? 'active' : ''}
        >
          Tasks
        </li>
        <li
          onClick={() => handleSelect('users')}
          className={selected === 'users' ? 'active' : ''}
        >
          Users
        </li>
        <li
          onClick={() => handleSelect('About Us')}
          className={selected === 'About Us' ? 'active' : ''}
        >
          About Us
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
