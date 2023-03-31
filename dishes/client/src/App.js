

import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" Component={Sidebar}/>
       
      </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
