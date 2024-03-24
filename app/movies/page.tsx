"use client"

import { Group, Stack, Text, Space } from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import { createStyles } from '@mantine/styles';
import SimilarMovies from '@/components/MovieDetails/SimilarMovies';
import Footer from '../(root)/components/Footer';
import Navbar from '../(root)/components/Navbar';
import BgImage from '@/assets/images/bg-home.jpeg'
import MovieContent from '@/components/MovieDetails/MovieContent';
import VideoPlayer from '@/components/VideoPlayer';

export default function MovieDetails() {
    
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
            <MovieContent />

            <Space h={"3rem"} />

            {/* Carousal */}
            <p className={classes.similarmovies} style={{zIndex:'22'}}>Similar Movies</p>
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