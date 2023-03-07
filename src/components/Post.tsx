import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

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

  const deletePost = () => {
    client.delete(baseURL+`/posts/${params.id}`)
    .then((response: any) => {
      if(response.status===200) {
        alert('Post deleted')
      } else {
        alert('Post not deleted. Try Again.')
      }
    })
    .then(() => navigate("/posts")) 
    
  };

  useEffect(() => {
    client.get(baseURL+`/posts/${params.id}`)
    .then((response: any) => {
      setPost(response.data)
    })
  }, []);

  return (
    <div>
    <h1>Post #{post.id}</h1>
    <div>
      <span>Title: {post.title}</span><br/>
      <span>Body: {post.body}</span><br/>
      <p></p>
      <h3>
        <Link to="/posts"> Back </Link> |
        <Link to={`/posts/edit/${params.id}`}> Edit </Link> |
        <button type="button" className="btn btn-danger" onClick={deletePost}>Delete Post</button>
      </h3>
    </div>
    </div>
  );
}

export default Post;


