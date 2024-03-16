import { Card, Image, Text, Group } from '@mantine/core';
import NextImage from 'next/image';
import themeOptions from '@/utils/colors';
import ImdbImg from '@/assets/icons/imdb.png';

export default function Search() {
    return (
        <Card p={0} w={250} radius={0}>
            <div>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={390}
                  alt="Norway"
                />
            </div>

            <Text fz={themeOptions.fontSize.xs} c={themeOptions.color.insideTextColor} mb="xs">USA, 2016 - Current</Text>

            <Text fz={themeOptions.fontSize.s} fw={500}>Movie Name</Text>

            <Group justify="space-between">
                <Group>
                    <Image
                      src={ImdbImg}
                      component={NextImage}
                      alt="imdb"
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
