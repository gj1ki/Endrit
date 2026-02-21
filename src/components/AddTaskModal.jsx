import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../store/taskSlice'; // Import updateTask
import { X } from 'lucide-react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, taskToEdit }) => { // 1. Added taskToEdit prop
  const dispatch = useDispatch();
  
  const initialForm = { 
    title: '', 
    description: '', 
    status: 'Pending', 
    priority: 'Medium', 
    dueDate: '' 
  };

  const [formData, setFormData] = useState(initialForm);

  // 2. This fills the form when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setFormData(taskToEdit);
    } else {
      setFormData(initialForm);
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 3. Logic to decide between Adding or Updating
    if (taskToEdit) {
      dispatch(updateTask(formData)); 
    } else {
      dispatch(addTask({ ...formData, id: Date.now() }));
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          {/* 4. Dynamic Title */}
          <h2 className="modal-title">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={20}/>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label className="form-label">Task Title*</label>
            <input 
              required 
              name="title"
              value={formData.title} // 5. Added value so text shows up when editing
              className="form-input highlight" 
              placeholder="What needs to be done?"
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              className="form-input" 
              rows="3" 
              placeholder="Add details..."
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status*</label>
              <select name="status" className="form-input" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority*</label>
              <select name="priority" className="form-input" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input 
              name="dueDate"
              type="date" 
              value={formData.dueDate}
              className="form-input" 
              onChange={handleChange} 
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {/* 6. Dynamic Button Text */}
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;