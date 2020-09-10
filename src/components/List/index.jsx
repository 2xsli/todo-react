import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';

import closeSvg from '../../assets/img/Close.svg';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios
                .delete('http://localhost:3030/lists/' + item.id)
                .then(() => {
                    onRemove(item.id);
                });
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                <li key={index} 
                    className={classNames(item.className, {'active': activeItem && activeItem.id === item.id})}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>
                        {item.icon ? (item.icon) : (
                            <Badge color={item.color.name}/>
                        )}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && (
                        <img  className="list__remove-btn" 
                              src={closeSvg} 
                              alt="close button" 
                              onClick={() => removeList(item)}
                        />
                    )}
                </li>
            ))}
            
        </ul>
    );
};

export default List;