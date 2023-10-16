import React from "react";
import styled from "styled-components";

const CommentCard = ({ author, comment }) => {
  return (
    <Card>
      <Author>{author}</Author>
      <Content>{comment}</Content>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
`;

const Author = styled.div`
  font-weight: bold;
`;

const Content = styled.div``;

export default CommentCard;
