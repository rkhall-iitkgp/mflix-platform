"use-client"

import react, { useState, useEffect } from "react";
import useLoginStore from "@/Stores/LoginStore";

import { createStyles } from '@mantine/styles';
// import MovieCard from "../(root)/components/MovieCard";
import MovieCard from "@/components/MovieDetails/MovieCards";
const Favorites = () => {
    const [movies, setMovies] = useState([
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
        {
            "id": "123"
        },
    ]);
    useEffect(() => {
        const state = useLoginStore.getState();
        const user_id = state.userProfiles[0]._id;
        console.log(user_id);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/watchlist/${user_id}`)
            .then(response => response.json())
            .then(data => { setMovies(data); console.log(data) })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const useStyles = createStyles(() => ({
        FavouritesContainer: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "100%",

        },
        FavouritesText: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        },

        FavouritesCards: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // gap: "1%",
            alignItems: "center",
            flexWrap: "wrap",
            paddingLeft: "2rem",
            paddingRight: "2rem",
        }

    }))

    const { classes } = useStyles();
    return (<>
        <div className={classes.FavouritesContainer}>
            <div className={classes.FavouritesText}><h1 style={{ color: "white" }}>Favorites</h1></div>
            <div className={classes.FavouritesCards}>
                {movies.map(movie => (
                    // <MovieCard
                    <MovieCard key={movie.id} movie={movie} />
                ))}

            </div>
        </div>
    </>);
}

export default Favorites;