import React from 'react';
import { useSelector } from 'react-redux';
import { Flame, CheckCircle, Clock } from 'lucide-react';
import './SummaryCards.css';

const SummaryCards = () => {
  const tasks = useSelector((state) => state.tasks.items);
  
  const stats = [
    { 
      label: 'Total Tasks', 
      count: tasks.length, 
      icon: <Flame />, 
      type: 'total' 
    },
    { 
      label: 'Completed', 
      count: tasks.filter(t => t.status === 'Completed').length, 
      icon: <CheckCircle />, 
      type: 'completed' 
    },
    { 
      label: 'Pending', 
      count: tasks.filter(t => t.status === 'Pending').length, 
      icon: <Clock />, 
      type: 'pending' 
    },
  ];

  return (
    <section className="summary-cards">
      {stats.map((stat, i) => (
        <div key={i} className={`summary-card summary-card--${stat.type}`}>
          <span className="summary-card__label">{stat.label}</span>
          <div className="summary-card__content">
            <span className="summary-card__icon">{stat.icon}</span>
            <span className="summary-card__count">{stat.count}</span>
          </div>
        </div>
      ))}
    </section>
  );
};


export default SummaryCards;
