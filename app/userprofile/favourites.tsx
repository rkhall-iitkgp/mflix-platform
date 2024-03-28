"use-client"

import react from "react";
import { createStyles } from '@mantine/styles';
import MovieCard from "../(root)/components/MovieCard";
const Favorites = () => {
      
const useStyles = createStyles(() => ({
    FavouritesContainer:{
display:"flex",
flexDirection:"column",
height:"100%",
justifyContent:"center",
width:"100%",

    },
    FavouritesText:{
display:"flex",
justifyContent:"center",
alignItems:"center",

    },

    FavouritesCards:{
display:"flex",
flexDirection:"row",
// justifyContent:"space-around",
gap:"1%",
alignItems:"center",

    }

}))

const {classes} = useStyles();
    return (<>
        <div className={classes.FavouritesContainer}>
            <div className={classes.FavouritesText}><h3 style={{color:"white"}}>Favorites</h3></div>
            <div className={classes.FavouritesCards}>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            </div>
        </div>
        </>  );
}
 
export default Favorites;