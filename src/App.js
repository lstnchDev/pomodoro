import { Fragment } from 'react';
import './App.css';
import HeaderMain from './components/header/Header';
import MainContent from './components/mainContent/MainContent';

function App() {
  return (
    <Fragment>
      <HeaderMain/>
      <MainContent/>
    </Fragment>
  );
}

export default App;
