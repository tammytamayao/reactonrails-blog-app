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
      const url = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
      fetch(url)
      .then((response) => response.json())
      .then((res) => setPost(res))
    }, []);
   
    const [post, setPost]= useState<postState>({
        id: parseInt(params.id+""),
        userId: 0,
        title:""+title,
        body:""+body
      });

    const onChange = (post: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
        setFunction(post.target.value);
    };

    const onSubmit = (post: React.FormEvent<HTMLFormElement>) => {
      
        post.preventDefault();

        if (title.length == 0 || body.length == 0 ) {
          alert('edit your information!')
        }
        else {

          fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              id: parseInt(params.id+""),
              userId: 0,
              title:title,
              body:body
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then((response) => response.json())
          .then((json) => console.log(json));
        }


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
                    defaultValue={post.title}
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