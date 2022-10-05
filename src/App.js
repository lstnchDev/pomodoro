import './App.css';
import HeaderMain from './components/header/Header';
import MainContent from './components/mainContent/MainContent';
import TaskContextProvider from './components/tasks/TaskContextProvider';

function App() {
  return (
    <TaskContextProvider>
      <HeaderMain/>
      <MainContent/>
    </TaskContextProvider>
  );
}

export default App;
