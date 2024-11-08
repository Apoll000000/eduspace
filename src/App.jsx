import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import './App.css'
import Mainpage from './components/Mainpage'

function App() {

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Mainpage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
