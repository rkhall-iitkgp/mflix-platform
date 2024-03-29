import { useState } from 'react';
import { Card, Image, Text, Group, AspectRatio, ActionIcon, Skeleton } from '@mantine/core';
import NextImage, { StaticImageData } from 'next/image';
import { HiHeart } from 'react-icons/hi';
import noImage from '@/assets/images/no-image.jpg';
import themeOptions from '@/utils/colors';
import TomatoImg from '@/assets/icons/tomato.png';
import ImdbImg from '@/assets/icons/imdb.png';

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

const DataLoader: React.FC = () => (
    <>
        <Skeleton radius="xl" width="60%" height={18.5} mt="xs" mb="xs" />
        <Skeleton radius="xl" width="40%" height={25} />
        <Skeleton radius="xl" height={18.5} mt="xs" mb="xs" />
        <Skeleton radius="xl" width="50%" height={18.5} />
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

const MovieCardSpace: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <Card p={0} radius={0} bg="transparent" w={250} h={490}>{children}</Card>
);

const MovieCard: React.FC<MovieProps> = (props) => {
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

    return (
        <Card
          p={0}
          radius={0}
          bg="transparent"
          w={250}
          c={themeOptions.color.normalTextColor}
          component="a"
          href={`/movies/${_id}`}
        >
            <Skeleton visible={loading} radius={0}>
                <AspectRatio ratio={250 / 370}>
                    <NextImage
                      src={src|| noImage}
                      height={500}
                      width={320}
                      alt="sample"
                      onLoad={() => setLoading(false)}
                      onError={() => setSrc(noImage)}
                      style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                    />
                </AspectRatio>
            </Skeleton>

            {loading ?
            <DataLoader />
            :
            <>
                <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.dimmed} mt="xs" mb="xs">
                    {countries[0]}, {released ? released.substr(0, 4) : 2011} - Current
                </Text>

                <Text fz={themeOptions.fontSize.s} fw={500}>
                    {title}
                </Text>

                <Group justify="space-between" mt="xs" mb="xs">
                    {tomatoes ?
                        <Group justify="space-around">
                            <Image
                            src={ImdbImg}
                            component={NextImage}
                            alt="imdb"
                            h={17}
                            unoptimized
                            />
                            <Text fz={themeOptions.fontSize.xs}>{imdb.rating} / 10</Text>
                        </Group>
                    :
                        null
                    }
                    <Group>
                        <Image
                          src={TomatoImg}
                          component={NextImage}
                          alt="tomato"
                          h={17}
                          unoptimized
                        />
                        <Text fz={themeOptions.fontSize.xs}>{tomatoes?.viewer?.meter ? tomatoes?.viewer?.meter : 75}%</Text>
                    </Group>
                </Group>

                    <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.dimmed}>
                        {genres.join(', ')}
                    </Text>

                    {/* <Favourite favourite={favourite} /> */}
                </>}
        </Card>
    );
};

export { MovieCard, MovieCardSpace };
