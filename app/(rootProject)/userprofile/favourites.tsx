"use-client"

import react, { useState, useEffect } from "react";
import useLoginStore from "@/Stores/LoginStore";

import { createStyles } from '@mantine/styles';
// import MovieCard from "../(root)/components/MovieCard";
import MovieCard from "@/components/MovieDetails/MovieCards";
import searchMsApiUrls from "../api/searchMsApi";
import { theme } from "@/theme";
import themeOptions from "@/utils/colors";
const Favorites = () => {
    const base_url = searchMsApiUrls();
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const state = useLoginStore.getState();
        const user_id = state.userProfiles[0]._id;
        console.log(user_id);
        fetch(`${base_url}/user/watchlist/${user_id}`)
            .then(response => response.json())
            .then(data => { setMovies(data); console.log(data); console.log(data.length) })
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

            {/* <div className={classes.FavouritesCards}>
                {movies.map(movie => (
                    // <MovieCard
                    <MovieCard key={movie.id} data={movie} />
                ))}

            </div> */}
            <div className={classes.FavouritesCards}>

                {/* {movies.length !== 0 ? (
                    movies.map(movie => (
                        <MovieCard key={movie.id} data={movie} />
                    ))
                ) : (
                    
                )} */}
                {movies && movies.length !== 0 ? (
                    movies.map((movie: any) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))
                ) : (
                    < h1 style={{ color: themeOptions.color.button, margin: 'auto' }}>No favourites found</h1>
                )}
            </div>
        </div>
    </>);
}

export default Favorites;