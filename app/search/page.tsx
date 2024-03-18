import { Group, Stack, Text } from '@mantine/core';
import MovieCard from '../../components/Search/MovieCard';
import MovieBanner from '@/components/Search/MovieBanner';
import themeOptions from '@/utils/colors';

export default function Search() {
    return (
        <Stack c={themeOptions.color.normalTextColor} bg={themeOptions.color.background} style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
            {/* top results part, needs more work */}
            <Stack>
                <Text fw={600} fz={themeOptions.fontSize.l}>
                    Top results for : {' '}
                    <Text span inherit c={themeOptions.color.textColorNormal}>Name</Text>
                </Text>
                <Stack justify="space-evenly" style={{ rowGap: '2rem' }}>
                    <Group style={{ rowGap: '30px' }} grow gap="5rem" preventGrowOverflow={false}>
                        <MovieBanner />
                        <MovieBanner />
                    </Group>
                    <Group style={{ rowGap: '30px' }} grow gap="5rem" preventGrowOverflow={false}>
                        <MovieBanner />
                        <MovieBanner />
                    </Group>
                </Stack>
            </Stack>

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
