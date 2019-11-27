import React from 'react';
import './App.css';
import {Scene} from './Model';
import {MainContent} from './View';

const store = Scene.create({});

setTimeout(function(){
  store.fetchEntities();
}, 1000);

function App() {
  return (
    <div className="App">
      <MainContent store={store} />
    </div>
  );
}

export default App;
