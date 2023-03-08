import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

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

    const getPost = async () => {
      const response: any = await client.get(baseURL+`/posts/${params.id}`);
      if(response.status===200) {
        setPost(response.data)
      }
    }
    
    useEffect(() => {
      getPost();
    },[]); 
   
    const [post, setPost]= useState<postState>({
        id: parseInt(params.id+""),
        userId: parseInt(params.userId+""),
        title:title,
        body:body
      });

    const onChange = (post: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
        setFunction(post.target.value);
    };

    var titleDef = post.title;
    var bodyDef = post.body;

    const onSubmit = async (post: React.FormEvent<HTMLFormElement>) => {
      
        post.preventDefault();

        if (title.length > 0){titleDef = title}
        if (body.length > 0){bodyDef = body}

        const payload = {title: titleDef, body: bodyDef, userId: Math.floor(Math.random() * (100 - 1 + 1) + 1)};

        const response: any = await client.put(baseURL+`/posts/edit/${params.id}`,payload);
          if(response.status===200) {
            setPost(response.data);
            alert("Post Edited");
            navigate("/posts");
          } else {
            alert('Post not edited. Try Again.')
          }
    }

    return (
        <div>
              <h1>Edit Post {params.id}</h1>
    
              <form onSubmit={onSubmit}>
    
                <div className="form-group">
                  <label>Title </label>
                  <input
                    type="text"
                    name="title"
                    id="postTitle"
                    defaultValue={post.title}
                    className="form-control"
                    required
                    onChange={(e) => onChange(e, setTitle)}
                  />
                </div>
    
                <div className="form-group">
                  <label>Body </label>
                  <input
                    type="textarea"
                    name="body"
                    id="postBody"
                    defaultValue={post.body}
                    className="form-control"
                    required
                    onChange={(e) => onChange(e, setBody)}
                  />
                </div>
    
                <button type="submit">Update Post</button> <br/>
                <Link to="/posts">Back to Main</Link>
    
              </form>
        </div>
    )
};

export default EditPost;


