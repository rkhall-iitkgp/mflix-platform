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
import { ScrollArea } from '@mantine/core'
import VideoPlayer from '@/components/MovieDetails/VideoPlayer';

export default function MovieDetails() {

    const styles = createStyles(() => ({
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
            position: 'absolute',
            width: '100%',
            height: '120vh',
            zIndex: 0,
            overflow: 'hidden'
        },
        bgImage: {
            opacity: 0.25,
            zIndex: -20,
        },
        mainStyles: {
            color: 'white',
        }

    }))

    const { classes } = styles();

    return (
        <Stack
            justify="space-between"
            pb="xs"
            bg={themeOptions.color.background}
            gap={0}
        >
            {/* Background Image */}
            <div className={classes.bgContainer}>
                <NextImage src={BgImage} layout='fill' objectFit='cover' alt='Background Image' className={classes.bgImage} />
            </div>

            {/* Navbar */}
            <ScrollArea type='hover'>
                <Navbar />
                {/* <main className={classes.mainStyles}/> */}
            </ScrollArea>

            {/* Streaming Section */}
            <Group className={classes.streaming}>
                {/* <VideoPlayer/> */}
            </Group>

            {/* Movie Details */}
            <MovieContent />

            <Space h={"3rem"} />

            {/* Carousal */}
            <p className={classes.similarmovies}>Similar Movies</p>
            <Stack className={classes.carousal}>
                <SimilarMovies/>
            </Stack>

            {/* Footer */}
            <Stack bg={themeOptions.color.black}>
                <Footer />
            </Stack>

        </Stack>


    );
}