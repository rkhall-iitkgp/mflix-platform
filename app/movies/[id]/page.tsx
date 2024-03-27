"use client"

import { Group, Stack, Text, Space } from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import { createStyles } from '@mantine/styles';
import SimilarMovies from '@/components/MovieDetails/SimilarMovies';
import Footer from '../../(root)/components/Footer';
import Navbar from '../../(root)/components/Navbar';
import searchMsApiUrls from '../../api/searchMsApi';
import BgImage from '@/assets/images/bg-home.jpeg'
import MovieContent from '@/components/MovieDetails/MovieContent';
import { ScrollArea } from '@mantine/core'
import VideoPlayer from '@/components/VideoPlayer';
import { useEffect , useState } from 'react';

export default function MovieDetails({ params }: { params: { id: string } }) {
    const url = searchMsApiUrls();
    const [movieData,setMovieData] = useState({});
    useEffect(()=>{
        const id = params.id;
        const getMovieDetails = async () => {
            const res = await (await fetch (`${url}/movies/${id}`)).json();
            setMovieData(res.result);
            const similar_results_url=`${url}/search/semantic?query=${res.result.plot}`
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
            
              console.log(similarMovies.results);
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
            fontSize:themeOptions.fontSize.xl,
        },
        carousal: {
            marginTop: '-100px',
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

                <Space h={"3rem"} />

                {/* Carousal */}
                <p className={classes.similarmovies} style={{zIndex:'22',color:themeOptions.color.divider}}>Similar Movies</p>
                <Stack className={classes.carousal}>
                    <SimilarMovies/>
                </Stack>
            </div>
            {/* Footer */}
            <Stack bg={themeOptions.color.black} style={{zIndex:'20'}}>
                <Footer />
            </Stack>

        </Stack>


    );
}