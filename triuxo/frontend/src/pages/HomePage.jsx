import React, { useEffect, useState } from "react";
import requestMethod from "../requestMethod";
import BlogCard from "../components/BlogCard";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Header from "../components/Header";

const BlogListContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const BlogCardWrapper = styled.div`
  margin-bottom: 20px;
`;

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await requestMethod("GET", "/blogs/blog");
        console.log(response);
        setBlogs(response); // Assuming your API endpoint for blogs is "/blogs"
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <BlogListContainer className="row mx-auto">
        {blogs.map((blog) => (
          <BlogCardWrapper className="col-12 col-md-6 col-lg-4" key={blog._id}>
            <BlogCard
              title={blog.title}
              id={blog._id}
              content={blog.content}
              comments={blog.comments}
              author={blog.author.username}
            />
          </BlogCardWrapper>
        ))}
      </BlogListContainer>
    </div>
  );
};

export default HomePage;
