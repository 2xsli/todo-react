import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddList, Tasks } from './components';

const App = () => {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3030/lists?_expand=color').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3030/colors').then(({ data }) => {
      setColors(data);
    })
  }, []);

  const onAddList = obj => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: (<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="15px"><path d="M0 11H24V13H0zM0 2H24V4H0zM0 20H24V22H0z"/></svg>),
            name: 'Все задачи',
          },
        ]}
        />

        {lists ?  (
          <List items={lists} 
                onRemove={id => {
                  const newLists = lists.filter(item => item.id !== id);
                  setLists(newLists);
                }} 
                isRemovable 
          />
          ) : (
            'Загрузка'
          )}

        <AddList onAdd={onAddList} colors={colors} />
      </div>

      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;