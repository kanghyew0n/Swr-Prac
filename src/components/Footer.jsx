import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <a href="https://github.com/kanghyew0n">@kanghyew0n</a>
    </FooterContainer>
  );
};

const FooterContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  
`;

export default Footer;
