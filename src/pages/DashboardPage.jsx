import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Bell, Edit2, Trash2, CheckCircle, RotateCcw } from 'lucide-react';
import SummaryCards from '../components/SummaryCards';
import AddTaskModal from '../components/AddTaskModal';
import { deleteTask, updateTask } from "../store/taskSlice";
import "./DashboardPage.css";
import { LogoutOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const tasks = useSelector(state => state.tasks.items);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username") || "User";

  const onLogoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = '/';
  }

  const handleOpenAddTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

const handleDelete = (id) => {
  dispatch(deleteTask(id));
};

  const handleToggleStatus = (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    dispatch(updateTask({ ...task, status: newStatus }));
  };

  return (
    <div className="dashboard-wrapper"> 
      <nav className="nav-container">
        <div className="logo-section">
          <div className="logo-box"><img src="TaskFlow2.png" height={67} width={67}/></div>
          <span className="logo-text">TaskFlow</span>
        </div>
        
        <div className="nav-menu">
          <button className="nav-item active">My Tasks</button>
          <button className="nav-item">Calendar</button>
          <button className="nav-item">Settings</button>
        </div>
        
        <div className="profile-section">
          <Bell className="notification-icon" size={20} />
          <div className="user-info">
            <div className="user-avatar">{username[0].toUpperCase()}</div>
            <span className="user-name">{username}</span>
            <button className='logout-btn' onClick={onLogoutHandler}>
                <LogoutOutlined style={{color: 'black'}} />
            </button>
          </div>
        </div>
      </nav>

      <main className="content-container">
        <div className="welcome-header">
          <div className="welcome-text">
            <h1 className="main-title">Welcome Back 👋</h1>
            <p className="main-subtitle">Here’s an overview of your productivity</p>
          </div>

          <button onClick={handleOpenAddTask} className="btn-add-task">
            <Plus size={18} /> New Task
          </button>
        </div>

        <SummaryCards />

        <div className="task-table-card">
          <div className="table-header">
            <h2 className="table-title">Your Tasks</h2>
          </div>

          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th style={{ textAlign: 'right', paddingRight: '40px' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <div className="empty-content">
                      <span className="empty-emoji">📭</span>
                      <p className="empty-title">No tasks yet</p>
                      <p className="empty-subtitle">Create your first task to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="task-row">
                    <td className={`task-name ${task.status === 'Completed' ? 'strikethrough' : ''}`}>
                      {task.title}
                    </td>

                    <td>
                      <span className={`status-badge ${task.status.toLowerCase()}`}>
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <span className={`priority-text priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>

                    <td className="due-date-text">
                      {task.dueDate || 'No date'}
                    </td>

                    <td className="task-actions-cell">
                      <div className="actions-wrapper">
                        <button 
                          className="action-icon-btn status-btn" 
                          onClick={() => handleToggleStatus(task)}
                          title={task.status === 'Completed' ? "Mark as Pending" : "Mark as Completed"}
                        >
                          {task.status === 'Completed' ? <RotateCcw size={16} /> : <CheckCircle size={16} />}
                        </button>
                        
                        <button 
                          className="action-icon-btn edit-btn" 
                          onClick={() => handleEdit(task)}
                          title="Edit Task"
                        >
                          <Edit2 size={16} />
                        </button>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure you want to delete this task?"
                          onConfirm={() => handleDelete(task.id)}
                          okText="Yes"
                          cancelText="No"
                          okButtonProps={{ style: { height: '30px' }, danger: true }}
                          cancelButtonProps={{ style: { height: '30px', width: '60px' } }}
                        >
                          <button 
                            className="action-icon-btn delete-btn" 
                            title="Delete Task"
                          >
                            <Trash2 size={16} />
                          </button>
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default DashboardPage;