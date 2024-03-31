import { useState } from 'react';
import { Card, Image, Text, Group, AspectRatio, ActionIcon, Skeleton, Badge } from '@mantine/core';
import NextImage, { StaticImageData } from 'next/image';
import { HiHeart } from 'react-icons/hi';
import noImage from '@/assets/images/no-image.jpg';
import themeOptions from '@/utils/colors';
import TomatoImg from '@/assets/icons/tomato.png';
import ImdbImg from '@/assets/icons/imdb.png';
import { createStyles } from '@mantine/styles';

const useStyles = createStyles(() => ({
  card: {
    backgroundColor: 'transparent', // Base background
    color: themeOptions.color.normalTextColor, // Base text color
    borderRadius: '16px',
    '&:hover': { // Hover styles
        transform: 'scale(1.05)', 
        transition: 'transform 0.2s ease-in-out', // Transition for hover 
      boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(221, 221, 221, 0.388)', // Hover shadow
    },
  },
}));

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
    tier: string;
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
    <Card p={0} radius="12px" bg="transparent" w={250} h={490}>{children}</Card>
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
        tier,
    } = props;
    const [loading, setLoading] = useState(true);
    const [src, setSrc] = useState<string | StaticImageData>(poster);
    const { classes } = useStyles();


    return (
        <Card
          radius="12px"
          bg="transparent"
          w={270}
          c={themeOptions.color.normalTextColor}
          p="10px"
          component="a"
          href={`/movies/${_id}`}
          className={classes.card}

        >
            <Skeleton visible={loading}>
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
                    {countries?.length ? countries[0] : "Dominican Republic"}, {released ? released.substr(0, 4) : 2011} - Current
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
                        />
                        <Text fz={themeOptions.fontSize.xs}>{tomatoes?.viewer?.meter ? tomatoes?.viewer?.meter : 75}%</Text>
                    </Group>
                </Group>

                    <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.dimmed}>
                        {genres?.length ? genres.join(', ') : 'Comedy'}
                    </Text>
                    
                    {/* <Favourite favourite={favourite} /> */}
                    <Badge color={themeOptions.color.smallBox} size="xl" pos="absolute" left={20} top={20}>{tier}</Badge>
                </>}
        </Card>
    );
};

export { MovieCard, MovieCardSpace };
