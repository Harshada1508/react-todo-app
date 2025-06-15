import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('created');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === '') {
      alert('Task cannot be empty.');
      return;
    }
    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'active') return !t.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'alpha') return a.text.localeCompare(b.text);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="todo-container">
      <h2>My To-Do List</h2>

      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="controls">
        <label>Filter:
          <select onChange={e => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>Sort:
          <select onChange={e => setSort(e.target.value)} value={sort}>
            <option value="created">Created Time</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </label>
      </div>

      <ul className="task-list">
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => handleDelete(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
