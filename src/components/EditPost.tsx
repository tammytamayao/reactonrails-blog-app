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
    
    useEffect(() => {
      const url = process.env.REACT_APP_API_ACTIVE+`api/v1/posts/${params.id}`;
      fetch(url)
      .then((response) => response.json())
      .then((res) => setPost(res))
    }, []);
   
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

    const onSubmit = (post: React.FormEvent<HTMLFormElement>) => {
      
        post.preventDefault();

        if (title.length > 0){titleDef = title}
        if (body.length > 0){bodyDef = body}

        
        const url = process.env.REACT_APP_API_ACTIVE+`api/v1/posts/edit/${params.id}`;

        fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
            title: titleDef,
            body: bodyDef,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((res) => {
              console.log(res);
              setPost(res);
              alert("Post Edited"); 
          })
          .then(() => navigate("/posts"))
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

