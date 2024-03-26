"use client"

import { Group, Button, Image, Stack, Text, Paper } from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import { FaPlus } from 'react-icons/fa';
import themeOptions from '@/utils/colors';
import Sample from '@/assets/sample.png';
import { IoIosArrowForward } from 'react-icons/io';
import { createStyles } from '@mantine/styles';
import SimilarMovies from '@/components/MovieDetails/SimilarMovies';

export default function MovieDetails() {
    const genres = ['Mystery', 'Action', 'Thriller'];
    const director = ['James Cameron'];
    const writer = ['Rick Jaffa'];
    const cast = ['Someone'];

    const styles = createStyles(() => ({
        one: {
            width: '100%',
            height: '100vh',
            border: '1px solid #fff',
            marginTop: '150px',
            background: '#000',
        },
        two: {
            marginTop: "30px",
            paddingLeft: "40px",
        },
        three: {
            width: '7rem',
            paddingTop: '5px',
            paddingBottom: '5px',
        },
        four: {
            width: '500px',
        },
        five: {
            marginTop: "50px",
            border: "1px solid",
            borderRadius: "10px",
            padding: "10px",
            alignItems: "center"
        },
        six: {
            maxWidth: "max-content",
        },
        seven: {
            marginLeft: "70px", marginTop: "200px", color: '#000',
        },
        eight: {
            border: "1px solid #000", borderRadius: "10px", paddingInline: "15px", background: "#000", opacity: "40%",
            color: '#fff'
        }


    }))

    const { classes } = styles();

    return (
        <Stack
            justify="space-between"
            pt="md"
            pb="xs"
            pl={themeOptions.fontSize.l}
            pr={themeOptions.fontSize.l}
            gap={0}
        >
            <Group className={classes.one}>

            </Group>
            <Group align="center">
                <div>
                    <Image
                        src={Sample}
                        component={NextImage}
                        // className={classes.two}
                        style={{ height: "430px", width: "291px", marginTop: "60px", marginLeft: "100px" }}
                        alt="sample"
                    />
                </div>
                <Stack ml="xxl" gap="xs" mr="lg" className={classes.two}>
                    <Text fz={themeOptions.fontSize.xxl}>Movie Name</Text>
                    <Group gap={themeOptions.fontSize.xs}>
                        {genres.map((e, i) =>
                            <Paper
                                key={i}
                                bg={themeOptions.color.smallBox}
                                fz={themeOptions.fontSize.s}
                                radius={13}
                                className={classes.three}
                            >
                                <Text ta="center">{e}</Text>
                            </Paper>)}
                    </Group>
                    <Group mt={7} justify='space-between' className={classes.four}>
                        <Group gap={6} justify="space-around">
                            <Image
                                src={ImdbImg}
                                component={NextImage}
                                alt="imdb"
                                height={20}
                                unoptimized
                            />
                            <Text fz={themeOptions.fontSize.xs}>8.6/10</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <Image
                                src={TomatoImg}
                                component={NextImage}
                                alt="imdb"
                                height={20}
                                unoptimized
                            />
                            <Text fz={themeOptions.fontSize.xs}>97 %</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <FaRegHourglass />
                            <Text fz={themeOptions.fontSize.xs}>2 hr 12 min</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <PiCalendar />
                            <Text fz={themeOptions.fontSize.xs}>2024</Text>
                        </Group>
                        <Group gap={6} justify="space-around" className={classes.six}>
                            <GrLocation />
                            <Text fz={themeOptions.fontSize.xs}>Country</Text>
                        </Group>
                        <Group>
                            <Text fz={themeOptions.fontSize.s} style={{ fontWeight: "600" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eaque provident, corrupti voluptatem, ullam nihil quaerat tenetur itaque libero dignissimos error. Fugit sint voluptates, aut placeat vitae animi eos amet ipsa distinctio neque quidem, nesciunt laborum quasi culpa, qui sapiente hic provident. Ratione perspiciatis ullam corporis voluptatum voluptatibus aperiam reprehenderit.</Text>
                        </Group>
                        <Group c={themeOptions.color.button} className={classes.five}>
                            <Text style={{ color: "#000", fontWeight: '500' }}>Add To WatchList</Text>
                            <FaPlus />
                        </Group>
                    </Group>
                </Stack>
                <Stack className={classes.seven}>
                    <Group className={classes.eight}>
                        <Group display={'block'}>
                            <Text fz={themeOptions.fontSize.md} style={{ marginBottom: "-10px" }}> Director </Text>
                            {director.map((e, i) =>
                                <Paper
                                    style={{ backgroundColor: '#fff' }}
                                    key={i}
                                    fz={themeOptions.fontSize.md}
                                    w={116}
                                    pt={5}
                                    pb={5}
                                    radius={13}

                                >
                                    <Text ta="left">{e}</Text>
                                </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'} />
                    </Group>
                    <Group className={classes.eight}>
                        <Group display={'block'} >
                            <Text fz={themeOptions.fontSize.md} style={{ marginBottom: "-10px" }}> Writers </Text>
                            {writer.map((e, i) =>
                                <Paper
                                    style={{ backgroundColor: '#fff' }}
                                    key={i}
                                    fz={themeOptions.fontSize.md}
                                    w={116}
                                    pt={5}
                                    pb={5}
                                    radius={13}
                                >
                                    <Text ta="left">{e}</Text>
                                </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'} />
                    </Group>
                    <Group className={classes.eight}>
                        <Group display={'block'}>
                            <Text fz={themeOptions.fontSize.md} style={{ marginBottom: "-10px" }}> Cast </Text>
                            {cast.map((e, i) =>
                                <Paper
                                    style={{ backgroundColor: '#fff' }}
                                    key={i}
                                    fz={themeOptions.fontSize.md}
                                    w={116}
                                    pt={5}
                                    pb={5}
                                    radius={13}

                                >
                                    <Text ta="left">{e}</Text>
                                </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'} />
                    </Group>
                </Stack>
            </Group>
            <Stack>
                <SimilarMovies />
            </Stack>
        </Stack>


    );
}