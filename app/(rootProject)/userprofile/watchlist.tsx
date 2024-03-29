"use-client"

import react, {useState, useEffect} from "react";
import { createStyles } from '@mantine/styles';
import MovieCard from "../(root)/components/MovieCard";

export default function WatchList(){

    const base_url = "https://971edtce1a.execute-api.ap-south-1.amazonaws.com/";
   
        const [movies, setMovies] = useState([{
            "id": "123"
        }]);
    useEffect(() => {
       
        fetch(base_url+"/user/watchlist/6601d20081bc9671ef4364ee")
            .then(response => response.json())
            .then(data => setMovies(data)) 
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    


const useStyles = createStyles(() => ({
    WatchListContainer:{
display:"flex",
flexDirection:"column",
height:"100%",
justifyContent:"center",
width:"100%",

    },
    WatchListText:{
display:"flex",
justifyContent:"center",
alignItems:"center",

    },

    WatchListCards:{
display:"flex",
flexDirection:"row",
// justifyContent:"space-around",
gap:"1%",
alignItems:"center",

    }

}))

const {classes} = useStyles();

    return ( <>
    <div className={classes.WatchListContainer}>
        <div className={classes.WatchListText}><h3 style={{color:"white"}}>Watch List</h3></div>
        <div className={classes.WatchListCards}>
        {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
        </div>
    </div>
    </> );
}
 
