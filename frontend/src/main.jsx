import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ClassesPage from './components/ClassesPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
      <Route path='/user/login' element={<Login/>} />
      <Route path='/user/register' element={<SignUp/>}/>
      <Route path='/user/:id' element={<ClassesPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
)
