"use client"

import { Stack,Skeleton} from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import { createStyles } from '@mantine/styles';
// import SimilarMovies from '@/components/MovieDetails/SimilarMovies';
import Footer from '../../(root)/components/Footer';
import Navbar from '../../(root)/components/Navbar';
import searchMsApiUrls from '../../api/searchMsApi';
import BgImage from '@/assets/images/bg-home.jpeg'
import MovieContent from '@/components/MovieDetails/MovieContent';
// import { ScrollArea } from '@mantine/core'
import VideoPlayer from '@/components/VideoPlayer';
import { useEffect , useState } from 'react';
import useLoginStore from '@/Stores/LoginStore';
import Movies from '@/assets/icons/movies.svg';
import Section from '@/app/(rootProject)/(root)/components/Section';

export default function MovieDetails({ params }: { params: { id: string } }) {
    const url = searchMsApiUrls();
    const [loading, setLoading] = useState(true);
    const [movieData,setMovieData] = useState({});
    const [similarMoviesData,setSimilarMoviesData] = useState([]);
    const state = useLoginStore.getState();
    console.log(state)
    useEffect(()=>{
        const id = params.id;
        const user_id = state.userProfiles[0]._id;
        const getMovieDetails = async () => {
            const res = await (await fetch (`${url}/movies/${id}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId:user_id})
            })).json();
            setMovieData(res.result);
            const similar_results_url=`${url}/search/fuzzy?semantic=${res.result.plot}`
            // console.log(final_url)
            const res2 = await fetch(similar_results_url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({a: 1, b: 'Textual content'})
              });
              const similarMovies = await res2.json();
              setSimilarMoviesData(similarMovies.results);
            //   console.log(similarMovies.results);
        }   
        getMovieDetails(); 
    },[])

    const styles = createStyles(() => ({
        streaming: {
            width: '100%',
            height: '98vh',
            marginTop: '45px',
            border: '1px solid #fff',
        },
        similarmovies:{
            paddingLeft:'80px',
            margin:0,
            fontSize:themeOptions.fontSize.xl,
        },
        carousal: {
            // marginTop: '-100px',
        },
        bgContainer: {
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '100vh',
            // zIndex: -10,
            overflow: 'hidden'
        },
        bgImage: {
            opacity: 0.25,
            zIndex: -20,
        },

    }))

    const { classes } = styles();
    console.log(movieData);
    return (
        <Stack
            justify="space-between"
            pb="xs"
            bg={themeOptions.color.background}
            gap={0}
            // style={{backgroundImage:'url(BgImage)'}}
        >
            {/* Background Image */}
            <div className={classes.bgContainer}>
                <NextImage src={BgImage} layout='fill' objectFit='cover' alt='Background Image' className={classes.bgImage} />
            </div>

            {/* Navbar */}
            <div>
                <Navbar />
            </div>

            {/* Streaming Section */}
            {/* <Group className={classes.streaming}>
                
            </Group> */}
            <VideoPlayer />

            {/* Movie Details */}
            <div style={{backgroundColor:themeOptions.color.background ,zIndex:1}}>
                <MovieContent movieData = {movieData}/>

                {/* <Space h={"3rem"} /> */}

                {/* Carousal */}
                {/* <p className={classes.similarmovies} style={{zIndex:'22',color:themeOptions.color.divider}}>Similar Movies</p> */}
                <Section title="Similar Movies" image={Movies} movieData = {similarMoviesData}/>
                {/* <SimilarMovies similarMoviesData={similarMoviesData}/> */}
            </div>
            {/* Footer */}
            <Stack bg={themeOptions.color.black} style={{zIndex:'20'}}>
                <Footer/>
            </Stack>

        </Stack>


    );
}