import React from 'react'
import { Routes, Route ,BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { Post } from './Post.jsx';
function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<App />} />
       <Route path='/post/:id' element={<Post />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
