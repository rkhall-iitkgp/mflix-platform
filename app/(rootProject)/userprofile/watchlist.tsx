"use-client"

import react, { useState, useEffect } from "react";
import { createStyles } from '@mantine/styles';
import MovieCard from "@/components/MovieDetails/MovieCards";
import searchMsApiUrls from "../api/searchMsApi";
import useLoginStore from "@/Stores/LoginStore";
import themeOptions from "@/utils/colors";



export default function WatchList() {

    const base_url = searchMsApiUrls();

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const state = useLoginStore.getState();
        const user_id = state.userProfiles[0]._id;
        console.log(user_id);
        fetch(`${base_url}/user/watchlist/${user_id}`)
            .then(response => response.json())
            .then(data => { setMovies(data); console.log(data) })
            .catch(error => console.error("Error fetching data:", error));
    }, []);



    const useStyles = createStyles(() => ({
        WatchListContainer: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "100%",

        },
        WatchListText: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        },

        WatchListCards: {
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
        <div className={classes.WatchListContainer}>
            <div className={classes.WatchListText}><h1 style={{ color: "white" }}>Watch List</h1></div>
            {movies.length !== 0 ? (
                movies.map((movie: any) => (
                    <MovieCard key={movie.id} data={movie} />
                ))
            ) : (
                <h1 style={{ color: themeOptions.color.button, margin: 'auto' }}>No WatchList found</h1>
            )}
        </div>
    </>);
}

