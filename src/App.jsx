
import { Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import './App.css'
import Channel from './components/Channel'
import Signup from './components/Signup'
import { useEffect, useState } from 'react'

function App() {

  const [token, setToken] = useState(false);

  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect (() => {
    if(sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, [])

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Main setToken={setToken}/>} />
        {token?<Route path="main" element={<Channel token={token}/>} />:""}
        <Route path="signup" element={<Signup />} />
      </Routes>
      
    </>
  )
}

export default App
