import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import { List, AddList, Tasks } from './components';

const App = () => {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3003/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3003/colors').then(({ data }) => {
      setColors(data);
    })
  }, []);

  const onAddList = obj => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3003/tasks/' + taskId, {
        completed
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);
    if (!newTaskText) {
      return
    }

    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios.patch('http://localhost:3003/tasks/' + taskObj.id, {text: newTaskText}).catch(() => {
      alert('Не удалось удалить задачу');
    });
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete('http://localhost:3003/tasks/' + taskId).catch(() => {
        alert('Не удалось удалить задачу');
      });
    }
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List 
         onClickItem={list => {
            history.push(`/`);
            setActiveItem(list);
         }}
         items={[
          {
            active: history.location.pathname === '/',
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
                onClickItem={list => {
                  history.push(`/lists/${list.id}`);
                  setActiveItem(list);
                }}
                activeItem={activeItem}
                isRemovable 
          />
          ) : (
            'Загрузка'
          )}

        <AddList onAdd={onAddList} colors={colors} />
      </div>

      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map(list => <Tasks 
              key={list.id}
              list={list}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              withoutEmpty
            />)
          }
        </Route>

        <Route path="/lists/:id">
          {lists && 
            activeItem && 
              <Tasks 
                list={activeItem} 
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
              />
          }
        </Route>
      </div>
    </div>
  );
}

export default App;