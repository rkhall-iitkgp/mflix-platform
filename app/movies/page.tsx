"use client"

import { Group, Button, Image, Stack, Text, Paper, Space } from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import { FaPlus } from 'react-icons/fa';
import themeOptions from '@/utils/colors';
import Sample from '@/assets/sample.png';
import { IoIosArrowForward } from 'react-icons/io';
import { createStyles } from '@mantine/styles';
import SimilarMovies from '@/components/MovieDetails/SimilarMovies';
import Footer from '../(root)/components/Footer';
import Navbar from '../(root)/components/Navbar';
import MovieCards from '@/components/MovieDetails/MovieCards';
import BgImage from '@/assets/images/bg-home.jpeg'
import { useState } from 'react';

export default function MovieDetails() {
    // const genres = ['Mystery', 'Action', 'Thriller'];
    // const director = ['James Cameron'];
    // const writer = ['Rick Jaffa','Vishnu Kumar'];
    // const cast = ['Someone'];
    // const rating = ['8.6/10'];
    // const tomato = ['97%'];
    // const duration = ['2hr 21min'];
    // const country = ['Country'];
    // const year = ['2024'];
    // const moviename = ['Movie Name'];
    // const moviedetail = ['Four years after the destruction of Isla Nublar, dinosaurs now live and hunt alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history most fearsome creatures'];
    
    const [movieDetails, setM] = useState({genres: ['Mystery','Action','Thriller','Horror'], 
                                        director: ['James Cameron'],
                                        writer:['Rick Jaffa','Vishnu Kumar'],
                                        cast:['Chris Pratt, Bryce Dallas Howard'],
                                        rating:"8.6/10",
                                        tomato:"97%",
                                        duration:"2hr 27min",
                                        country:"America",
                                        year:"2022",
                                        moviename:"Jurassic World Dominion",
                                        moviedetail:"Four years after the destruction of Isla Nublar, dinosaurs now live and hunt alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history most fearsome creatures"})

    const styles = createStyles(() => ({
        streaming: {
            width: '100%',
            height: '100vh',
            marginTop: '150px',
            border:'1px solid #fff',
        },
        moviecontent: {
            marginTop: "150px", 
            paddingLeft: "40px",
            width:'600px',
        },
        genre:{
            width:'7rem',
            paddingTop:'5px',
            paddingBottom:'5px',
            backgroundColor: themeOptions.color.smallBox,
            '&:hover':{
                cursor:"pointer",
                backgroundColor: themeOptions.color.black,
            },
        },
        imdb:{
            width:'500px',
        },
        watchlist:{
            marginTop: "50px", 
            border: "1px solid", 
            borderRadius: "10px", 
            padding: "10px", 
            alignItems: "center"
        },
        country:{
            maxWidth:"max-content",
        },
        creators:{
            marginLeft: "70px", marginTop: "200px", color:themeOptions.color.black,
        },
        flexbox:{
            border: "1px solid #000", borderRadius: "10px", paddingInline: "25px", background: "#D9D9D9",
            color:themeOptions.color.divider,
        },
        arrow:{
            color: themeOptions.color.button,
        },
        carousal:{
            marginTop:'100px',
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
        footer:{
            marginBottom:'100px',
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
            <div className={classes.bgContainer}>
                <NextImage src={BgImage} layout='fill' objectFit='cover' alt='Background Image' className={classes.bgImage} />
            </div>
            <Stack>
                <Navbar/>
            </Stack>
            <Group className={classes.streaming}>
            </Group>
            <Group align="center">
                <div>
                    <Image
                        src={Sample}
                        component={NextImage}
                        style={{ height: "430px", width: "291px", marginTop: "170px", marginLeft: "100px" }}
                        alt="sample"
                    />
                </div>
                <Stack ml="xxl" gap="xs" mr="lg" className={classes.moviecontent}>
                <Text ta="left" fz={themeOptions.fontSize.xl}>{movieDetails.moviename}</Text>
                    <Group gap={themeOptions.fontSize.xs}>
                        {movieDetails.genres.map((e, i) =>
                            <Paper
                                key={i}
                                bg={themeOptions.color.smallBox}
                                fz={themeOptions.fontSize.s}
                                radius={15}
                                className={classes.genre}
                            >
                                <Text ta="center">{e}</Text>
                            </Paper>)}
                    </Group>
                    <Group mt={7} justify='space-between' className={classes.imdb}>
                        <Group gap={6} justify="space-around">
                            <Image
                                src={ImdbImg}
                                component={NextImage}
                                alt="imdb"
                                height={20}
                                unoptimized
                            />
                            <Text ta="center">{movieDetails.rating}</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <Image
                                src={TomatoImg}
                                component={NextImage}
                                alt="imdb"
                                height={20}
                                unoptimized
                            />
                            <Text ta="center">{movieDetails.tomato}</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <FaRegHourglass />
                            <Text ta="center">{movieDetails.duration}</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <PiCalendar />
                            <Text ta="center">{movieDetails.year}</Text>
                        </Group>
                        <Group gap={6} justify="space-around" className={classes.country}>
                            <GrLocation />
                            <Text ta="center">{movieDetails.country}</Text>
                        </Group>
                        <Group>
                        <Text ta="center">{movieDetails.moviedetail}</Text>
                        </Group>
                        <Group c={themeOptions.color.button} className={classes.watchlist}>
                            <Text style={{ color: "#fff", fontWeight:'500' }}>Add To WatchList</Text>
                            <FaPlus />
                        </Group>
                    </Group>
                </Stack>
                <Stack className={classes.creators}>
                    <Group className={classes.flexbox}>
                        <Group display={'block'}>
                            <Text fz={themeOptions.fontSize.md}> Director </Text>
                            {movieDetails.director.map((e, i) =>
                                <Paper
                                    style={{ backgroundColor: '#D9D9D9' }}
                                    key={i}
                                    fz={themeOptions.fontSize.md}
                                    w={116}
                                    pt={5}
                                    pb={5}
                                    radius={13}
                                >
                                    <Text ta="left" style={{fontWeight:"500"}}>{e}</Text>
                                </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'} className={classes.arrow} />
                    </Group>
                    <Group className={classes.flexbox}>
                        <Group display={'block'} >
                            <Text fz={themeOptions.fontSize.md} style={{ marginBottom: "-10px" }}> Writers </Text>
                            {movieDetails.writer.map((e, i) =>
                                <Paper
                                    style={{ backgroundColor: '#D9D9D9'}}
                                    key={i}
                                    fz={themeOptions.fontSize.md}
                                    w={116}
                                    pt={5}
                                    pb={5}
                                    radius={13}
                                >
                                    <Text ta="left" style={{fontWeight:"500"}}>{e}</Text>
                                </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'} className={classes.arrow} />
                    </Group>
                    <Group className={classes.flexbox}>
                        <Group display={'block'}>
                            <Text fz={themeOptions.fontSize.md} style={{ marginBottom: "-10px" }}> Cast </Text>
                            {movieDetails.cast.map((e, i) =>
                                <Paper
                                    style={{ backgroundColor: '#D9D9D9' }}
                                    key={i}
                                    fz={themeOptions.fontSize.md}
                                    w={116}
                                    pt={5}
                                    pb={5}
                                    radius={13}

                                >
                                    <Text ta="left" style={{fontWeight:"500"}}>{e}</Text>
                                </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'} className={classes.arrow} />
                    </Group>
                </Stack>
            </Group>
            <Space h={"10rem"}/>
            <Stack className={classes.footer}>
                <SimilarMovies>
                    {Array.from({ length :10}, (_,index) => <MovieCards key={index}/>)}
                </SimilarMovies>
            </Stack>
            <Stack bg={themeOptions.color.black}>
                <Footer/>
            </Stack>
        </Stack>


    );
}