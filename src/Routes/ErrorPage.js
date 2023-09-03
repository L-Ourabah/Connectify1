import { useRouteError } from "react-router-dom";
import imgErreur from '../media/img/erreur_page.jpg'
import '../App.css';

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)
    console.log(error.error.message)
    return (


        <div class="erreur_page">
            <h1>Page notFound</h1>
            <img src={imgErreur}/>
            <p>Une impasse se dresse devant vous !</p>
            
        </div>
    )
}