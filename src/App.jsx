import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout';
import RegisterPage from './pages/Register';
import axios from 'axios';
import { UserContextProvider } from './component/UserContext';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL ="http://localhost:3000";
axios.defaults.withCredentials =true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />   
        </Route>
        
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
