import React from 'react'

function Task({ id, text, list, completed, onRemove, onEdit, onComplete }) {
    const onChangeCheckbox = e => {
        onComplete(list.id, id, e.target.checked);
    };

    return (
        <div key={id} className="tasks__items-row">
            <div className="checkbox">
                <input onChange={onChangeCheckbox} id={`task-${id}`} type="checkbox" checked={completed} />
                <label htmlFor={`task-${id}`}>
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="10px" height="10px"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M4 16L11 23 27 7"/></svg>
                </label>
            </div>
            <p>{text}</p>
            <div className="tasks__items-row-actions">
                <div onClick={() => {onEdit(list.id, {id, text})}}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/ball-point-pen.png" 
                         alt="edit icon"
                    />
                </div>
                <div onClick={() => onRemove(list.id, id)}>
                    <img src="https://img.icons8.com/material-sharp/30/000000/delete-forever.png" 
                         alt="delete icon"
                    />
                </div>
            </div>
        </div>
    )
}

export default Task;
