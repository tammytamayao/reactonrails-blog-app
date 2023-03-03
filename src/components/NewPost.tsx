import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface postState {
  id: number,
  userId: number,
  title: string;
  body: string;
}

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost]= useState<postState>({
    id: 0,
    userId: 0,
    title:"",
    body:""
  });


  const onChange = (post: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
    setFunction(post.target.value);
  };

  const onSubmit = (post: React.FormEvent<HTMLFormElement>) => {
    post.preventDefault();
    const url = 'http://192.168.0.155:3000/api/v1/posts/new';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.floor(Math.random() * (100 - 1 + 1) + 1)
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((res) => {
          console.log(res);
          setPost(res);
          alert("New Post Added"); 
      })
      .then(() => navigate("/posts"))
  };

  return (
    <div>
          <h1>Add New Post</h1>

          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor="postTitle">Title </label>
              <input
                type="text"
                name="title"
                id="postTitle"
                className="form-control"
                required
                onChange={(e) => onChange(e, setTitle)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postBody">Body </label>
              <input
                type="textarea"
                name="body"
                id="postBody"
                className="form-control"
                required
                onChange={(e) => onChange(e, setBody)}
              />
            </div>

            <button type="submit">Create Post</button> <br/>
            <Link to="/posts">Back to Main</Link>

          </form>
    </div>
  );
};

export default NewPost;