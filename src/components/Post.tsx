import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {baseURL} from "../config/AxiosConfig";

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
    fetch(baseURL+`/posts/${params.id}`, { method: "DELETE"})
    .then((response) => {
      if (response.ok) {
        alert("Post deleted");
        return response.json();
      }
      throw new Error("Post Not Deleted. Try Again.");
    })
    .then(() => navigate("/posts"))
  };

  useEffect(() => {
    fetch(baseURL+`/posts/${params.id}`)
    .then((response) => response.json())
    .then((res) => setPost(res))
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


