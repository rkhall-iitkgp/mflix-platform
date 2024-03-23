"use client"

import { Group, Image, Stack, Paper } from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import { FaPlus } from 'react-icons/fa';
import themeOptions from '@/utils/colors';
import Sample from '@/assets/sample.png';
import { createStyles } from '@mantine/styles';
import { useState } from 'react';

export default function MovieContent() {

    const [movieDetails, setmovieDetails] = useState({
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
            display:'flex',
            justifyContent:'center',
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
                color:themeOptions.color.divider,
            }
        },
        country: {
            maxWidth: "max-content",
        },
        creators: {
            marginTop: "200px",
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
        flexboxstyles:{
            textAlign:'left', 
            margin:'2px', 
            paddingBottom:'5px',
        },
        details:{
            textAlign:'center', 
            margin:'2px',
        },
        image:{
            height: "530px", 
            width: "291px", 
            marginTop: "170px", 
            marginLeft: "100px",
        },

    }))

    const { classes } = styles();

    return (
        <Group align="center">
            <div>
                <NextImage
                    src={Sample}
                    className={classes.image}
                    alt="sample"
                />
            </div>
            <Stack ml="xxl" gap="xs" mr="lg" className={classes.moviecontent}>
                <p style={{textAlign:'left', fontSize:themeOptions.fontSize.xl, margin:'2px'}}>{movieDetails.title}</p>
                
                <Group gap={themeOptions.fontSize.xs}>
                    {movieDetails.genres.map((e, i) =>
                        <Paper key={i} fz={themeOptions.fontSize.s} radius={15} className={classes.genre}>
                            <p style={{margin:'2px', textAlign:'center' }}>{e}</p>
                        </Paper>)}
                </Group>
                <Group mt={7} justify='space-between' className={classes.imdb}>

                    <Group gap={6} justify="space-around">
                        <Image src={ImdbImg} component={NextImage} alt="imdb" height={20} unoptimized />
                        <p className={classes.details}>{movieDetails.rating}</p>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <Image src={TomatoImg} component={NextImage} alt="imdb" height={20} unoptimized />
                        <p className={classes.details}>{movieDetails.tomato}</p>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <FaRegHourglass />
                        <p className={classes.details}>{movieDetails.duration}</p>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <PiCalendar />
                        <p className={classes.details}>{movieDetails.year}</p>
                    </Group>
                    <Group gap={6} justify="space-around" className={classes.country}>
                        <GrLocation />
                        <p className={classes.details}>{movieDetails.country}</p>
                    </Group>
                    <Group>
                        <p className={classes.details}>{movieDetails.moviedetail}</p>
                    </Group>

                    <Group c={themeOptions.color.button} className={classes.watchlist}>
                        <p style={{ color: "#fff", fontWeight: '500', margin:'2px'}}>Add To WatchList</p>
                        <FaPlus className={classes.arrow}/>
                    </Group>

                </Group>
            </Stack>
            <Stack className={classes.creators}>
                <Group className={classes.flexbox}>
                    <Group display={'block'}>
                        <p style={{fontSize:themeOptions.fontSize.md, margin:'2px'}}> Director </p>
                        {movieDetails.director.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)}
                    </Group>
                </Group>
                <Group className={classes.flexbox}>
                    <Group display={'block'} >
                        <p style={{fontSize:themeOptions.fontSize.md, margin:'2px'}}> Writers </p>
                        {movieDetails.writer.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)}
                    </Group>
                </Group>
                <Group className={classes.flexbox}>
                    <Group display={'block'}>
                        <p style={{fontSize:themeOptions.fontSize.md, margin:'2px'}}> Cast </p>
                        {movieDetails.cast.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)}
                    </Group>
                </Group>
            </Stack>
        </Group>

    );
}