'use client';

import { useState } from 'react';
import { Group, Button, Image, Stack, Text, Paper, Flex, Skeleton } from '@mantine/core';
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
    redirect: string;
}

const Loader: React.FC = () => (
    <Stack ml="6%" gap="xs" mr="lg" w="80%">
        <Skeleton width="50%" height={40} mt={9.5} radius="xl" />
        <Group gap="6%" w="85%">
            {[1.2, 0.8, 1].map((e, index) => <Skeleton key={index} height={34.8} width={`${e * 25}%`} radius={13} />)}
        </Group>
        <Group mt={5} justify="space-between" gap={themeOptions.fontSize.md} style={{ rowGap: '10px' }}>
            {[1.75, 1, 1.8, 2, 1.5].map((e, index) => <Skeleton key={index} height={18.5} width={`${e * 10}%`} radius="xl" />)}
        </Group>
    </Stack>
);

const MovieBanner: React.FC<MovieBannerProps> = ({
    image,
    movieName,
    genres,
    imdbRating,
    tomatoRating,
    duration,
    year,
    country,
    redirect,
}) => {
    const [loading, setLoading] = useState(true);

    return (
        <Group p={0} styles={{ root: { maxWidth: '80%', borderRadius: '5rem', boxShadow: '14px 11px 6.699999809265137px 2px rgba(0, 0, 0, 0.47)' } }}>
            <Stack
                styles={{
                    root: {
                        width: '100%',
                        borderRadius: '20px',
                        boxShadow: '2px 5px 8px 2px rgba(50, 41, 54, 0.87) inset',
                        background: 'linear-gradient(0deg, rgba(112, 17, 182, 0.05), rgba(112, 17, 182, 0.05)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)',
                    },
                }}
                pt="xl"
                pl="5%"
                pr="5%"
                gap={0}
            >
                <Flex>
                    <Skeleton visible={loading} width={107} height={158} radius={0} p={0}>
                        <NextImage
                            src={image}
                            height={158}
                            width={107}
                            priority
                            alt="sample"
                            onLoad={() => setLoading(false)}
                            style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                        />
                    </Skeleton>
                    {loading ?
                        <Loader />
                        :
                        <Stack ml="6%" gap="xs" mr="lg">
                            <Text fz={themeOptions.fontSize.l}>{movieName}</Text>
                            <Group gap="6%" w="90%" grow preventGrowOverflow={false}>
                                {genres.map((e, i) =>
                                    <Paper
                                        key={i}
                                        bg={themeOptions.color.button}
                                        fz={themeOptions.fontSize.s}
                                        pt={5}
                                        pb={5}
                                        radius={13}
                                    >
                                        <Text ta="center">{e}</Text>
                                    </Paper>)}
                            </Group>
                            <Group mt={7} justify="space-between" style={{ rowGap: '10px' }} grow preventGrowOverflow={false}>
                                <Group gap={themeOptions.fontSize.xs}>
                                    <Image
                                        src={ImdbImg}
                                        component={NextImage}
                                        alt="imdb"
                                        h={17}
                                        unoptimized
                                    />
                                    <Text fz={themeOptions.fontSize.xs}>{imdbRating}</Text>
                                </Group>
                                <Group gap={themeOptions.fontSize.xs}>
                                    <Image
                                        src={TomatoImg}
                                        component={NextImage}
                                        alt="tomato"
                                        h={17}
                                        unoptimized
                                    />
                                    <Text fz={themeOptions.fontSize.xs}>{tomatoRating}</Text>
                                </Group>
                                <Group gap={themeOptions.fontSize.xs}>
                                    <FaRegHourglass size={17} />
                                    <Text fz={themeOptions.fontSize.xs}>{duration}</Text>
                                </Group>
                                <Group gap={themeOptions.fontSize.xs}>
                                    <PiCalendar size={17} />
                                    <Text fz={themeOptions.fontSize.xs}>{year}</Text>
                                </Group>

                            </Group>
                        </Stack>
                    }
                </Flex>
                <Text
                    ta="right"
                    w="100%"
                    styles={{
                        root: {
                            position: 'relative',
                            top: '-1rem',
                            marginTop: '10px'
                        },
                    }}
                >
                    <Button
                        fz={themeOptions.fontSize.s}
                        c={themeOptions.color.textColorNormal}
                        component="a"
                        href={redirect}
                        variant="transparent"
                        rightSection={<IoIosArrowForward size={14} />}
                        p={0}

                    >
                        View More
                    </Button>
                </Text>
            </Stack>
        </Group>
    );
};

export default MovieBanner;
