import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useUpdatePost, useDeletePost, useGetPosts } from "../hooks/usePosts";
import useSWR, { useSWRConfig } from "swr";

const ListItem = ({ listData }) => {
  const [isClick, setIsClick] = useState();
  const [title, setTitle] = useState(listData.title);
  const [body, setBody] = useState(listData.body);

  const [DATA, setDATA] = useState(listData);
  const { mutate } = useSWRConfig();
  // const { data, isLoading, isError, mutate } = useGetPosts();

  const onUpdate = async () => {
    const id = DATA.id;
    await mutate("/post", useUpdatePost(DATA.id, title, body), {
      optimisticData: setDATA({ id, title, body }),
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });
    setIsClick(false);
  };

  const onDelete = async () => {
    if (window.confirm("삭제?")) {
      mutate(useDeletePost(DATA.id));
    }
    // 삭제시 바로 화면에 보이게 하고싶음!
  };

  return (
    <Item>
      {isClick ? (
        <>
          <InputGroup>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input value={body} onChange={(e) => setBody(e.target.value)} />
          </InputGroup>
          <ButtonBox>
            <SaveButton onClick={(data) => onUpdate(data)}>✅</SaveButton>
          </ButtonBox>
        </>
      ) : (
        <>
          <InputGroup>
            <Title>{DATA.title}</Title>
            <Body>{DATA.body}</Body>
          </InputGroup>
          <ButtonBox>
            <UpdateButton onClick={() => setIsClick(true)}>✏️</UpdateButton>
            <DeleteButton onClick={onDelete}>🗑</DeleteButton>
          </ButtonBox>
        </>
      )}
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin: 15px;
  border-bottom: 1px solid #626262;
`;

const InputGroup = styled.div`
  width: 80%;
  input {
    width: 100%;
    padding: 10px 10px 10px 0;
    background-color: #242424;
    border: none;
    border-bottom: 1px solid #424242;
    color: #fff;
    margin-bottom: 10px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-style: italic;
  font-size: 18px;
  color: #ffffffdb;
  margin-bottom: 5px;
`;

const Body = styled.div`
  padding-bottom: 15px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
`;

const SaveButton = styled.button`
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

export default ListItem;
