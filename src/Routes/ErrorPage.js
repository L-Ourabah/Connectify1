import { Link } from 'react-router-dom'
import imgErreur from '../media/img/erreur_page.jpg'
import '../App.css';

export default function ErrorPage() {

    return (


        <div class="erreur_page">
            <h1>Page notFound</h1>
            <img src={imgErreur} />
            <div className="link2">
                <p>Une impasse se dresse devant vous !</p>
                <button><Link to={'/'}> Cliquez ici! </Link></button>
            </div>

        </div>
    )
}