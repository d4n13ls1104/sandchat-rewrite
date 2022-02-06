import styled from "styled-components";

export const Link = styled.a<{
  linkColor?: string | undefined;
  hoverColor?: string | undefined;
}>`
  color: ${(props) =>
    props.linkColor !== undefined ? props.linkColor : `#4C21E8`};
  transition: color 150ms;
  text-decoration: none;

  :hover {
    color: ${(props) =>
      props.hoverColor !== undefined ? props.hoverColor : ""};
  }
`;
