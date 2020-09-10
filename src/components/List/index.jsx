import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';

import closeSvg from '../../assets/img/Close.svg';

const List = ({ items, isRemovable, onClick, onRemove }) => {

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
                <li key={index} className={classNames(item.className, {'active': item.active})}>
                    <i>
                        {item.icon ? (item.icon) : (
                            <Badge color={item.color.name}/>
                        )}
                    </i>
                    <span>{item.name}</span>
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