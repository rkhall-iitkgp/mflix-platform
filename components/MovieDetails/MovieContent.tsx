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


export default function MovieContent({movieData}) {
    console.log(movieData);
    const movieDetails = movieData;

    const styles = createStyles(() => ({
        moviecontent: {
            // marginTop: "10px",
            // paddingLeft: "40px",
            width: '45vw',
            // marginLeft:'-100px',
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
            width: '40vw',
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
            margin:"0 50px 0 0",
        },
        flexbox: {
            border: "1px solid #000", borderRadius: "10px", paddingInline: "25px", background: "rgba(217, 217, 217, 0.25)",
            color: themeOptions.color.divider, width: '20vw',transition:'0.3s',
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
            textAlign:'left', 
            margin:'2px',
            color:themeOptions.color.divider,
            fontSize: themeOptions.fontSize.md
        },
        moviePlot:{
            width: '50vw',
            textAlign:'left', 
            margin:'2px',
            color:themeOptions.color.divider,
            fontSize: themeOptions.fontSize.md
        },
        image:{
            height: "30vw", 
            width: "17vw", 
            margin: "100px 0 100px 50px", 
        },
        title:{
            textAlign:'left', 
            fontSize:themeOptions.fontSize.xl, 
            margin:'0.5rem 0', 
            width:'45vw',
            color:themeOptions.color.divider,
        },
        genreName:{
            textAlign:'center',
            backgroundColor:themeOptions.color.button,
            color:themeOptions.color.divider,
            fontSize:themeOptions.fontSize.md,
            padding:'0.25rem 3.5rem',
            margin:0,
            borderRadius:10,
        }

    }))

    const { classes } = styles();
    // console.log(movieData.country)
    return (
        <Group style={{display:'flex', justifyContent:'space-between', zIndex:'20'}}>
            <div>
                <NextImage
                    src={movieDetails.poster}
                    width = "1000"
                    height = "300"
                    className={classes.image}
                    alt="sample"
                />
            </div>
            <Stack ml="xxl" gap="0" mr="lg" className={classes.moviecontent}>
                <p className={classes.title}>{movieDetails.title}</p>
                <Group gap={themeOptions.fontSize.xs}>
                    {movieDetails.genres?.map((e, i) =>
                            <p className={classes.genreName}>{e}</p>
                    )}
                </Group>
                <Group mt={7} justify='space-between' className={classes.imdb}>
                    <Group gap={6} justify="space-around">
                        <Image src={ImdbImg} component={NextImage} alt="imdb" height={20} unoptimized />
                        <p className={classes.details}>{movieDetails.imdb?.rating}/10</p>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <Image src={TomatoImg} component={NextImage} alt="imdb" height={20} unoptimized />
                        <p className={classes.details}>{movieDetails.tomatoes?.viewer.rating}/5</p>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <FaRegHourglass color='white' fontSize={20}/>
                        <p className={classes.details}>{movieDetails.runtime}min</p>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <PiCalendar color='white' fontSize={20}/>
                        <p className={classes.details}>{movieDetails.year}</p>
                    </Group>
                    <Group gap={6} justify="space-around" className={classes.country}>
                        <GrLocation color='white' fontSize={20}/>
                        <p className={classes.details}>{movieDetails?.countries}</p>
                    </Group>
                    <Group>
                        <p className={classes.moviePlot}>{movieDetails.fullplot}</p>
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
                        {movieDetails.directors?.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)}
                    </Group>
                </Group>
                <Group className={classes.flexbox}>
                <Group display={'block'} >
                        {!movieDetails.writers || movieDetails.writers.length===0 ? <></> : <>
                            <p style={{fontSize:themeOptions.fontSize.md, margin:'2px'}}> Writers </p>
                            {movieDetails.writers?.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)} 
                        </>}
                </Group>

                </Group>
                <Group className={classes.flexbox}>
                    <Group display={'block'}>
                        <p style={{fontSize:themeOptions.fontSize.md, margin:'2px'}}> Cast </p>
                        {movieDetails.cast?.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)}
                    </Group>
                </Group>
            </Stack>
        </Group>

    );
}