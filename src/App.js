import './App.css';
import logo from './logo.svg';
import {UseState} from './components/UseState/UseState';
import {ClassState} from './components/ClassState/ClassState';
import { UseReducer } from './components/useReducer/useReducer';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <UseState 
            name="UseState"
          />
        </p>
      </header>
    </div>
  );
}

export default App;
