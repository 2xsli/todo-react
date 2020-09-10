import React from 'react';
import axios from 'axios';

import AddTaskForm from './AddTaskForm';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask }) => {
    
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios
                .patch('http://localhost:3030/lists/' + list.id, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Не удалось обновить название списка!');
                });
        }
    }

    return (
        <div className="tasks">
          <h2 className="tasks__title">
              {list.name}
              <img src="https://img.icons8.com/ios-glyphs/30/000000/ball-point-pen.png" 
                   alt="edit icon"
                   onClick={editTitle}
              />
          </h2>

          <div className="tasks__items">
            {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
            {
                list.tasks.map(task => 
                    <div key={task.id} className="tasks__items-row">
                        <div className="checkbox">
                            <input id={`task-${task.id}`} type="checkbox" />
                            <label htmlFor={`task-${task.id}`}>
                                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="10px" height="10px"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M4 16L11 23 27 7"/></svg>
                            </label>
                        </div>
                        <input readOnly value={task.text} />
                    </div>
                )
            }

            <AddTaskForm list={list} onAddTask={onAddTask} />

          </div>
        </div>
    );
}

export default Tasks;