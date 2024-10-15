import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './App.css';
import Sidebar from './components/sidebar';
import './components/styles/sidebar.css';
import TaskList from './components/TaskList';
import Info from './components/Info';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard'; 

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('tasks'); // Default to tasks

  const handleSelect = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Router> 
      <div className="app-container" style={{ display: 'flex' }}>
        {/* Sidebar for Navigation */}
        <Sidebar onSelect={handleSelect} />
        
        {/* Main content area */}
        <div className="main-content" style={{ width: '75%', padding: '20px' }}>
          {/* Render component based on selection */}
          {selectedComponent === 'Dashboard' && <Dashboard />}
          {selectedComponent === 'tasks' && <TaskList />}
          {selectedComponent === 'users' && <UserList />}
          {selectedComponent === 'About Us' && <Info />} 
        </div>
      </div>
    </Router>
  );
};

export default App;
