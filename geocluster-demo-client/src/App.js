import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Scene} from './Model';
import {ModelView, ModelCanvas} from './View';

const store = Scene.create({});
store.addEntity("a1", 3.2, 2);
store.addEntity("a2", 6, -2.1);
store.addEntity("a3", 3.7, 0.2);
store.addEntity("a4", -7.9, 7.4);
store.addEntity("a5", 4, -6.2);
store.addEntity("a6", -22, 14);
store.addEntity("a7", 13.8, 16);
store.addEntity("a8", -17, -11);
store.addEntity("a9", 17.7, 9);
store.addEntity("a10", -5.4, 9.2);
store.addEntity("a11", 26, -19);
store.addEntity("a12", -7.1, 10.9);
store.addEntity("a13", -18, 11.8);
store.addEntity("a14", -3.9, 24);

function App() {
  return (
    <div className="App">
      <table width="100%">
        <tr>
          <td width="50%">
            <ModelCanvas scene={store}/>
          </td>
          <td width="50%">
            <ModelView scene={store} />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
