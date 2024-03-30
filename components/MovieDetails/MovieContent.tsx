"use client"

import { Group, Image, Stack,Flex,Container,Checkbox , UnstyledButton,Text,Skeleton} from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import { FaPlus } from 'react-icons/fa';
import searchMsApiUrls from '@/app/(rootProject)/api/searchMsApi';
import themeOptions from '@/utils/colors';
// import Sample from '@/assets/sample.png';
import { createStyles } from '@mantine/styles';
import { useState ,useEffect } from 'react';
import { IconBoxMargin } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { watch } from 'fs';
import useLoginStore from '@/Stores/LoginStore';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
import { relative } from 'path';


//{url}/movies/573a1391f29313caabcd6d40
export default function MovieContent({movieData}) {
    // console.log(movieData);
    const id = movieData?._id;
    const state = useLoginStore.getState();
    const user_id = state.userProfiles[0]._id
    const url = searchMsApiUrls();
    const [checked, setChecked] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 1200px)');
    const isSmallerScreen = useMediaQuery('(max-width:1000px)');
    const [watchList,setWatchList] = useState("Add to Watchlist");
    const [isFavourite,setIsFavourite] = useState(false);

    useEffect(() => {
        if (checked) addToWatchList();
        else removeFromWatchList();
    }, [checked]);

    useEffect(()=>{
        if(isFavourite) addToFavourites();
        else removeFromFavourites();
    },[isFavourite])

    const addToWatchList = async () => {
        try {
            const response = await fetch(`${url}/user/watchlist/${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movie: id })
            });

            if (response.ok) {
                console.log('Movie added to watchlist successfully');
            } else {
                console.error('Failed to add movie to watchlist');
            }
        } catch (error) {
            console.error('Error occurred while adding movie to watchlist:', error);
        }
    };

    const removeFromWatchList = async () => {
        try {
            const response = await fetch(`${url}/user/watchlist/${user_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movie: id })
            });

            if (response.ok) {
                console.log('Movie removed from watchlist successfully');
            } else {
                console.error('Failed to remove movie from watchlist');
            }
        } catch (error) {
            console.error('Error occurred while removing movie from watchlist:', error);
        }
    };

    const addToFavourites = async() =>{
        try{
            const response = await fetch(`${url}/user/favourites/${user_id}`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({movie:id})
            })

            if(response.ok) console.log('Movie added to favourites successfully');
            else console.error('Failed to add movie to favourites');
        }
        catch(error){
            console.error('Error occurred while adding movie to Favourites:', error);
        }
    }

    const removeFromFavourites = async() =>{
       try{
            const response = await fetch(`${url}/user/favourites/${user_id}`,{
                method:'DELETE',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({movie:id})
            })

            if(response.ok) console.log('Movie removed from favourites successfully');
            else console.error('Failed to remove movie from favourites');
       }
       catch(error){
            console.log('Error occured when deleting movie from favourites:' ,error);
       } 
    }

    

    const styles = createStyles(() => ({
        detailsContainer:{
            margin:'5rem 0',
            padding:'0 1rem',
            zIndex:1
        },
        imageContainer:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        image:{
            width: isSmallScreen ? '100%' : '80%',
            minWidth:'10rem',
            textAlign:'center',
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
            minWidth:'6rem',
            padding:'0 1.25rem',
            margin:'0.25rem 1rem 0 0',
            borderRadius:10,
            color:themeOptions.color.divider,
            fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md ,
            backgroundColor:themeOptions.color.button,
        },
        otherDetailsContainer:{
            flex:'wrap',
            width:'fit-content',
        },
        details:{
            margin:'0 1rem 0 0',
            minWidth:'2.5rem'
        },
        detailsText:{
            color:themeOptions.color.divider,
            fontSize:themeOptions.fontSize.s,
        },
        plot:{
            fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md,
            color:themeOptions.color.divider
        },
        creatersContainer:{
            width: isSmallScreen ? '11.5rem': '16.5rem',
            backgroundColor:"rgba(217,217,217,0.4)",
            color:themeOptions.color.divider,
            padding:'0.5rem 0 0.8rem 2rem',
            margin:'0 2.5rem 0 5rem',
            borderRadius:10,
        },
        
        //Watch List button
        buttonContainer:{
            backgroundColor:checked? themeOptions.color.button:themeOptions.color.divider,
            width:'fit-content',
            padding:'0.75rem 1rem',
            cursor:'pointer',
            borderRadius:10,
            margin:'0 0.5rem 0 0',
            border: `0.15rem solid ${themeOptions.color.button}`
        },
        checkbox:{
            cursorType: 'pointer',
            '& +span':{
                fontSize: isSmallScreen ? '1rem' : '1.25rem',
                fontWeight:500,
                color: checked? themeOptions.color.divider: themeOptions.color.button,
                margin:'0 0.5rem',
            },
            '& .mantine-checkbox-inner': {
                border:`1px solid ${themeOptions.color.button}`,
            },
            
        },
        checkboxChecked: {
            backgroundColor: checked ? themeOptions.color.button : themeOptions.color.divider,
        },
        fullHeart:{
            fontSize:  isSmallScreen ? themeOptions.fontSize.md : themeOptions.fontSize.l,
            color: isFavourite ? themeOptions.color.button : '#828282',
            margin:' 0rem 2rem', 
        }
    }))
    const { classes } = styles();
    return (
        <Flex className={classes.detailsContainer} align='center' justify='space-evenly' direction={isSmallerScreen ? 'column' : 'row'}>
            <div className={classes.imageContainer}>
                    <NextImage
                        src={movieData?.poster}
                        width={1000}
                        height={300}
                        className={classes.image}
                        alt="sample"
                    />
            </div>
            <Group >
                <Flex justify='center' align='center'>
                    <Container>
                        <div style={{display:'flex',alignItems:'baseline',position: 'relative',width:'fit-content'}}>
                            <h1 className={classes.movieTitle}>{movieData?.title}</h1>
                            <FaHeart className={classes.fullHeart} onClick={() => setIsFavourite(!isFavourite)}/>
                        </div>
                        <Flex className={classes.genreContainer}>
                            {movieData?.genres?.map((genre, i) =>  <p className={classes.genre}>{genre}</p>)}
                        </Flex>
                        <Flex className={classes.otherDetailsContainer} justify='flex-start'>
                            <Flex className={classes.details} align='center' gap={4}>
                                <Image src={ImdbImg} component={NextImage} alt="imdb" height={17} unoptimized />
                                <p className={classes.detailsText}>{movieData?.imdb?.rating}/10</p>
                            </Flex>
                            <Flex className={classes.details} align='center' gap={4}>
                                <Image src={TomatoImg} component={NextImage} alt="imdb" height={17} unoptimized />
                                <p className={classes.detailsText}>{movieData?.tomatoes?.viewer?.rating}/5</p>
                            </Flex>
                            <Flex className={classes.details} align='center' gap={4}>
                                <FaRegHourglass color='white' fontSize={20}/>
                                <p className={classes.detailsText}>{movieData?.runtime}min</p>
                            </Flex>
                            <Flex className={classes.details} align='center' gap={4}>
                                <PiCalendar color='white' fontSize={25}/>
                                <p className={classes.detailsText}>{movieData?.year}</p>
                            </Flex>
                            <Flex className={classes.details} align='center' gap={4}>
                                <GrLocation color='white' fontSize={30}/>
                                <p className={classes.detailsText}>{movieData?.countries}</p>
                            </Flex>
                            {movieData.tier!= "Free" ? <Flex className={classes.details} align='center' gap={4}>
                                <FaCrown color='white' fontSize={30}/>
                                <p className={classes.detailsText}>{movieData?.tier}</p>
                            </Flex> : <></>}
                        </Flex>
                        <Stack>
                            <p className={classes.plot}>{movieData?.fullplot}</p>
                                <Flex align='center' justify='space-around' onClick = {()=> setChecked(!checked)} className={`${classes.buttonContainer} ${checked ? classes.checkboxChecked : ''}`}>
                                    <Checkbox
                                        className={classes.checkbox}
                                        color='#00664A'
                                        mt="l"
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                        radius="m"
                                    />
                                    <span>Watch List</span>
                                </Flex>
                        </Stack>
                    </Container>
                    <Stack justify="flex-start" gap="s">
                        {!movieData.directors || movieData.directors.length === 0 ? <></> : <Stack className={classes.creatersContainer} justify="flex-start" gap="xs">
                            <p style={{fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md, margin:'0 2px',fontWeight:'500'}}> Directors </p>   
                            {movieData.directors?.map((e, i) => <p style={{margin:'0',fontSize: isSmallScreen ? themeOptions.fontSize.xs : themeOptions.fontSize.s}}>{e}</p>)}
                        </Stack>}
                        {!movieData.writers|| movieData.writers.length === 0 ? <></> : <Stack className={classes.creatersContainer} justify="flex-start" gap="xs">
                            <p style={{fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md, margin:'0 2px',fontWeight:'500'}}> Writers </p>   
                            {movieData.writers?.map((e, i) => <p style={{margin:'0',fontSize: isSmallScreen ? themeOptions.fontSize.xs : themeOptions.fontSize.s}}>{e}</p>)}
                        </Stack>}
                        {!movieData.cast|| movieData.cast.length === 0 ? <></> : <Stack className={classes.creatersContainer} justify="flex-start" gap="xs">
                            <p style={{fontSize: isSmallScreen ? themeOptions.fontSize.s : themeOptions.fontSize.md, margin:'0 2px',fontWeight:'500'}}> Cast </p>   
                            {movieData.cast?.map((e, i) => <p style={{margin:'0',fontSize: isSmallScreen ? themeOptions.fontSize.xs : themeOptions.fontSize.s}}>{e}</p>)}
                        </Stack>}
                    </Stack>
                </Flex>
            </Group>
        </Flex>

    );
}