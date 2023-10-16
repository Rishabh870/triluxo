import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import requestMethod from "../requestMethod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  font-variant: small-caps;
  font-size: 2rem;
  text-decoration: dashed underline #008cff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button``;

function Header() {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/login");
  };
  const Register = () => {
    navigate("/register");
  };
  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/login");
  };
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    setTitle("");
    setContent("");
    setImage(null);
  };
  const handleModalShow = () => setShowModal(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a new FormData object to send the form data including the image file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await requestMethod("POST", "/blogs/blog", formData);
      window.location.href = "/";
      toast.success("Blog created successfully!");
      handleModalClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error, e.g., show an error message to the user
    }

    setLoading(false);
  };
  const token = localStorage.getItem("token");
  return (
    <div>
      <HeaderContainer>
        <Title onClick={() => navigate("/")}>Blogger</Title>
        <ButtonContainer>
          {!token ? (
            <div>
              <Button className="btn btn-dark mx-2" onClick={Login}>
                Login
              </Button>
              <Button className="btn btn-dark" onClick={Register}>
                Signup
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className="btn btn-primary"
                disabled={!token}
                onClick={handleModalShow}
              >
                Create A Blog
              </Button>
              <Button className="btn btn-dark mx-2" onClick={Logout}>
                Logout
              </Button>
            </div>
          )}
        </ButtonContainer>
      </HeaderContainer>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image (Optional)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Button className="btn btn-dark" type="submit">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
