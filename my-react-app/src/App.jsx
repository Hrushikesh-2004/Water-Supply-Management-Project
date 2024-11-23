import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';




import 'react-toastify/dist/ReactToastify.css';
import './CSS/style.css';


/* COMPONENTS*/
import Navbar from './components/navbar/navbar.jsx';
import Home from './components/home/home.jsx';
import Footer from './components/footer/footer.jsx';
import LoginSignup from './components/login-signup/login-signup.jsx';
import ComplaintList from './components/complaints/complainList.jsx';
import Requests from './components/connections/requests.jsx';
import AddWorker from './components/workers/addWorker.jsx';
import SearchCanId from './components/complaints/search-canId.jsx';
import YourConnections from './components/connections/userConnections/userConnections.jsx';
import RaiseComplaint from './components/complaints/raiseComplaint.jsx';
import RequestConnection from './components/connections/userConnections/requestConnection.jsx';

import ComplaintsHistory from './components/reports/complaintHistory.jsx';
import ConnectionsHistory from './components/reports/connectionsHistory.jsx';
import WaterDistributionData from './components/reports/waterDistributiondata.jsx';

import Map from './components/Maps/map.jsx';
/* COMPONENTS*/

function App() {
  return (
    <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    >
      <div className='app'>
    
        
          <Navbar />

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/loginsignup" element={<LoginSignup/>} />
          <Route path='/addworker' element={<AddWorker/>}/>
          <Route path='/maps' element={<Map/>}/>
          
          <Route path='/complaints' element={<ComplaintList/>}/>
          <Route path='/complaints/search-canid' element={<SearchCanId/>}/>
          <Route path='/complaints/raise-complaint' element={<RaiseComplaint/>}/>

          <Route path='/requests' element={<Requests/>}/>
          <Route path='/your-connections' element={<YourConnections/>}/>
          <Route path='your-connections/request-connection' element={<RequestConnection/>}/>

          <Route path='/reports/connection-history' element={<ConnectionsHistory/>}/>
          <Route path='/reports/complaints-history' element={<ComplaintsHistory/>}/>
          <Route path='/reports/water-distribution' element={<WaterDistributionData/>}/>

        </Routes>
      

          <Footer/>
          <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
