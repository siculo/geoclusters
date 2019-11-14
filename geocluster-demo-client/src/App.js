import React from 'react';
import './App.css';
import {Scene} from './Model';
import {SceneTable, SceneCanvas} from './View';

const initialSnapshot = {
  "entities":[
    {"id":"a0","location":{"x":0,"y":0}},
    {"id":"a1","location":{"x":3.2,"y":2}},
    {"id":"a2","location":{"x":6,"y":-2.1}},
    {"id":"a3","location":{"x":3.7,"y":0.2}},
    {"id":"a4","location":{"x":-7.9,"y":7.4}},
    {"id":"a5","location":{"x":4,"y":-6.2}},
    {"id":"a6","location":{"x":-22,"y":14}},
    {"id":"a7","location":{"x":13.8,"y":16}},
    {"id":"a8","location":{"x":-17,"y":-11}},
    {"id":"a9","location":{"x":17.7,"y":9}},
    {"id":"a10","location":{"x":-5.4,"y":9.2}},
    {"id":"a11","location":{"x":26,"y":-19}},
    {"id":"a12","location":{"x":-7.1,"y":10.9}},
    {"id":"a13","location":{"x":-18,"y":11.8}},
    {"id":"a14","location":{"x":-3.9,"y":24}},
    {"id":"a15","location":{"x":7.4,"y":22.7}}
  ]
};

const store = Scene.create(initialSnapshot);

function App() {
  return (
    <div className="App">
      <table width="100%">
        <tr>
          <td width="25%">
            <SceneTable scene={store}/>
          </td>
          <td width="75%">
            <SceneCanvas scene={store}/>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
