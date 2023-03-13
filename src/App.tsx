import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Post from './components/Post';
import EditPost from './components/EditPost';
import SignUp from './sessions/SignUp';
import LogIn from './sessions/LogIn';
import VerifyEmail from './components/VerifyEmail';
import Comments from './comments/Comments';
import EditComment from './comments/EditComment';


export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LogIn/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/posts" element={<Posts/>} />
      <Route path="/posts/new" element={<NewPost/>} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route path="/posts/:id/edit" element={<EditPost />} />
      <Route path="/posts/:post_id/comments" element={<Comments />} />
      <Route path="/posts/:post_id/comments/:id/edit" element={<EditComment />} />
    </Routes>
  </Router>
  )
}
