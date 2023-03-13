import React, { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";
import NewComment from "./NewComment";

const Comments = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [comments, setComments] = useState<any[]>([]);
     
    const getAllComments = async () => {
      const response: any = await client.get(baseURL+`/posts/${params.id}/comments`);
      if(response.status===200) {
        setComments(response.data)
      }
    }
  
    useEffect(() => {
      getAllComments();
    }, []);

    const deleteComment = async (comment_id:any) => {
        const response: any = await client.delete(baseURL+`/posts/${params.id}/comments/${comment_id}`);
          if(response.status===200) {
            alert('Comment deleted')
            window.location.reload();
            navigate(`/posts/${params.id}`)
          } else {
            alert('Post not deleted. Try Again.')
          }
      };
      
    const allComments = comments.map((comment, index) => (

        <div key={index}>
            <div>
              <span>Comment #{index+1}: {comment.body} with id {comment.id}</span>
              ( <Link to={`/posts/${params.id}/comments/${comment.id}/edit`}> Edit </Link> | 
                <button type="button" className="btn btn-danger" onClick={() => deleteComment(comment.id)}> Delete </button>
              )
                <hr/>
              <p></p>
            </div>
        </div>
    ));
    
    return(
        <>
            <strong>Comments for post # {params.id}</strong><br/>
            <p></p>
            <div>{allComments}</div>
            <div><NewComment/></div>
        </>
    )
}

export default Comments;
