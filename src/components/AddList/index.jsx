import React, { useState } from 'react';
import List from '../List';
import Badge from '../Badge';

import './AddList.scss';

const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        const color = colors.find(c => c.id === selectedColor).name;
        onAdd({id: Math.random(), color, name: inputValue});
        onClose();
    };

    return (
        <div className="list-add">
            <List onClick={() => setVisiblePopup(true)} items={[
                    {
                    className: 'list__add-btn',
                    icon: (<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z"/></svg>),
                    name: 'Добавить список',
                    },
                ]}
            />
            {visiblePopup && (
            <div className="list-add__popup">
                <input value={inputValue} 
                       onChange={e => setInputValue(e.target.value)} 
                       className="field" 
                       type="text" 
                       placeholder="Название списка" 
                />
                <img onClick={onClose} 
                     className="list-add__popup-close-btn" 
                     src="https://img.icons8.com/color/26/000000/close-window.png"
                />
                <div className="list-add__popup-colors">
            
                    {colors.map(color => (
                        <Badge onClick={() => selectColor(color.id)} 
                               key={color.id} 
                               color={color.name}
                               className={selectedColor === color.id && 'active'}
                        />
                    ))}
                    
                </div>
                <button onClick={addList} className="button">Добавить</button>
            </div>
            )}
        </div>
    );
};

export default AddList;