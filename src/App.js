import React, { useState } from 'react';
import List from './components/List';
import AddList from './components/AddList';
import Tasks from './components/Tasks';

import DB from './assets/DB.json';

const App = () => {
  const [lists, setLists] = useState(
    DB.lists.map(item => {
      item.color = DB.colors.find(color => color.id === item.colorID).name;
      return item;
    })
  );

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

        <List items={lists} onRemove={(list) => console.log(list)} isRemovable />

        <AddList onAdd={onAddList} colors={DB.colors} />
      </div>

      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;