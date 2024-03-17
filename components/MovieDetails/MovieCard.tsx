import { Card, Image, Text, Group } from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import ImdbImg from '@/assets/icons/imdb.png';
import Sample2 from '@/assets/sample2.jpeg';

export default function Search() {
    return (
        <Card p={0} w={250} radius={0} bg="black">
            <div>
                <Image
                  src={Sample2}
                  component={NextImage}
                  alt="sample"
                  height={380}
                />
            </div>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor} mb="xs">USA, 2016 - Current</Text>

            <Text fz={themeOptions.fontSize.s} fw={500}>Movie Name</Text>

            <Group justify="space-between">
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
                    <Text fz={themeOptions.fontSize.xs}>Tomato</Text>
                    <Text fz={themeOptions.fontSize.xs}>97%</Text>
                </Group>
            </Group>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor}>
                Action, Adventure / Horror
            </Text>

        </Card>
    );
}
