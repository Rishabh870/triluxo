import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  background-image: url("your-background-image-url.jpg");
  background-size: cover;
  width: 100%; /* Adjust the width as needed for responsiveness */
  height: 200px; /* Square shape */
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const BlogTitle = styled.h2`
  color: black;
  min-height: 2rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
`;

const BlogContent = styled.p`
  color: grey;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
`;
const Author = styled.p`
  color: black;
  justify-self: flex-end;
  margin: 0;
`;
const StyleLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const BlogCard = ({ title, content, author, id }) => {
  return (
    <StyleLink to={`/blog/${id}`}>
      <CardContainer>
        <BlogTitle>{title}</BlogTitle>
        <BlogContent className="h-100">{content}</BlogContent>
        <Author className="text-primary"> {author}</Author>
      </CardContainer>
    </StyleLink>
  );
};

export default BlogCard;
