import styled from "styled-components";

import bg from "./home/bg.jpg";

export const Container = styled.div`
  display: flex;
  flex: 1;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right top;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
