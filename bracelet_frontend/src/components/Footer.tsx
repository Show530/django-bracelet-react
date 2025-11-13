import styled from "styled-components";

const StyledFooter = styled.footer`
    margin: auto;
`;

export default function Footer() {

    return (
      <StyledFooter>
          <p>
              Copyright &copy; {new Date().getFullYear()} Sophia Howson. All rights reserved.
          </p>
      </StyledFooter>
    );
}