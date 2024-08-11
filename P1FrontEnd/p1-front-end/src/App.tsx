import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/LoginRegister/Login';
import { Register } from './components/LoginRegister/Register';
import { Reimbursement } from './components/Reimbursement/Reimbursement';
import { ReimbursementContainer } from './components/Reimbursement/ReimbursementContainer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS globally
import { AddReimb } from './components/Reimbursement/AddReimb';
import { UserContainer } from './components/User/UserContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/cars" element={<ReimbursementContainer/>}/>
              <Route path="/addcar" element={<AddReimb/>}/>
              <Route path="/users" element={<UserContainer/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
