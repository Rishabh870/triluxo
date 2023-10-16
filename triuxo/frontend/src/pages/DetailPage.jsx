import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // for making API requests
import styled from "styled-components";
import requestMethod from "../requestMethod";
import Comment from "../components/Comment";
import Header from "../components/Header";

// Styled Components
const Container = styled.div`
  max-width: 48rem;
`;

const Title = styled.h1`
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-weight: 700;
`;

const Author = styled.p`
  font-style: italic;
`;

const Content = styled.p`
  width: 100%;
  white-space: pre-wrap;
  color: grey;

  word-wrap: break-word;
`;

const ImageContainer = styled.div`
  border: 1px solid;
  width: 100%;
  max-height: 30rem; /* Set a maximum height */
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden; /* Hide overflow content */
`;

const Image = styled.img`
  max-width: 100%; /* Set a maximum width */
  max-height: 100%; /* Set a maximum height */
  object-fit: contain;
  width: auto; /* Ensure the width adjusts based on the aspect ratio */
  height: auto; /* Ensure the height adjusts based on the aspect ratio */
`;

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({}); // State to store fetched data
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestMethod("GET", `/blogs/blog/${id}`);
        console.log(response);
        setData(response); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log("id", id);
  }, [id]);

  return (
    <div>
      <Header />
      <Container className="container px-5">
        <Title>{data?.title}</Title>
        <Author>
          -- <span className="text-primary"> {data?.author?.username} </span>
        </Author>
        {data.image && (
          <ImageContainer>
            <Image src={data.image} alt="Image" />
          </ImageContainer>
        )}
        <Content>{data.content}</Content>
        <div>
          <Comment comments={data.comments} />
        </div>
      </Container>
    </div>
  );
};

export default DetailPage;
