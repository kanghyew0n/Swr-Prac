import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import useSWR from "swr";

import { getTodos, addTodo } from "../hooks/usePosts";

// 로컬 상태를 즉시 업데이트하고 실행
// 요구. API가 업데이트된 내용을 반환하므로
// 데이터, 새로운 재검증을 시작할 필요가 없습니다.
// 캐시를 직접 채울 수 있습니다.

// API 오류가 발생하면 원본 데이터는
// SWR에 의해 자동으로 롤백됩니다.

export default function App() {
  const [text, setText] = useState("");
  const { data, mutate } = useSWR("/api/todos", getTodos);

  const handleAddTodo = async () => {
    setText("");

    const newTodo = {
      id: Date.now(),
      text,
    };

    try {
      await mutate(addTodo(newTodo), {
        optimisticData: [...data, newTodo], //클라이언트 캐시를 즉시 업데이트하기 위한 데이터
        rollbackOnError: true, //비동기 업데이트가 해소되면 캐시를 갱신합니다.
        populateCache: true, // 원격 돌연변이의 결과가 캐시에 기록되어야 하거나 새로운 결과와 현재 결과를 인수로 받아 돌연변이 결과를 반환하는 함수.
        revalidate: false, //원격 뮤테이션 에러 시 캐시를 롤백합니다.
      });
      toast.success("Successfully added the new item.");
    } catch (e) {
      toast.error("Failed to add the new item.");
    }
  };

  return (
    <Container>
      <Group>
        <Toaster toastOptions={{ position: "bottom-center" }} />
        <h1>Todos </h1>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <Button type="submit" onClick={handleAddTodo}>
            Add
          </Button>
        </form>
        <ul>
          {data
            ? data.map((todo) => {
                return <li key={todo.id}>{todo.text}</li>;
              })
            : null}
        </ul>
      </Group>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Group = styled.div`
  padding-top: 50px;
  text-align: center;

  form {
    display: flex;
    margin: 20px 0 30px 0;
  }

  input {
    width: 100%;
    padding: 5px 10px;
    background-color: #242424;
    border: 1px solid #424242;
    color: #fff;
    &:focus {
      outline: 1px solid #666;
    }
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #424242;
  color: #fff;
`;
