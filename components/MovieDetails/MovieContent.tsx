import { Group, Image, Stack, Paper, getDefaultZIndex, GridCol} from '@mantine/core';
import { Grid ,Flex,Button} from '@mantine/core';
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
import { IconBoxMargin } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

//{url}/movies/573a1391f29313caabcd6d40
export default function MovieContent({movieData}) {
    console.log(movieData);
    const isSmallScreen = useMediaQuery('(max-width: 1200px)');
    const [watchList,setWatchList] = useState("Add to Watchlist");
    const TogglewatchListStatus = () =>{
        if(watchList === "Add to Watchlist") setWatchList("Added to Watchlist");
        else setWatchList("Add to Watchlist");
    }
    const styles = createStyles(() => ({
        detailsContainer:{
            margin:'5rem 0',
            zIndex:1,
            alignItems:'center'
        },
        imageContainer:{
            textAlign:'center'
        },
        image:{
            width:'85%',
            height:'auto'
        },
        movieTitle:{
            fontSize: isSmallScreen ? themeOptions.fontSize.l : themeOptions.fontSize.xl,
            color:themeOptions.color.divider,
            margin:'0'
        },
        genreContainer:{
            display:'flex',
        },
        genre:{
            textAlign:'center',
            minWidth:'5rem',
            padding:'0 1.25rem',
            margin:'0.25rem 1rem 0 0',
            borderRadius:10,
            color:themeOptions.color.divider,
            fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md ,
            backgroundColor:themeOptions.color.button,
        },
        otherDetailsContainer:{

        },
        details:{
            margin:'0 1rem 0 0',
        },
        detailsText:{
            color:themeOptions.color.divider,
            fontSize:themeOptions.fontSize.s,
        },
        plot:{
            width:'80%',
            fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md,
            color:themeOptions.color.divider
        },
        addToWatchList:{
            width:'fit-content',
            padding:'0',
            color: watchList === "Add to Watchlist" ? themeOptions.color.button : themeOptions.color.divider,
            backgroundColor : watchList === "Add to Watchlist" ? themeOptions.color.divider : themeOptions.color.button,
            borderRadius:'0.7rem',
            transition:'0.3s',
            '&:hover':{
                cursor:'pointer',
            }
        },
        creatersContainer:{
            width:'15em',
            backgroundColor:'rgba(255,255,255,0.25)',
            margin:'0 2.5rem 0 5rem',
            borderRadius:'1rem',
            padding:'0.2rem',
            marginLeft:'-8rem',
            display:'block'
        },
        creators:{
            // padding:'0rem',
            marginTop:'-0.6rem',
            marginLeft:'.5rem',
        },
    }))
    const { classes } = styles();
    return (
        <Grid className={classes.detailsContainer}>
            <Grid.Col span={3} className={classes.imageContainer}>
                <NextImage
                    src={Sample}
                    width = "1000"
                    height = "300"
                    className={classes.image}
                    alt="sample"
                />
            </Grid.Col>
            <Grid.Col span={9}>
                <Flex>
                    <div>
                        <h1 className={classes.movieTitle}>Movie Title</h1>
                        <Flex className={classes.genreContainer}>
                            <p className={classes.genre}>Action</p>
                            <p className={classes.genre}>Adventure</p>
                            <p className={classes.genre}>Thriller</p>
                        </Flex>
                        <Flex className={classes.otherDetailsContainer}>
                            <Group gap={6} justify="space-around" className={classes.details}>
                                <Image src={ImdbImg} component={NextImage} alt="imdb" height={17} unoptimized />
                                <p className={classes.detailsText}>7.5/10</p>
                            </Group>
                            <Group gap={6} justify="space-around" className={classes.details}>
                                <Image src={TomatoImg} component={NextImage} alt="imdb" height={17} unoptimized />
                                <p className={classes.detailsText}>3.5/5</p>
                            </Group>
                            <Group gap={6} justify="space-around" className={classes.details}>
                                <FaRegHourglass color='white' fontSize={20}/>
                                <p className={classes.detailsText}>60 min</p>
                            </Group>
                            <Group gap={6} justify="space-around" className={classes.details}>
                                <PiCalendar color='white' fontSize={20}/>
                                <p className={classes.detailsText}>2026</p>
                            </Group>
                            <Group gap={6} justify="space-around" className={classes.details}>
                                <GrLocation color='white' fontSize={20}/>
                                <p className={classes.detailsText}>USA</p>
                            </Group>
                        </Flex>
                        <p className={classes.plot}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptate? Optio culpa eius repellat corporis, itaque totam animi, facere a vero minus tempore debitis expedita praesentium inventore amet, numquam perferendis necessitatibus nobis voluptas esse? Sed quas beatae laboriosam aspernatur atque. Blanditiis dicta alias, pariatur totam delectus consequuntur eveniet quasi maiores!</p>
                        <Group className={classes.addToWatchList} onClick = {TogglewatchListStatus}>
                            <p style={{fontSize:themeOptions.fontSize.md ,margin:'0'}}>{watchList}</p>
                            <FaPlus/>
                        </Group>
                    </div>
                    <Stack>
                        <div className={classes.creatersContainer}>
                                <p style={{fontSize:themeOptions.fontSize.md, margin:'5px'}}> Director </p>
                                <p className={classes.creators}>Harry</p>
                                <p className={classes.creators}>Harry</p>
                                <p className={classes.creators}>Harry</p>
                                {/* {movieDetails.directors?.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)} */}
                        </div>
                        <div className={classes.creatersContainer}>
                                {/* {!movieDetails.writers || movieDetails.writers.length===0 ? <></> : <>
                                    {movieDetails.writers?.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)} 
                                </>} */}                                    
                                <p style={{fontSize:themeOptions.fontSize.md, margin:'5px'}}> Writers </p>
                                <p className={classes.creators}>Harry</p>
                                <p className={classes.creators}>Harry</p>
                                <p className={classes.creators}>Harry</p>
                        </div>
                        <div className={classes.creatersContainer}>
                                <p style={{fontSize:themeOptions.fontSize.md, margin:'5px'}}> Cast </p>
                                <p className={classes.creators}>Chris Hemsworth</p>
                                <p className={classes.creators}>Robert Downy Jr.</p>
                                <p className={classes.creators}>Chris Pratt</p>
                                {/* {movieDetails.cast?.map((e, i) => <p className={classes.flexboxstyles} style={{fontWeight: "500"}}>{e}</p>)} */}
                        </div>
                    </Stack>
                </Flex>
            </Grid.Col>
        </Grid>

    );
}