import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Homer';
import Login from './pages/auth/login';
import CreateUser from './pages/auth/CreateUser';
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';

import './App.css'

function App() {
 return (
   <>
      
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/CreateUser" element={<CreateUser />} />
     </Routes>
   </>
 );
}
export default App;