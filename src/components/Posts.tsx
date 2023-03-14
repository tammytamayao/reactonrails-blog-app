import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

const Posts = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  
  const getLikeCount = async (post_id:any) => {
    const response: any = await client.get(baseURL+`/posts/${post_id}/likers/show`);
    if(response.status!==200){
      alert('Like not counted. Try Again.')
    }
  }

  const likePost = async (post_id:any) => {
    const response: any = await client.post(baseURL+`/posts/${post_id}/likers/create`);
    if(response.status===200) {
      navigate("/posts")
      getLikeCount(post_id);
      alert('Post liked');
      window.location.reload();
    } else {
      alert('Post not liked. Try Again.')
    }
  }

  const getAllPosts = async () => {
    const response: any = await client.get(baseURL+`/posts`);
    if(response.status===200) {
      setPosts(response.data);
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
          <span><b>Title: {post.title}</b></span><br/>
          <span>Total Likes: { post.likes==null ? 0 : post.likes}</span><br/>
          <button type="button" className="btn btn-danger" onClick={()=>likePost(post.id)}>Like</button> | 
          <span><Link to={`/posts/${post.id}`}> View Post</Link></span><hr/>
          <p></p>
        </div>
    </div>
  ));

  return (
    <>
        <h1><b>ALL POSTS</b></h1>
        <Link to={`/posts/new`}>Add New Post</Link>
        <hr/>
        <div> {allPosts} </div>
    </>
  );
};

export default Posts;


