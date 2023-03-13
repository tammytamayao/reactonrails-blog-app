import React, { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

interface commentState {
    id: number,
    userId: number,
    post_id: number,
    body: string
  }

const EditComment = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [body, setBody] = useState("");

    const getComment = async () => {
        const response: any = await client.get(baseURL+`/posts/${params.post_id}/comments/${params.id}`);
        if(response.status===200) {
            setComment(response.data)
        }
    }
      
    useEffect(() => {
      getComment();
    },[]); 
     
    const [comment, setComment]= useState<commentState>({
        id: parseInt(params.id+""),
        userId: parseInt(params.userId+""),
        post_id: parseInt(params.post_id+""),
        body: body
    });
    
    const onChange = (comment: React.ChangeEvent<HTMLInputElement>, setFunction: {(value: React.SetStateAction<string>): void;}) => {
        setFunction(comment.target.value);
    };
        
    var bodyDef = comment.body;
    
    const onSubmit = async (comment: React.FormEvent<HTMLFormElement>) => {
          
        comment.preventDefault();
        if (body.length > 0){bodyDef = body}
        const payload = {body: bodyDef, post_id: params.post_id, userId: Math.floor(Math.random() * (100 - 1 + 1) + 1)};
    
        const response: any = await client.put(baseURL+`/posts/${params.post_id}/comments/${params.id}/edit`,payload);
            if(response.status===200) {
                setComment(response.data);
                alert("Comment Edited");
                navigate(`/posts`);
              } else {
                alert('Comment not edited. Try Again.')
              }
        }

    return (
        <div>
              <h1>Edit Comment</h1>
    
              <form onSubmit={onSubmit}>
    
                <div className="form-group">
                  <label>Body </label>
                  <input
                    type="textarea"
                    name="body"
                    id="postBody"
                    defaultValue={comment.body}
                    className="form-control"
                    required
                    onChange={(e) => onChange(e, setBody)}
                  />
                </div>
    
                <button type="submit">Update Comment</button> <br/>
                <Link to="/posts">Back to Main</Link>
    
              </form>
        </div>
    )
}

export default EditComment;
