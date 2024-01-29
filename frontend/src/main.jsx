import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ClassesPage from './components/class/ClassesPage.jsx'
import SubjectPage from './components/subject/SubjectPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
      <Route path='/user/login' element={<Login/>} />
      <Route path='/user/register' element={<SignUp/>}/>
      <Route path='/user/class' element={<ClassesPage />}/>
      <Route path='/user/class/:id' element={<SubjectPage />}/>
    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
)
