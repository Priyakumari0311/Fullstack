import { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState(['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const newTaskList = tasks.filter((_, i) => i !== index);
    setTasks(newTaskList);
    if (editingIndex === index) {
      cancelEdit();
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = () => {
    if (editValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editValue;
      setTasks(updatedTasks);
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const filteredTasks = tasks.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-title">To-Do List</h1>
      
      {/* Add new task */}
      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="task-input"
        />
        <button 
          onClick={addTask} 
          className="add-button"
        >
          Add Task
        </button>
      </div>
      
      {/* Filter tasks */}
      <div className="filter-container">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter tasks"
          className="filter-input"
        />
      </div>
      
      {/* Tasks list */}
      <ul className="task-list">
        {filteredTasks.map((item, index) => (
          <li 
            key={index} 
            className="task-item"
          >
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                />
                <button
                  onClick={saveEdit}
                  className="save-button"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="task-content">
                <span>{item}</span>
                <div className="task-actions">
                  <button 
                    onClick={() => startEdit(index)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => removeTask(index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {/* Count display */}
      <p className="task-count">
        Total tasks: {tasks.length} | Showing: {filteredTasks.length}
      </p>
    </div>
  );
}

export default App;
