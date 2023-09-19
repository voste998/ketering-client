
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { useState } from 'react';


import './App.css';
import { RoleType } from "../../misc/role.type";
import { Header } from "../header/Header";

function App() {
  const [role,setRole]=useState<RoleType>(undefined);

  return (
    <div className="App">
      <Header role={role}/>
      
      <BrowserRouter>
          <Routes>
              <Route path="open" element={role==="workman"?<div>Workman page</div>:<div>ne postoji</div>}/>
          </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
