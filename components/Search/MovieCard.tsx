import { Card, Image, Text, Group, AspectRatio } from '@mantine/core';
import NextImage from 'next/image';
import { IoHeartCircle } from "react-icons/io5";
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
}

const MovieCard: React.FC<MovieCardProps> = ({
    image,
    name,
    genres,
    tomatoRating,
    imdbRating,
    info,
}) => (
        <Card p={0} radius={0} bg="transparent" w={250} maw="20rem" c={themeOptions.color.normalTextColor}>
            <IoHeartCircle />
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
        </Card>
    );

export default MovieCard;
