import {Link} from 'react-router';

export default function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to={`/`}>Home</Link></li>
                <li><Link to={`/Gallery`}>Gallery</Link></li>
                <li><Link to={`/YearGalleries`}>Year Galleries</Link></li>
                <li><Link to={`/Selling`}>Selling</Link></li>
            </ul>
        </nav>
    );
}