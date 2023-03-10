import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";
import Comments from "../comments/Comments";

interface postState {
  id: number,
  title: string;
  body: string;
}

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost]= useState<postState>({
    id: 0,
    title:"",
    body:""
  });

  const deletePost = async () => {
    const response: any = await client.delete(baseURL+`/posts/${params.id}`);
      if(response.status===200) {
        alert('Post deleted')
        navigate("/posts")
      } else {
        alert('Post not deleted. Try Again.')
      }
  };

  const showPost = async () => {
    const response: any = await client.get(baseURL+`/posts/${params.id}`);
    if(response.status===200) {
      setPost(response.data)
    }
  }

  useEffect(() => {
    showPost();
  },[]); 

  return (
    <div>
    <h1>Post #{post.id}</h1>
    <div>
      <span>Title: {post.title}</span><br/>
      <span>Body: {post.body}</span><br/>
      <p></p>
      <h3>
        <Link to="/posts"> Back </Link> |
        <Link to={`/posts/${params.id}/edit`}> Edit </Link> |
        <button type="button" className="btn btn-danger" onClick={deletePost}>Delete Post</button>
      </h3>
    </div>
    <div><Comments /></div>
    </div>
  );
}

export default Post;


