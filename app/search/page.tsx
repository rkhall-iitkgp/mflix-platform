import MovieCard from '../../components/MovieDetails/MovieCard';
import MovieBanner from '@/components/MovieDetails/MovieBanner';
import themeOptions from '@/utils/colors';
import { Group, Button, Image, Stack, Text, Paper } from '@mantine/core';

export default function Search() {
    return (
        <Stack bg="black" pl={75} pr={75}>
            <div>Filters stuf yeeeeeeeeeeeeeeee!!!</div>

            {/* top results part, neds more work */}
            <Stack>
                <Text fz={themeOptions.fontSize.l}>Tope results for : Name</Text>
                {/* <Stack justify="space-evenly">
                    <Group justify="space-between">
                        <MovieBanner />
                        <MovieBanner />
                    </Group>
                    <Group justify="space-between">
                        <MovieBanner />
                        <MovieBanner />
                    </Group>
                </Stack> */}
                <Group justify="space-between">
                    <MovieBanner />
                    <MovieBanner />
                    <MovieBanner />
                    <MovieBanner />
                </Group>
            </Stack>

            {/* more results part */}
            <Stack>
                <Text fz={themeOptions.fontSize.l}>More Results</Text>
                <Group justify="space-between">
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </Group>
            </Stack>
        </Stack>
    );
}
