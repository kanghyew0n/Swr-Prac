import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetPosts = () => {
  const fetcher = async () => {
    const res = await axios.get("http://localhost:3001/posts");
    console.log("useGetPosts");
    return res.data;
  };
  const { data, error, mutate } = useSWR("/posts", fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useCreatPost = async (title, body) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/posts`, {
      title,
      body,
    });
    console.log("useCreatPost");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const useUpdatePost = async (id, title, body) => {
  try {
    const { data } = await axios.patch(`http://localhost:3001/posts/${id}`, {
      title,
      body,
    });

    return data;
  } catch (error) {
    console.log("useUpdatePost error :", error);
    return error.response;
  }
};

export const useDeletePost = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:3001/posts/${id}`);
    return { data };
  } catch (error) {
    return error.response.data;
  }
};

let todos = [];
const delay = () => new Promise((res) => setTimeout(() => res(), 800));

export async function getTodos() {
  await delay();
  return todos;
}

export async function addTodo(todo) {
  await delay();
  if (Math.random() < 0.5) throw new Error("Failed to add new item!");
  todos = [...todos, todo];
  return todos;
}
