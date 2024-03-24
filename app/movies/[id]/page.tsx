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
import VideoPlayer from '@/components/MovieDetails/VideoPlayer';
import { useEffect , useState } from 'react';

export default function MovieDetails({ params }: { params: { id: string } }) {
    const url = searchMsApiUrls();
    const [movieData,setMovieData] = useState({});
    useEffect(()=>{
        const id = params.id;
        const getMovieDetails = async () => {
            const res = await (await fetch (`${url}/movies/${id}`)).json();
            setMovieData(res.result);
            console.log(movieData)
        }
        getMovieDetails(); 
    },[])
    const styles = createStyles(() => ({
        nvbar:{
            background:themeOptions.color.black,
            opacity:'0.7',
            position:'fixed',
            width:'100%',
        },
        streaming: {
            width: '100%',
            height: '98vh',
            marginTop: '35px',
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
            style={{backgroundImage:'url(BgImage)'}}
        >
            {/* Background Image */}
            <div className={classes.bgContainer}>
                <NextImage src={BgImage} layout='fill' objectFit='cover' alt='Background Image' className={classes.bgImage} />
            </div>

            {/* Navbar */}
            {/* <ScrollArea type='hover'> */}
            <div style={{zIndex:'20'}} className={classes.nvbar} >
                <Navbar />
            </div>
                {/* <main className={classes.mainStyles}/> */}
            {/* </ScrollArea> */}

            {/* Streaming Section */}
            <Group className={classes.streaming}>
                
            </Group>

            {/* Movie Details */}
            <MovieContent  movieData ={movieData} />

            <Space h={"3rem"} />

            {/* Carousal */}
            <p className={classes.similarmovies}>Similar Movies</p>
            <Stack className={classes.carousal}>
                <SimilarMovies/>
            </Stack>

            {/* Footer */}
            <Stack bg={themeOptions.color.black} style={{zIndex:'20'}}>
                <Footer />
            </Stack>

        </Stack>


    );
}