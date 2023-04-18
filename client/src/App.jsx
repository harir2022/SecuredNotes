import { EthProvider } from "./contexts/EthContext";
import './App.css';
import Navigation from "./Navigation";
import { Provider, useDispatch} from 'react-redux'
import store from './STORE/store'
import { useEffect } from "react";


function App() {
 
  
  return (
    
        <Provider store={store}>
            <Navigation/>
        </Provider>
    
  );
}

export default App;
