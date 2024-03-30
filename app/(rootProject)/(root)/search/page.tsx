'use client';

import { Group, Stack, Text, Space, Loader, Center, Skeleton, List, Textarea, Button, UnstyledButton } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MovieCardSpace, MovieCard } from '@/components/Search/MovieCard';
// import MovieCard from '../components/MovieCard'
import NotFound from '@/components/Search/NotFound';
import MovieBanner, { MovieBannerSkeleton } from '@/components/Search/MovieBanner';
import Carousel from '@/components/Search/Carousel';
import themeOptions from '@/utils/colors';
import Filter from '@/components/Search/Filter';
import searchMsApiUrls from '@/app/api/searchMsApi';
import noImage from '@/assets/images/no-image.jpg';
import { useMediaQuery } from '@mantine/hooks';
import useLoginStore from '@/Stores/LoginStore';

interface MovieProps {
    _id: string;
    genres: Array<string>;
    runtime: number;
    poster: string;
    title: string;
    released: string;
    imdb: Object;
    tomatoes: Object;
    countries: Array<string>;
    score: number;
    tier: string;
}

const useStyles = createStyles(() => ({
    bg: {
        backgroundColor: themeOptions.color.background,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: -30,
        overflow: 'hidden',
    },
    moviecard: {
        marginBottom: '20px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)', // Adjust as needed
        },
    }
}));

const dummyCardMovie = () => ({
    _id: 'ABCDEF123456',
    genres: ['horror', 'thriller', 'action'],
    runtime: 85,
    poster: '',
    title: 'Movie',
    released: '"2010-03-10T00:00:00.000Z',
    countries: ['USA'],
    score: 2,
    imdb: {
        rating: 10,
    },
    tomatoes: {
        viewer: {
            rating: 4
        }
    },
    tier: "Free",
});

const initDetails = (n: number) =>
    Array.from({ length: n }).map(() => dummyCardMovie());

