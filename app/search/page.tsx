import { Group, Stack, Text, Space } from '@mantine/core';
import MovieCard from '@/components/Search/MovieCard';
import MovieBanner from '@/components/Search/MovieBanner';
import Carousel from '@/components/Search/Carousel';
import themeOptions from '@/utils/colors';
import Filter from '@/components/Search/Filter';

export default function Search() {
    const getBannerMovie = (randomInput: number) => ({
        image: `https://picsum.photos/1000/${randomInput}`,
        movieName: 'Movie Name',
        genres: ['horror', 'thriller', 'action'],
        imdbRating: '8.7/10',
        tomatoRating: '97%',
        duration: '2hr 30 min',
        year: '2024',
        country: 'Country',
    });
    const getCardMovie = (randomInput: number) => ({
        image: `https://picsum.photos/1000/${randomInput}`,
        name: 'Movie Name',
        genres: ['horror', 'thriller', 'action'],
        imdbRating: '8.7/10',
        tomatoRating: '97%',
        info: 'USA, 2016 - Current',
    });
    return (
        <Stack c={themeOptions.color.normalTextColor} bg={themeOptions.color.background} style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
            <Filter />
            <Space h="xs" />
            {/* top results part, needs more work */}
            <Stack>
                <Text fw={600} fz={themeOptions.fontSize.l}>
                    Top results for : {' '}
                    <Text span inherit c={themeOptions.color.textColorNormal}>Name</Text>
                </Text>
                <Stack justify="space-evenly" style={{ rowGap: '2rem' }}>
                    <Group style={{ rowGap: '30px' }} grow gap="5rem" preventGrowOverflow={false}>
                        <MovieBanner {...(getBannerMovie(Math.floor(Math.random() * 1000)))} />
                        <MovieBanner {...(getBannerMovie(Math.floor(Math.random() * 1000)))} />
                    </Group>
                    <Group style={{ rowGap: '30px' }} grow gap="5rem" preventGrowOverflow={false}>
                        <MovieBanner {...(getBannerMovie(Math.floor(Math.random() * 1000)))} />
                        <MovieBanner {...(getBannerMovie(Math.floor(Math.random() * 1000)))} />
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
                  gap={50}
                  grow
                  preventGrowOverflow={false}
                >
                    {Array.from({ length: 8 }, (_, index) => (
                        <MovieCard
                          key={index}
                          {...(getCardMovie(Math.floor(600 + Math.random() * 1000)))}
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
                    {Array.from({ length: 10 }, (_, index) => (
                        <MovieCard
                          key={index}
                          {...(getCardMovie(Math.floor(600 + Math.random() * 1000)))}
                        />
                    ))}
                </Carousel>
            </Stack>
            <Space h="lg" />

        </Stack>
    );
}
