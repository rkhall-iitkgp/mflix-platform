import { Card, Image, Text, Group, AspectRatio } from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import TomatoImg from '@/assets/icons/tomato.png';
import ImdbImg from '@/assets/icons/imdb.png';
import Sample2 from '@/assets/sample2.jpeg';

export default function Search() {
    return (
        <Card p={0} radius={0} bg="transparent" w={250} maw="20rem" c={themeOptions.color.normalTextColor}>
            <AspectRatio ratio={320 / 500}>
                <Image
                  src={Sample2}
                  component={NextImage}
                  alt="sample"
                />
            </AspectRatio>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor} mt="xs" mb="xs">
                USA, 2016 - Current
            </Text>

            <Text fz={themeOptions.fontSize.s} fw={500}>
                Movie Name
            </Text>

            <Group justify="space-between" mt="xs" mb="xs">
                <Group justify="space-around">
                    <Image
                      src={ImdbImg}
                      component={NextImage}
                      alt="imdb"
                      height={20}
                      unoptimized
                    />
                    <Text fz={themeOptions.fontSize.xs}>8.6/10</Text>
                </Group>
                <Group>
                    <Image
                      src={TomatoImg}
                      component={NextImage}
                      alt="imdb"
                      height={20}
                      unoptimized
                    />
                    <Text fz={themeOptions.fontSize.xs}>97%</Text>
                </Group>
            </Group>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor}>
                Action, Adventure / Horror
            </Text>

        </Card>
    );
}
