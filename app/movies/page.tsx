"use client"

import { Group, Stack, Text, Space } from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import { createStyles } from '@mantine/styles';
import SimilarMovies from '@/components/MovieDetails/SimilarMovies';
import Footer from '../(root)/components/Footer';
import Navbar from '../(root)/components/Navbar';
import MovieCards from '@/components/MovieDetails/MovieCards';
import BgImage from '@/assets/images/bg-home.jpeg'
import MovieContent from '@/components/MovieDetails/MovieContent';

export default function MovieDetails() {

    const styles = createStyles(() => ({
        streaming: {
            width: '100%',
            height: '100vh',
            marginTop: '50px',
            border: '1px solid #fff',
        },
        similarmovies:{
            paddingLeft:'50px',
            fontSize:themeOptions.fontSize.xl,
        },
        carousal: {
            marginBottom: '100px',
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
            <Stack>
                <Navbar />
            </Stack>

            {/* Streaming Section */}
            <Group className={classes.streaming}>
            </Group>

            {/* Movie Details */}
            <MovieContent />

            <Space h={"3rem"} />

            {/* Carousal */}
            <Stack className={classes.carousal}>
                <p className={classes.similarmovies}>Similar Movies</p>
                <SimilarMovies>
                    {Array.from({ length: 10 }, (_, index) => <MovieCards key={index} />)}
                </SimilarMovies>
            </Stack>

            {/* Footer */}
            <Stack bg={themeOptions.color.black}>
                <Footer />
            </Stack>

        </Stack>


    );
}