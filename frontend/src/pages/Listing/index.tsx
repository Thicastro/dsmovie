import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

    const [pgNumber, setPgNumber] = useState(0);

    const [pg, setPg] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=${pgNumber}`)
            .then(result => {
                const data = result.data as MoviePage;
                setPg(data);
            });
    }, [pgNumber]);

    return (
        <>
            <Pagination />

            <div className="container">
                <div className="row">
                    {pg.content.map(movie => (
                        <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <MovieCard movie={movie} />
                        </div>
                        )
                        )}
                </div>
            </div>
        </>
    );
}

export default Listing;