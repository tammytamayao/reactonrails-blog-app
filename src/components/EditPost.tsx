import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface postState {
    id: number,
    userId: number,
    title: string;
    body: string;
  }
  
const EditPost = () => {
    const navigate = useNavigate();
    const params = useParams();
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

    }


    return (
        <div>
              <h1>Edit Post {params.id}</h1>
    
              <form onSubmit={onSubmit}>
    
                <div className="form-group">
                  <label htmlFor="recipeName">Title </label>
                  <input
                    type="text"
                    name="title"
                    id="postTitle"
                    value={post.title}
                    className="form-control"
                    required
                    onChange={(e) => onChange(e, setTitle)}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="recipeIngredients">Body </label>
                  <input
                    type="textarea"
                    name="body"
                    id="postBody"
                    value={post.body}
                    className="form-control"
                    required
                    onChange={(e) => onChange(e, setBody)}
                  />
                </div>
    
                <button type="submit">Create Post</button> <br/>
                <Link to="/posts">Back to Main</Link>
    
              </form>
        </div>
    )
};

export default EditPost;