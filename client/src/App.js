import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/Pages/RegistrationPage';
import LoginPage from './components/Pages/LoginPage';
import IndexPage from './components/Pages/IndexPage';
import HomePage from './components/Pages/HomePage';
import CreateBlogPage from './components/Pages/CreateBlogPage';
import { UserContextProvider } from "./UserContext";
import ProfilePage from './components/Pages/ProfilePage';
import MyBlogPage from './components/Pages/MyBlogPage';
import AllBlogs from './components/Pages/AllBlogs';
import SubscribePage from './components/Pages/SubscribePage';
const App = () => {
  const [profilename,setProfilename]=useState("")
  useEffect(()=>{
    console.log('proile name updated',profilename)
    window.localStorage.setItem('author',profilename);
  },
[profilename])
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage setProfilename={setProfilename}/>} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/IndexPage' element={<IndexPage />} />
          <Route path="/ProfilePage" element={<ProfilePage profilename={profilename} />} />
          <Route path='/CreateBlogPage' element={<CreateBlogPage author={profilename}/>} />
          <Route path='/MyBlogPage' element={<MyBlogPage author={profilename}/>}/>
          <Route path='/AllBlogs' element={<AllBlogs/>}/>
          <Route path='/SubscribePage' element={<SubscribePage/>}/>
        </Routes>
        
      </Router>
    </UserContextProvider>
  );
};

export default App;
