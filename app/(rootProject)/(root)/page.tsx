'use client';

import React, { useEffect, useState } from 'react';
import { Center, Loader, Text, Group, Stack } from '@mantine/core';
import Image from 'next/image';
import Trending from './components/Trending';
import HeroSection from '@/app/(rootProject)/(root)/components/HeroSection'
import MyListIcon from '@/assets/icons/my-list.svg';
import AwardIcon from '@/assets/icons/award.svg';
import ListMovies from '@/components/ListMovies';
import Section from './components/Section';
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';
import useLoginStore from '@/Stores/LoginStore';
import useUserStore from '@/Stores/UserStore';
import Carousel from '@/components/Search/Carousel';
import { MovieCard, MovieCardSpace } from '@/components/Search/MovieCard';
import searchMsApiUrls from '@/app/api/searchMsApi';
import { IoTrendingUp } from "react-icons/io5";

export default function Home() {
  const newState = useUserStore.getState();
  console.log("newState:" , newState);
    const useStyle = createStyles(() => ({
        background: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundColor: themeOptions.color.background,
        },
        backgroundOverlay: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundColor: 'linear-gradient(45, #580099 40%, #00664A 60%, #580099 100%)',
        },
    }));
    const { classes } = useStyle();
    const [Award, setAward] = useState<any[]>([]);
    const [MyList, setMyList] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userLoggedIn = checkLoginStatus();
        setIsLoggedIn(userLoggedIn);

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/movies/awards', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
                const newdata = data.results.filter((item: any) => item.awards.wins > 0);
                console.log('newdata', newdata);
                const newdatawithawards = newdata.map((item: any) => {
                    return {
                        ...item,
                        award: item.awards.wins,
                        text: item.awards.text,
                    };
                });
                console.log('newdatawithawards', newdatawithawards);
                const sortedData = newdatawithawards.sort((a: any, b: any) => a.award - b.award);
                console.log('sortedData', sortedData);

                setAward(sortedData);
            });

        return () => { };
    }, []);

    const checkLoginStatus = () => {
        const user = localStorage.getItem('user');
        if (user) return true;
        return false;
    };
    const [trending, setTrending] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(0);
    const [hasNext, setHasNext] = useState(true);

    const nextPage = () => {
        if (hasNext) setPage(page + 1);
        console.log(page);
    }

    useEffect(() => {
        if (page >= 2) getData(page);
    }, [page]);

    const getData = async (page: number) => {
        const res = await (await fetch(
            `${searchMsApiUrls()}search/fuzzy?query=&start=2015&end=2016&low=8&high=10&language=&country=&genre=&type=&page=${page}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )).json();
        setTrending(trending.concat(res.results));
        if (!res.hasNext) setHasNext(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await (await fetch(
                `${searchMsApiUrls()}search/fuzzy?query=&start=2015&end=2023&low=8&high=10&language=&country=&genre=&type=&page=1`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )).json();
            setTrending(res.results);
            setPage(1)
        }
        fetchData()
    }, [])

    return (
        <>
            <HeroSection />
            {/* <ListMovies /> */}
            <div>
                <div className={classes.background}></div>
                <div className={classes.backgroundOverlay}></div>
                <Stack c={themeOptions.color.normalTextColor} style={{ paddingLeft: '5%', paddingRight: '5%' }} mt="6rem">

                    <Group>
                        <Text fz={themeOptions.fontSize.xl}>Trending</Text>
                        <IoTrendingUp color={themeOptions.color.textColorNormal} size={60} />
                    </Group>
                    {trending.length ?
                        <Carousel nextPage={nextPage}>
                            {trending.map((data, index) => <MovieCard key={index} {...data} />)}
                            {hasNext ?
                                <MovieCardSpace>
                                    <Center h="100%">
                                        <Loader color="gray" type="dots" size={100} />
                                    </Center>
                                </MovieCardSpace>
                                :
                                null
                            }
                        </Carousel>
                        :
                        null
                    }
                    <Group>
                        <Text fz={themeOptions.fontSize.xl}>Award Winning Films</Text>
                        <Image src={AwardIcon} alt="icon" />
                    </Group>
                    {Award.length ?
                        <Carousel>
                            {Award.map((data, index) => <MovieCard key={index} {...data} />)}
                        </Carousel>
                        :
                        null
                    }
                </Stack>
                {isLoggedIn && <Section title={'My List'} image={MyListIcon} movieData={MyList || []} />}
            </div>
        </>
    );
}
