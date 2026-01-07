import styled from "styled-components";
import { FaInstagram } from "react-icons/fa";
// import {Link} from "react-router";

const StyledFooter = styled.footer`
    margin: auto;
`;

export default function Footer() {

    return (
      <StyledFooter>
          <p>
              Copyright &copy; {new Date().getFullYear()} Sophia Howson. All rights reserved. &emsp;
              <a href="https://www.instagram.com/acc.soph.sories/" target="_blank">
                <FaInstagram/>
              </a>
          </p>

      </StyledFooter>
    );
}