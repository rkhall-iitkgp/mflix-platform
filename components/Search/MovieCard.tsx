'use client';

import { Card, Image, Text, Group, AspectRatio, ActionIcon } from '@mantine/core';
import NextImage from 'next/image';
import { HiHeart } from 'react-icons/hi';
import { useState } from 'react';
import themeOptions from '@/utils/colors';
import TomatoImg from '@/assets/icons/tomato.png';
import ImdbImg from '@/assets/icons/imdb.png';

interface MovieCardProps {
    image: string,
    name: string,
    genres: Array<string>,
    tomatoRating: string,
    imdbRating: string,
    info: string,
    favourite?: boolean
}

const Favourite: React.FC<{ favourite?: boolean }> = ({ favourite }) => {
    const [fav, setFav] = useState(favourite || false);
    const handleClick = () => {
        setFav(!fav);
    };
    return (
    <ActionIcon color="rgba(243, 244, 246, 0.5)" size="lg" radius="xl" pos="absolute" right="5%" top="3%" onClick={handleClick}>
        <HiHeart size="80%" color={fav ? 'red' : 'white'} />
    </ActionIcon>
    );
};

const MovieCard: React.FC<MovieCardProps> = ({
    image,
    name,
    genres,
    tomatoRating,
    imdbRating,
    info,
    favourite,
}) => (
        <Card p={0} radius={0} bg="transparent" w={250} maw="20rem" c={themeOptions.color.normalTextColor}>
            <AspectRatio ratio={320 / 500}>
                <Image
                  src={image}
                  alt="sample" />
            </AspectRatio>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor} mt="xs" mb="xs">
                {info}
            </Text>

            <Text fz={themeOptions.fontSize.s} fw={500}>
                {name}
            </Text>

            <Group justify="space-between" mt="xs" mb="xs">
                <Group justify="space-around">
                    <Image
                      src={ImdbImg}
                      component={NextImage}
                      alt="imdb"
                      h={20}
                      unoptimized />
                    <Text fz={themeOptions.fontSize.xs}>{imdbRating}</Text>
                </Group>
                <Group>
                    <Image
                      src={TomatoImg}
                      component={NextImage}
                      alt="tomato"
                      h={20}
                      unoptimized />
                    <Text fz={themeOptions.fontSize.xs}>{tomatoRating}</Text>
                </Group>
            </Group>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor}>
                {genres.join(', ')}
            </Text>
            <Favourite favourite={favourite} />
        </Card>
    );

export default MovieCard;
