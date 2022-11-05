import React from "react";
import styled from "styled-components";
import { useCreatPost } from "../hooks/usePosts";
import { usePosthData } from "../store/PostStore";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { body, title, setBody, setTitle } = usePosthData();

  const func = () => {
    useCreatPost(title, body);
    setTitle("");
    setBody("");
    navigate("/");
  };

  return (
    <PostForm>
      <Inner>
        <Input
          value={title}
          placeholder="title 입력합니다"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          value={body}
          placeholder="body 입력합니다"
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={func}>전송 🚀</Button>
      </Inner>
    </PostForm>
  );
};

export default Post;
const PostForm = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  background-color: #242424;
  border: 1px solid #424242;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #424242;
  color: #fff;
`;
