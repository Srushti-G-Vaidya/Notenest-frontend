import { useState } from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom'



import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Home from './pages/HomePage'
import CreateNote from './pages/CreateFile'
import NoteDetails from './pages/ExistingNote'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/create' element={<CreateNote/>}/>
    <Route path='/file/:id' element={ <NoteDetails/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
