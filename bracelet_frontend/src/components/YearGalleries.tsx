import styled from 'styled-components';
import {Link} from "react-router";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
`;

const StyledLink = styled(Link)`
    padding: 1%;
    margin: auto;
`;

export default function YearGalleries() {

    return (
      <StyledDiv>
          <StyledLink to="/YearGalleries/2023">2023</StyledLink>
          <StyledLink to="/YearGalleries/2024">2024</StyledLink>
          <StyledLink to="/YearGalleries/2025">2025</StyledLink>
      </StyledDiv>
    );
}