export default function Search() {
    const searchParams = useSearchParams();
    const search = searchParams.get('query');
    const { classes } = useStyles();
    const [elementsPerRow, setElementsPerRow] = useState<number>(4);
    const [justify, setJustify] = useState<'space-between' | 'space-evenly'>('space-between');
    const single = useMediaQuery('(max-width: 1520px)')

    const [recommended, setRecommended] = useState<Array<MovieProps>>([]);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [topRes, setTopRes] = useState<Array<MovieProps>>(initDetails(4));
    const [moreResults, setMoreResults] = useState<Array<MovieProps>>([]);
    const [page, setPage] = useState<number>(1);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState(true);
    const [filters, setFilters] = useState<any>({});
    const nextPage = () => {
        if (hasNext) setPage(page+1);
        console.log(page);
    }

    useEffect(() => {
        if (page >= 2) getData(page);
    }, [page]);

    useEffect(() => {
        if (!notFound) setLoaded(false);
    }, [notFound])
    
    useEffect(() => {
        if (searchParams.get("genre")) {
            fetchData(search!, {
                genres: [searchParams.get("genre")!.charAt(0).toUpperCase() + searchParams.get("genre")!.slice(1)],
            });
        }
        else if (searchParams.get("language")) {
            fetchData(search!, {
                languages: [searchParams.get("language")!.charAt(0).toUpperCase() + searchParams.get("language")!.slice(1)],
            });
        }
    }, [searchParams])

    const getData = async (page: number) => {
        const res = await (await fetch(
            `${searchMsApiUrls()}search/${search.trim().split(' ').length >= 5 ? 'semantic' : 'fuzzy'}?query=${search}&page=${page}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    userId: useLoginStore.getState()._id,
                    filters
                }),
            }
        )).json();
        const data = res.results;
        setRecommended(recommended.concat(data));
        if (!res.hasNext) setHasNext(false);
    };

    // const getFavourite = () => false;
    const makeGroup = (arr: Array<any>, n: number) =>
        arr.length % n === 0 ? arr : arr.concat(Array(n - (arr.length % n)).fill(null));

    const fetchData = async (search: string, filters: any = {}) => {
        setFilters(filters);
        const data: Array<MovieProps> = [];
        for (let page = 0; page < 2; page++) {
            const res = await (await fetch(
                `${searchMsApiUrls()}search/${search.trim().split(' ').length >= 5 ? 'semantic' : 'fuzzy'}?query=${search}&page=${page + 1}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        userId: '660076dfcc09ff618602257f',
                        filters
                    }),
                }
            )).json();
            if (!res.results) return setNotFound(true);
            data.push(...res.results);
            if (!res.hasNext) break;
        }
        setNotFound(false);
        console.log("data", data);
        if (data.length <= 4) {
            setTopRes(data)
            setRecommended([]);
            setMoreResults([]);
        }
        else {
            setTopRes(data.slice(0, 4));
            if (data.length >= 14) {
                setRecommended(data.slice(14));
                setMoreResults(data.slice(4, 14));
            } else {
                setRecommended([]);
                setMoreResults(data.slice(4));
            }
        }
        console.log('here');
        setLoaded(true);
        console.log(loaded);
    };

    useEffect(() => {
        if (!search) return;
        console.log(search.trim().split(' ').length >= 5 ? 'semantic' : 'fuzzy');
        const fetchData = async () => {
            const data: Array<MovieProps> = [];
            for (let index = 0; index < 2; index++) {
                const res = await (await fetch(
                    `${searchMsApiUrls()}search/${search.trim().split(' ').length >= 5 ? 'semantic' : 'fuzzy'}?query=${search}&page=${index + 1}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                          },
                        body: JSON.stringify({
                            userId: '660076dfcc09ff618602257f',
                        }),
                    }
                )).json();
                if (!res.results) return setNotFound(true);
                data.push(...res.results);
                setPage(index + 1)
                if (!res.hasNext) break;
            }
            if (data.length <= 4) {
                setTopRes(data)
            }
            else {
                setTopRes(data.slice(0, 4));
                if (data.length >= 14) {
                    setRecommended(data.slice(14));
                    setMoreResults(data.slice(4, 14));
                } else {
                    setRecommended([]);
                    setMoreResults(data.slice(4));
                }
            }
            setLoaded(true);
        };
        fetchData();
        // const data = Array.from({ length: 10 }).map(() => dummyCardMovie());
        // here i will fetch recommended and other stuff probably
        const handleResize = () => {
            setElementsPerRow(
                window.innerWidth < 868 ? 2 :
                    window.innerWidth < 1182 ? 3 :
                        window.innerWidth < 1510 ? 4 :
                            window.innerWidth < 1852 ? 5 :
                                window.innerWidth < 2210 ? 6 :
                                    7
            );
            setJustify(window.innerWidth < 1182 ? 'space-evenly' : 'space-between');
        };

        handleResize(); //initialcall
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return notFound ?
    <Stack c={themeOptions.color.normalTextColor} style={{ paddingLeft: '5%', paddingRight: '5%' }} mt="6rem">
		<div className={classes.bg}></div>
		<Filter fetchData={fetchData}/>
        <NotFound search={search} />
    </Stack>
    :
    (
        <Stack c={themeOptions.color.normalTextColor} style={{ paddingLeft: '5%', paddingRight: '5%' }} mt="6rem">
            <div className={classes.bg}></div>
            <Filter fetchData={fetchData} />
            {/* top results part, needs more work */}
            <Stack>
                <Text fw={600} fz={themeOptions.fontSize.xl}>
                    Top results for : {' '}
                    <Text span inherit c={themeOptions.color.textColorNormal}>{search}</Text>
                </Text>
                {/* <Skeleton visible={!loaded}> */}
                { loaded ?
                    <Stack justify="space-evenly" style={{ rowGap: '2rem' }}>
                        <Group style={{ rowGap: '30px' }} grow gap="6vw" preventGrowOverflow={false} align="stretch">
                            {topRes.map((e, i) => <MovieBanner key={i} single={single} {...e} />)}
                        </Group>
                    </Stack>
                :
                <Stack justify="space-evenly" style={{ rowGap: '2rem' }}>
                    <Group style={{ rowGap: '30px' }} grow gap="6vw" preventGrowOverflow={false} align="stretch">
                        <MovieBannerSkeleton single={single} />
                        <MovieBannerSkeleton single={single} />
                        <MovieBannerSkeleton single={single} />
                        <MovieBannerSkeleton single={single} />
                    </Group>
                </Stack>
                }
                {/* </Skeleton> */}
            </Stack>
            <Space h="lg" />

            {/* more results part */}
            <Stack>
                <Text fw={500} fz={themeOptions.fontSize.xl}>More Results</Text>
                <Group
                  justify={justify}
                  align="flex-start"
                  style={{
                      rowGap: themeOptions.fontSize.xl,
                  }}
                  gap="1%"
                >
                    {makeGroup(moreResults, elementsPerRow).map((data, index) => (
                        data ?
                        <MovieCard
                          key={index}
                          {...data}
                        />
                        :
                        <MovieCardSpace key={index} />
                    ))}
                </Group>
            </Stack>
            <Space h="lg" />

            {/* Carousel Part */}
            {recommended.length ?
                <>
                    <Stack>
                        <Text fw={500} fz={themeOptions.fontSize.xl}>
                            Recommendations Based on Search Results
                        </Text>
                        <Carousel nextPage={nextPage}>
                            {recommended?.map((data, index) => <MovieCard key={index} {...data} />)}
                            { hasNext ?
                            <MovieCardSpace>
                                <Center h="100%">
                                    <Loader color="gray" type="dots" size={100} />
                                </Center>
                            </MovieCardSpace>
                            :
                            null
                            }
                        </Carousel>
                    </Stack>
                    <Space h="lg" />
                </>
            :
                null
            }
        </Stack>
    );
}