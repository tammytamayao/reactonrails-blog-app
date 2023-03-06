import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Post from './components/Post';
import EditPost from './components/EditPost';
import SignUp from './sessions/SignUp';

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/posts" element={<Posts/>} />
      <Route path="/posts/new" element={<NewPost/>} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/posts/edit/:id" element={<EditPost />} />
    </Routes>
  </Router>
  )
}
