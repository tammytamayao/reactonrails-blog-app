import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

const Posts = () => {

  const [posts, setPosts] = useState<any[]>([]);

  const getAllPosts = async () => {
    const response: any = await client.get(baseURL+`/posts`);
    if(response.status===200) {
      setPosts(response.data)
    }
  }

  useEffect(() => {
    if(window.location.toString().includes("/posts") == false ) {
      window.location.replace(("/posts"));
    }
    getAllPosts();
  }, []);

  const allPosts = posts.map((post, index) => (
    <div key={index}>
        <div>
          <span>Title: {post.title}</span><br/>
          <span><Link to={`/posts/${post.id}`}>View Post</Link></span><br/>
          <p></p>
        </div>
    </div>
  ));

  return (
    <>
        <h1>ALL POSTS</h1>
        <Link to={`/posts/new`}>Add New Post</Link>
        <hr/>
        <div> {allPosts} </div>
    </>
  );
};

export default Posts;


