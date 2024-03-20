import { Group, Button, Image, Stack, Text, Paper, Flex } from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import themeOptions from '@/utils/colors';

interface MovieBannerProps {
    image: string,
    movieName: string;
    country: string;
    genres: Array<string>;
    imdbRating: string;
    tomatoRating: string;
    year: string;
    duration: string;
}

const MovieBanner: React.FC<MovieBannerProps> = ({
    image,
    movieName,
    genres,
    imdbRating,
    tomatoRating,
    duration,
    year,
    country,
}) => (
    <Stack
      styles={{
        root: {
            minWidth: '600px',
            borderRadius: '20px',
            background: 'linear-gradient(0deg, rgba(112, 17, 182, 0.05), rgba(112, 17, 182, 0.05)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)',
        },
      }}
      pt="md"
      pl={themeOptions.fontSize.l}
      pr={themeOptions.fontSize.l}
      gap={0}
    >
        <Flex>
            <div>
                <Image
                  src={image}
                  alt="sample"
                  h={158}
                  w={107}
                />
            </div>
            <Stack ml="lg" gap="xs" mr="lg">
                <Text fz={themeOptions.fontSize.l}>{movieName}</Text>
                <Group gap={themeOptions.fontSize.xs}>
                    {genres.map((e, i) =>
                        <Paper
                          key={i}
                          bg={themeOptions.color.button}
                          fz={themeOptions.fontSize.s}
                          w={116}
                          pt={5}
                          pb={5}
                          radius={13}
                        >
                            <Text ta="center">{e}</Text>
                        </Paper>)}
                </Group>
                <Group mt={7} justify="space-between" gap={themeOptions.fontSize.l} style={{ rowGap: '10px' }} grow preventGrowOverflow={false}>
                    <Group gap={6} justify="space-around">
                        <Image
                          src={ImdbImg}
                          component={NextImage}
                          alt="imdb"
                          h={20}
                          unoptimized
                        />
                        <Text fz={themeOptions.fontSize.xs}>{imdbRating}</Text>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <Image
                          src={TomatoImg}
                          component={NextImage}
                          alt="tomato"
                          h={20}
                          unoptimized
                        />
                        <Text fz={themeOptions.fontSize.xs}>{tomatoRating}</Text>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <FaRegHourglass />
                        <Text fz={themeOptions.fontSize.xs}>{duration}</Text>
                    </Group>
                    <Group gap={6} justify="space-around">
                        <PiCalendar />
                        <Text fz={themeOptions.fontSize.xs}>{year}</Text>
                    </Group>
                    <Group gap={6} justify="space-around" style={{ maxWidth: 'max-content' }}>
                        <GrLocation />
                        <Text fz={themeOptions.fontSize.xs}>{country}</Text>
                    </Group>
                </Group>
            </Stack>
        </Flex>
        <Text
          ta="right"
          w="100%"
          styles={{
              root: {
                  position: 'relative',
                  top: '-1rem',
              },
          }}
        >
            <Button
              fz={themeOptions.fontSize.s}
              c={themeOptions.color.textColorNormal}
              component="a"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              variant="transparent"
              rightSection={<IoIosArrowForward size={14} />}
              p={0}
            >
                View More
            </Button>
        </Text>
    </Stack>
);

export default MovieBanner;
