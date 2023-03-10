import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

interface commentState {
    id: number,
    userId: number,
    post_id: number,
    body: string
  }

const NewComment = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [body, setBody] = useState("");
    const [comment, setComment]= useState<commentState>({
      id: 0,
      userId: 0,
      post_id: 0,
      body:""
    });
  
    const onChange = (comment: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void;}) => {
      setFunction(comment.target.value);
    };

    const onSubmit = async (comment: React.FormEvent<HTMLFormElement>) => {
    
        comment.preventDefault();
        const payload = {body: body, userId: Math.floor(Math.random() * (100 - 1 + 1) + 1)};
    
        const response: any = await client.post(baseURL+`/posts/${params.id}/comments/create`,payload);
          if(response.status===200) {
            setComment(response.data);
            alert('New comment added');
            window.location.reload();
            navigate(`/posts/${params.id}`);
          } else {
            alert('Comment not added. Try Again.')
          }
    
      };

    return(
            <div>
                  <h1>Add New Comment</h1>
        
                  <form onSubmit={onSubmit}>   
        
                    <div className="form-group">
                      <label htmlFor="commentBody">Comment: </label>
                      <input
                        type="textarea"
                        name="body"
                        id="commentBody"
                        className="form-control"
                        required
                        onChange={(e) => onChange(e, setBody)}
                      />
                    </div>
        
                    <button type="submit">Add Comment</button> <br/>
        
                  </form>
            </div>
    )
}

export default NewComment;
