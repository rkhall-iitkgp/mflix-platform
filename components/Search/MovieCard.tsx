import { useState } from 'react';
import { Card, Image, Text, Group, AspectRatio, ActionIcon, Skeleton } from '@mantine/core';
import NextImage from 'next/image';
import { HiHeart } from 'react-icons/hi';
import themeOptions from '@/utils/colors';
import TomatoImg from '@/assets/icons/tomato.png';
import ImdbImg from '@/assets/icons/imdb.png';

interface MovieCardProps {
    image: string;
    name: string;
    genres: Array<string>;
    tomatoRating: string;
    imdbRating: string;
    info: string;
    favourite?: boolean;
}

const DataLoader: React.FC = () => (
    <>
        <Skeleton radius="xl" width="60%" height={themeOptions.fontSize.xs} mt="xs" mb="xs" />
        <Skeleton radius="xl" width="40%" height={themeOptions.fontSize.s} />
        <Skeleton radius="xl" height={themeOptions.fontSize.xs} mt="xs" mb="xs" />
        <Skeleton radius="xl" width="50%" height={themeOptions.fontSize.xs} />
    </>
);

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
}) => {
    const [loading, setLoading] = useState(true);

    return (
        <Card p={0} radius={0} bg="transparent" w={250} maw="20rem" c={themeOptions.color.normalTextColor}>
            <Skeleton visible={loading} radius={0}>
                <AspectRatio ratio={320 / 500}>
                    <NextImage
                      src={image}
                      height={700}
                      width={600}
                      alt="sample"
                      onLoad={() => setLoading(false)}
                      style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                    />
                </AspectRatio>
            </Skeleton>

            {loading ?
            <DataLoader />
            :
            <>
                <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.dimmed} mt="xs" mb="xs">
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
                          h={17}
                          unoptimized
                        />
                        <Text fz={themeOptions.fontSize.xs}>{imdbRating}</Text>
                    </Group>
                    <Group>
                        <Image
                          src={TomatoImg}
                          component={NextImage}
                          alt="tomato"
                          h={17}
                          unoptimized
                        />
                        <Text fz={themeOptions.fontSize.xs}>{tomatoRating}</Text>
                    </Group>
                </Group>

                <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.dimmed}>
                    {genres.join(', ')}
                </Text>

                <Favourite favourite={favourite} />
            </>}
        </Card>
    );
};

export default MovieCard;
