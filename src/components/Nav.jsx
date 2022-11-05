import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <Header>
      <Inner>
        <Link to="/">
          <div>SWR</div>
        </Link>

        <ul>
          <Link to="/">
            <li>LIST</li>
          </Link>
          <Link to="/post">
            <li>POST</li>
          </Link>
          <Link to="/optimistic">
            <li>OPTIMISTIC</li>
          </Link>
        </ul>
      </Inner>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 70px;
  font-size: 18px;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.1);
  font-weight: 600;
`;

const Inner = styled.div`
  width: 80vw;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }
`;
