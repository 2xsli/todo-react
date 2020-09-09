import React from 'react';
import List from './components/List';
import AddList from './components/AddList';

const App = () => {
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

        <List items={[
          {
            color: 'green',
            name: 'Покупки',
          },
          {
            color: 'blue',
            name: 'Фронтенд',
            active: true
          },
          {
            color: 'pink',
            name: 'Фильмы и сериалы',
          }
        ]}
        isRemovable
        />

        <AddList colors={[
          {
            name: 'gray',
            hex: '#C9D1D3'
          },
          {
            name: 'green',
            hex: '#42B883'
          },
          {
            name: 'blue',
            hex: '#64C4ED'
          },
          {
            name: 'pink',
            hex: '#FFBBCC'
          },
          {
            name: 'lime',
            hex: '#B6E6BD'
          },
          {
            name: 'purple',
            hex: '#C355F5'
          },
          {
            name: 'black',
            hex: '#110133'
          },
          {
            name: 'red',
            hex: '#FF6464'
          },
        ]}
        />
      </div>

      <div className="todo__tasks">
        
      </div>
    </div>
  );
}

export default App;