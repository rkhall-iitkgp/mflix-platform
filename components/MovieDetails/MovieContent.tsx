"use client"

import { Group, Image, Stack, Text, Paper } from '@mantine/core';
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
import { useState } from 'react';

export default function MovieContent() {

    const [movieDetails, setM] = useState({
        genres: ['Mystery', 'Action', 'Thriller'],
        director: ['James Cameron'],
        writer: ['Rick Jaffa'],
        cast: ['Chris Pratt', 'Bryce Dallas Howard', 'Laura Dern'],
        rating: "8.6/10",
        tomato: "97%",
        duration: "2hr 27min",
        country: "America",
        year: "2022",
        title: "Jurassic World Dominion",
        moviedetail: "Four years after the destruction of Isla Nublar, dinosaurs now live and hunt alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history most fearsome creatures"
    })

    const styles = createStyles(() => ({
        moviecontent: {
            marginTop: "150px",
            paddingLeft: "40px",
            width: '600px',
        },
        genre: {
            width: '7rem',
            paddingTop: '5px',
            paddingBottom: '5px',
            backgroundColor: themeOptions.color.divider,
            transition:'0.3s',
            '&:hover': {
                cursor: "pointer",
                backgroundColor: themeOptions.color.button,
            },
        },
        imdb: {
            width: '500px',
        },
        watchlist: {
            marginTop: "50px",
            border: "1px solid",
            borderRadius: "10px",
            padding: "10px",
            alignItems: "center",
            transition:'0.3s',
            '&:hover':{
                cursor:'pointer',
                background:themeOptions.color.button,
            }
        },
        country: {
            maxWidth: "max-content",
        },
        creators: {
            marginLeft: "70px", marginTop: "200px", color: themeOptions.color.black,
        },
        flexbox: {
            border: "1px solid #000", borderRadius: "10px", paddingInline: "25px", background: "rgba(217, 217, 217, 0.25)",
            color: themeOptions.color.divider, width: '250px',transition:'0.3s',
        },
        arrow: {
            color: themeOptions.color.button,
            '&:hover':{
                color:themeOptions.color.divider,
            }
        },

    }))

    const { classes } = styles();

    return (
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
                <Text ta="left" fz={themeOptions.fontSize.xl}>{movieDetails.title}</Text>
                
                <Group gap={themeOptions.fontSize.xs}>
                    {movieDetails.genres.map((e, i) =>
                        <Paper key={i} fz={themeOptions.fontSize.s} radius={15} className={classes.genre}>
                            <Text ta="center">{e}</Text>
                        </Paper>)}
                </Group>
                <Group mt={7} justify='space-between' className={classes.imdb}>

                    <Group gap={6} justify="space-around">
                        <Image src={ImdbImg} component={NextImage} alt="imdb" height={20} unoptimized />
                        <Text ta="center">{movieDetails.rating}</Text>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <Image src={TomatoImg} component={NextImage} alt="imdb" height={20} unoptimized />
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
                        <Text style={{ color: "#fff", fontWeight: '500' }}>Add To WatchList</Text>
                        <FaPlus className={classes.arrow}/>
                    </Group>

                </Group>
            </Stack>
            <Stack className={classes.creators}>
                <Group className={classes.flexbox}>
                    <Group display={'block'}>
                        <Text fz={themeOptions.fontSize.md}> Director </Text>
                        {movieDetails.director.map((e, i) => <Text ta="left" style={{ fontWeight: "500" }}>{e}</Text>)}
                    </Group>
                    {/* <IoIosArrowForward fontSize={'70px'} className={classes.arrow} /> */}
                </Group>
                <Group className={classes.flexbox}>
                    <Group display={'block'} >
                        <Text fz={themeOptions.fontSize.md}> Writers </Text>
                        {movieDetails.writer.map((e, i) => <Text ta="left" style={{ fontWeight: "500" }}>{e}</Text>)}
                    </Group>
                    {/* <IoIosArrowForward fontSize={'70px'} className={classes.arrow} /> */}
                </Group>
                <Group className={classes.flexbox}>
                    <Group display={'block'}>
                        <Text fz={themeOptions.fontSize.md}> Cast </Text>
                        {movieDetails.cast.map((e, i) => <Text ta="left" style={{ fontWeight: "500" }}>{e}</Text>)}
                    </Group>
                    {/* <IoIosArrowForward fontSize={'70px'} className={classes.arrow} /> */}
                </Group>
            </Stack>
        </Group>

    );
}