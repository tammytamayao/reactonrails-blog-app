import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

interface postState {
  id: number,
  userId: number,
  title: string,
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

  const onSubmit = async (post: React.FormEvent<HTMLFormElement>) => {
    
    post.preventDefault();
    const payload = {title: title, body: body, userId: Math.floor(Math.random() * (100 - 1 + 1) + 1)};

    const response: any = await client.post(baseURL+`/posts/create`,payload);
      if(response.status===200) {
        setPost(response.data);
        alert('New post added');
        navigate("/posts");
      } else {
        alert('Post not added. Try Again.')
      }

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


