'use client';

import { useState } from 'react';
import { Group, Button, Image, Stack, Text, Paper, Flex, Skeleton } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { GrLocation } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage, { StaticImageData } from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import themeOptions from '@/utils/colors';

interface MovieProps {
    _id: string;
    genres: Array<string>;
    runtime: number;
    poster: string;
    title: string;
    released: string;
    imdb: any;
    tomatoes: any;
    countries: Array<string>;
    score: number;
}

const Loader: React.FC = () => (
  <Stack ml="6%" gap="xs" mr="lg" w="80%">
    <Skeleton width="50%" height={40} mt={9.5} radius="xl" />
    <Group gap="6%" w="85%">
      {[1.2, 0.8, 1].map((e, index) => (
        <Skeleton key={index} height={34.8} width={`${e * 25}%`} radius={13} />
      ))}
    </Group>
    <Group mt={5} justify="space-between" gap={themeOptions.fontSize.md} style={{ rowGap: '10px' }}>
      {[1.75, 1, 1.8, 2, 1.5].map((e, index) => (
        <Skeleton key={index} height={18.5} width={`${e * 10}%`} radius="xl" />
      ))}
    </Group>
  </Stack>
);

const MovieBanner: React.FC<MovieProps> = (props) => {
    const {
        _id,
        genres,
        runtime,
        poster,
        title,
        released,
        imdb,
        tomatoes,
        countries,
    } = props;
    const [loading, setLoading] = useState(true);
    const [src, setSrc] = useState<string | StaticImageData>(poster);
    const { hovered, ref } = useHover();

    const format = (time: number) => {
        const hrs = Math.floor(time / 60);
        const mins = time % 60;
        return (hrs && hrs + ` hr${hrs === 1 ? '' : 's'}`) + ' ' + (mins && mins + ` min${mins === 1 ? '' : 's'}`);
    }

    return (
        <Group
          p={0}
          ref={ref}
          styles={{
            root: {
                minWidth: '600px',
                borderRadius: '20px',
                transition: 'all 0.5s',
                transform: hovered ? 'scale(1.02)' : 'scale(1)',
                boxShadow: hovered ? '0 0 10px 0 rgba(256, 256, 256, 0.2)' : '14px 11px 6.699999809265137px 2px rgba(0, 0, 0, 0.47)',
            }
          }}
        >
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
                          src={src || noImage}
                          height={158}
                          width={107}
                          priority
                          alt="sample"
                          onLoad={() => setLoading(false)}
                          onError={() => setSrc(noImage)}
                          style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                          />
                    </Skeleton>
                    {loading ?
                    <Loader />
                    :
                    <Stack ml="3vw" gap="xs" mr="lg">
                        <Text fz={themeOptions.fontSize.l} w="25vw">{title}</Text>
                        <Group gap="6%" w="90%" grow preventGrowOverflow={false}>
                            {genres?.map((e, i) =>
                                <Paper
                                  key={i}
                                  bg={themeOptions.color.button}
                                  fz={themeOptions.fontSize.s}
                                  pt={5}
                                  pb={5}
                                  radius={13}
                                  maw={200}
                                >
                                    <Text ta="center">{e}</Text>
                                </Paper>)}
                        </Group>
                        <Group mt={7} justify="space-between" gap={themeOptions.fontSize.l} style={{ rowGap: '10px' }} grow preventGrowOverflow={false}>
                            <Group gap={themeOptions.fontSize.xs}>
                                <Image
                                  src={ImdbImg}
                                  component={NextImage}
                                  alt="imdb"
                                  h={17}
                                  unoptimized
                                />
                                <Text fz={themeOptions.fontSize.xs}>{imdb.rating} / 10</Text>
                            </Group>
                            <Group gap={themeOptions.fontSize.xs}>
                                <Image
                                  src={TomatoImg}
                                  component={NextImage}
                                  alt="tomato"
                                  h={17}
                                  unoptimized
                                />
                                <Text fz={themeOptions.fontSize.xs}>
                                    {tomatoes?.viewer?.meter ? tomatoes?.viewer?.meter : 75}%
                                </Text>
                            </Group>
                            <Group gap={themeOptions.fontSize.xs}>
                                <FaRegHourglass size={17} />
                                <Text fz={themeOptions.fontSize.xs}>{format(runtime)}</Text>
                            </Group>
                            <Group gap={themeOptions.fontSize.xs}>
                                <PiCalendar size={17} />
                                <Text fz={themeOptions.fontSize.xs}>{released ? released.substr(0, 4) : 2011}</Text>
                            </Group>
                            <Group gap={themeOptions.fontSize.xs} style={{ maxWidth: 'max-content' }}>
                                <GrLocation size={17} />
                                <Text fz={themeOptions.fontSize.xs}>{countries[0]}</Text>
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
                        href={`/movies/${_id}`}
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
