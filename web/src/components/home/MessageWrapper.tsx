import styled from "styled-components";

const MessageWrapper = styled.div`
  width: 95%;
  overflow-y: scroll;
  flex-grow: 5;
  -ms-overflow-style: none;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  padding-bottom: 20px;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MessageWrapper;
