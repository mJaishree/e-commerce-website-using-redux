//import logo from './logo.svg';
import './App.css';
import { Routing } from './Component/Routing';
import { Provider } from 'react-redux';
import { Store } from './Component/store/Store';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Provider store={Store}>
        <Routing/>
      </Provider>
    </div>
  );
}

export default App;
