
import { Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import './App.css'
import Channel from './components/Channel'

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="main" element={<Channel />} />
      </Routes>
      
    </>
  )
}

export default App
