import React from 'react';

import './Tasks.scss';

const Tasks = () => {
    return (
        <div className="tasks">
          <h2 className="tasks__title">
              Фронтенд
              <img className="tasks__icon" src="https://img.icons8.com/ios-glyphs/30/000000/ball-point-pen.png"/>
          </h2>

          <div className="tasks__items">
            <div className="tasks__items-row">
                <div className="checkbox">
                    <input id="check" type="checkbox" />
                    <label htmlFor="check">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="10px" height="10px"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M4 16L11 23 27 7"/></svg>
                    </label>
                </div>
                <p>ReactJS Hooks (useState, useReduser, useEffect и т.д.)</p>
            </div>
          </div>
        </div>
    );
}

export default Tasks;