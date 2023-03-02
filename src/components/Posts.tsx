import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
    .then((response) => response.json())
    .then((res) => setPosts(res));
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