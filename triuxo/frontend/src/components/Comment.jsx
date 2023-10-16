import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import styled from "styled-components";
import requestMethod from "../requestMethod";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div``;

const Input = styled.input`
  padding: 5px 10px;
  width: 80%;
  border: none;
`;

const InputContainer = styled.div`
  border: 1px solid;
  display: flex;
  button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  border: none !important;
  border-radius: 0% !important;
  width: 20%;
  height: 100%;
  padding: 6px 5px;
  cursor: pointer;
  background-color: black;
  color: white;
  :disabled {
    background-color: grey;
  }
`;

const Comments = styled.div`
  margin-top: 20px;
`;

const Comment = ({}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const blogId = useParams().id;
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };
  const fetchComments = async (e) => {
    const response = await requestMethod(
      "GET",
      `/blogs/blog/${blogId}/comments`
    );
    console.log(response);
    setComments(response);
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    if (newComment.trim() == "") {
      toast.error("Comment cannot be empty");
      return;
    }

    await requestMethod("POST", "/comments/comment", {
      text: newComment,
      blogId: blogId,
    })
      .then((response) => {
        toast.success("Comment Added");
        setNewComment("");
        fetchComments();
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error saving comment:", error);
        // You can display an error message to the user or take appropriate action
      });
  };

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={handleInputChange}
        />
        <Button className="" onClick={handleSubmit}>
          Submit
        </Button>
      </InputContainer>
      <Comments>
        {comments?.map((comment, index) => (
          <CommentCard
            key={index}
            author={comment.author.username}
            comment={comment.text}
          />
        ))}
      </Comments>
    </Container>
  );
};

export default Comment;
