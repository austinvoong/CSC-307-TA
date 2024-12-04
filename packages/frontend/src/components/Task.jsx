// src/components/Task.jsx
import React, { useState, useEffect } from 'react'
import TaskAdd from './TaskAdd'
import TaskList from './TaskList'
import '../css/Task.css'

const Task = ({ tasks, addTask, toggleTaskCompletion }) => {
    const [filter, setFilter] = useState(null)
    const [activeFilter, setActiveFilter] = useState(null);
    
    const filteredTasks = filter
        ? tasks.filter((task) => task.priority === filter)
        : tasks;

    const filterButtons = [
        { value: 'high', label: 'High Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'low', label: 'Low Priority' },
        { value: null, label: 'Show All' }
    ];

    const handleFilterClick = (priority) => {
        setFilter(priority);
        setActiveFilter(priority);
    };

    return (
        <div className="task-container">
            <div className="task-controls">
                <TaskAdd addTask={addTask} />
                <div className="task-list-container">
                    <TaskList tasks={filteredTasks} toggleTask={toggleTaskCompletion} />
                    <div className="filter-buttons">
                        {filterButtons.map(button => (
                            <button 
                                key={button.label}
                                onClick={() => handleFilterClick(button.value)}
                                className={`filter-button ${activeFilter === button.value ? 'active' : ''}`}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task