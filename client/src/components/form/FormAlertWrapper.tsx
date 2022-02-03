import styled from "styled-components";

export const FormAlertWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-end;
  flex-direction: column;
  width: 350px;
  height: 50px;
  @media (max-height: 1000px) {
    margin-top: 20vh;
  }
`;
