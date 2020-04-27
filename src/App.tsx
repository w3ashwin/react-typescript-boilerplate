import * as React from 'react';
import logo from './assets/images/logo.svg';
import TodoContainer from './containers/TodoContainer';
import './assets/styles/components/App.scss';

export const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
        <p>
          Simple Todo
        </p>
      <TodoContainer />
      </header>
    </div>
  );
};
