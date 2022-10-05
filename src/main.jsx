import React, { cloneElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import './styles/tailwindOutput.css'
import App from './App'
import Home from './Home/Home'
import Login from './Login/Login'
import { AuthProvider } from './Auth/Auth'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import { LoadingProvider } from './Loading/Loading'

ReactDOM.render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider >
        <App>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home/>}/>
            </Route>
            <Route exact path="/login" element={<Login />}></Route>

            {/* error page if the page is not found (optional) */}
            <Route path="*" element={<h1 style={{textAlign:"center"}}>404, Page not found.</h1>}></Route>
          </Routes>
        </App>
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
