import {Link} from "react-router";

export default function YearGalleries() {

    return (
      <>
        <Link to="/YearGalleries/2023">2023</Link>
          <Link to="/YearGalleries/2024">2024</Link>
          <Link to="/YearGalleries/2025">2025</Link>
      </>
    );
}