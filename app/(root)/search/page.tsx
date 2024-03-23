'use client';

'use client';

import { Group, Stack, Text, Space } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MovieCard, MovieCardSpace } from '@/components/Search/MovieCard';
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
    const searchParams = useSearchParams();
    const search = searchParams.get('q');
    const { classes } = useStyles();
    const [elementsPerRow, setElementsPerRow] = useState<number>(4);
    const [justify, setJustify] = useState<'space-between' | 'space-evenly'>('space-between');

    const [recommended, setRecommended] = useState<Array<RecommendedMovies>>();

    const makeGroup = (arr: Array<any>, n: number) =>
        arr.length % n === 0 ? arr : arr.concat(Array(n - (arr.length % n)).fill(null));

    const getBannerMovie = () => ({
        image: 'https://picsum.photos/500/1000',
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
        image: 'https://picsum.photos/500/1000',
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

    return (
        <Stack c={themeOptions.color.normalTextColor} style={{ paddingLeft: '5%', paddingRight: '5%' }} mt="6rem">
            <div className={classes.bg}></div>
            <Filter />
            {/* top results part, needs more work */}
            <Stack>
                <Text fw={600} fz={themeOptions.fontSize.xl}>
                    Top results for : {' '}
                    <Text span inherit c={themeOptions.color.textColorNormal}>{ search }</Text>
                </Text>
                <Stack justify="space-evenly" style={{ rowGap: '2rem' }}>
                    <Group style={{ rowGap: '30px' }} grow gap="8%" preventGrowOverflow={false}>
                        <MovieBanner {...(getBannerMovie())} />
                        <MovieBanner {...(getBannerMovie())} />
                    </Group>
                    <Group style={{ rowGap: '30px' }} grow gap="8%" preventGrowOverflow={false}>
                        <MovieBanner {...(getBannerMovie())} />
                        <MovieBanner {...(getBannerMovie())} />
                    </Group>
                </Stack>
            </Stack>
            <Space h="lg" />

            {/* more results part */}
            <Stack>
                <Text fw={500} fz={themeOptions.fontSize.xl}>More Results</Text>
                <Group
                  justify={justify}
                  style={{
                      rowGap: themeOptions.fontSize.xl,
                  }}
                  gap="2%"
                >
                    {makeGroup(Array.from({ length: 20 }, (_, index) => getCardMovie()), elementsPerRow).map((data, index) => (
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
            <Stack>
                <Text fw={500} fz={themeOptions.fontSize.xl}>
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
