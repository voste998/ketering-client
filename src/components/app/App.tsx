
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import { RoleType } from "../../misc/role.type";
import { Header } from "../header/Header";
import { Login } from "../login/Login";
import Register from "../register/Register";
import { Offer } from "../offer/Offer";
import React from "react";
import { LoginDirection } from "../login_direction/LoginDirection";
import { Info } from "../info/Info";
import { MyCart } from "../my_cart/MyCart";
import { NewCompany } from "../new_company/NewCompany";
import { CheckRole } from "../check-role/CheckRole";
import { Footer } from "../footer/Footer";

export const RoleContext=React.createContext<React.Dispatch<React.SetStateAction<RoleType>>>(()=>{})

function App() {
  const [role,setRole]=useState<RoleType>(undefined);

  return (
    <div className="App">
      
      <BrowserRouter>
        <Header role={role}/>
        <RoleContext.Provider value={setRole}>
          <Routes>
              <Route path="/" element={role==="workman"?<div>Workman page</div>:<div>ne postoji</div>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/workman/offer" element={role==="workman"?<Offer/>:<CheckRole role="workman" />}/>
              <Route path="/workman/login/direction" element={<LoginDirection/>}/>
              <Route path="/workman/info" element={role==="workman"?<Info/>:<CheckRole role="workman" />}/>
              <Route path="/workman/cart" element={role==="workman"?<MyCart/>:<CheckRole role="workman" />}/>
              <Route path="/administrator/company/createNew" element={<NewCompany/>}/>
          </Routes>
        </RoleContext.Provider>
        <Footer/>
      </BrowserRouter>
      
        
    </div>
  );
}

export default App;
