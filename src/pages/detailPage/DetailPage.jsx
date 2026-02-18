import "./DetailPage.css"

import { useParams } from "react-router-dom";

function DetailPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Detail Page</h1>
            <p>Hero ID: {id}</p>
        </div>
    );
}

export default DetailPage;
