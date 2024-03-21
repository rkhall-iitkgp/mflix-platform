'use client';

import { Group, Stack, Text, Space } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import MovieCard from '@/components/Search/MovieCard';
import MovieBanner from '@/components/Search/MovieBanner';
import Carousel from '@/components/Search/Carousel';
import themeOptions from '@/utils/colors';
import Filter from '@/components/Search/Filter';

interface RecommendedMovies {
    image: string,
    name: string,
    genres: Array<string>,
    imdbRating: string,
    tomatoRating: string,
    info: string,
    favourite: boolean,
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
}));

export default function Search() {
    const { classes } = useStyles();
    const [wrap, setWrap] = useState<boolean | undefined>(false);
    const breakpoint = useMediaQuery('(max-width: 1420px)');

    useEffect(() => {
        setWrap(breakpoint);
    }, [breakpoint]);
    // const nowrap = false;
    // const [results, setResults] = useState();
    const [recommended, setRecommended] = useState<Array<RecommendedMovies>>();
    const getBannerMovie = () => ({
        image: 'https://picsum.photos/1000/3000',
        movieName: 'Movie Name',
        genres: ['horror', 'thriller', 'action'],
        imdbRating: '8.7/10',
        tomatoRating: '97%',
        duration: '2hr 30 min',
        year: '2024',
        country: 'Country',
        redirect: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    });
    const getCardMovie = () => ({
        image: 'https://picsum.photos/1000/3000',
        name: 'Movie Name',
        genres: ['horror', 'thriller', 'action'],
        imdbRating: '8.7/10',
        tomatoRating: '97%',
        info: 'USA, 2016 - Current',
        favourite: true,
    });
    useEffect(() => {
        const data = Array.from({ length: 15 }).map(() => getCardMovie());
        // here i will fetch recommended and other stuff probably
        setRecommended(data);
    }, []);
    return (
        <Stack c={themeOptions.color.normalTextColor} style={{ paddingLeft: '5%', paddingRight: '5%' }} mt="6rem">
            <div className={classes.bg}></div>
            <Filter />
            <Space h="xs" />
            {/* top results part, needs more work */}
            <Stack>
                <Text fw={600} fz={themeOptions.fontSize.l}>
                    Top results for : {' '}
                    <Text span inherit c={themeOptions.color.textColorNormal}>Name</Text>
                </Text>
                <Stack justify="space-evenly" style={{ rowGap: '2rem' }}>
                    <Group style={{ rowGap: '30px' }} grow gap="8%" preventGrowOverflow={false} wrap={wrap ? 'wrap' : 'nowrap'}>
                        <MovieBanner {...(getBannerMovie())} />
                        <MovieBanner {...(getBannerMovie())} />
                    </Group>
                    <Group style={{ rowGap: '30px' }} grow gap="8%" preventGrowOverflow={false} wrap={wrap ? 'wrap' : 'nowrap'}>
                        <MovieBanner {...(getBannerMovie())} />
                        <MovieBanner {...(getBannerMovie())} />
                    </Group>
                </Stack>
            </Stack>
            <Space h="lg" />

            {/* more results part */}
            <Stack>
                <Text fw={500} fz={themeOptions.fontSize.l}>More Results</Text>
                <Group
                  justify="flex-start"
                  style={{
                      rowGap: themeOptions.fontSize.xl,
                  }}
                  gap="7%"
                  grow
                  preventGrowOverflow={false}
                >
                    {Array.from({ length: 20 }, (_, index) => (
                        <MovieCard
                          key={index}
                          {...(getCardMovie())}
                        />
                    ))}
                </Group>
            </Stack>
            <Space h="lg" />

            {/* Carousel Part */}
            <Stack>
                <Text fw={500} fz={themeOptions.fontSize.l}>
                    Recommendations Based on Search Results
                </Text>
                <Carousel>
                    {recommended?.map((data, index) => <MovieCard key={index} {...data} />)}
                </Carousel>
            </Stack>
            <Space h="lg" />
        </Stack>
    );
}
