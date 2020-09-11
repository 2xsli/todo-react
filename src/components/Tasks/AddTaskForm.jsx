import React, { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/Plus.svg';

function AddTaskForm({ list, onAddTask }) {
    const [formVisible, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!formVisible);
        setInputValue('');
    };

    const addTask = () => {
        const obj = {
          listId: list.id,
          text: inputValue,
          completed: false
        };
        setIsLoading(true);
        axios
          .post('http://localhost:3003/tasks', obj)
          .then(({ data }) => {
            onAddTask(list.id, data);
            toggleFormVisible();
          })
          .catch(() => {
            alert('Ошибка при добавлении задачи!');
          })
          .finally(() => {
            setIsLoading(false);
          });
      };

    return (
        <div className="tasks__form">
            {!formVisible ? (
            <div className="tasks__form-new" onClick={toggleFormVisible}>
                <img src={addSvg} alt="add new task" />
                <span>Новая задача</span>
            </div>
            ) : (
            <div className="tasks__form-block">
                <input value={inputValue} 
                       className="field" 
                       type="text" 
                       placeholder="Текст задачи"
                       onChange={e => setInputValue(e.target.value)}
                />
                <button disabled={isLoading} className="button" onClick={addTask}>
                    {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
                <button className="button button--gray" onClick={toggleFormVisible}>Отмена</button>
            </div>
            )}
            
        </div>
    )
}

export default AddTaskForm;
