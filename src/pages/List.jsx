import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import { useGetPosts } from "../hooks/usePosts";

const List = () => {
  const { data, isLoading, isError } = useGetPosts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>ERR...</div>;

  console.log("list의 data", data)

  return (
    <PostList>
      <Inner>
        <ul>
          {data.map((el) => (
            <ListItem key={el.id} listData={el} data={data}/>
          ))}
        </ul>
      </Inner>
    </PostList>
  );
};

const PostList = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding-top: 50px;
`;

export default List;
