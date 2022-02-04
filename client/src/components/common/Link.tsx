import styled from "styled-components";

export const LinkText = styled.span<{
  linkColor?: string | undefined;
  hoverColor?: string | undefined;
}>`
  color: ${(props) =>
    props.linkColor !== undefined ? props.linkColor : `#4C21E8`};
  transition: color 150ms;

  :hover {
    color: ${(props) =>
      props.hoverColor !== undefined ? props.hoverColor : ""};
  }
`;
