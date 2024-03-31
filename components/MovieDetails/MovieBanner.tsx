import { Group, Button, Image, Stack, Text, Paper } from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import themeOptions from '@/utils/colors';
import Sample from '@/assets/sample.png';

export default function MovieBanner() {
    const genres = ['Mystery', 'Action', 'Thriller'];
    return (
        <Stack
          style={{
            maxWidth: '600px',
          }}
          styles={{
            root: {
                borderImageSource: 'linear-gradient(166.93deg, #B586D8 3.24%, rgba(143, 72, 196, 0) 96.43%), linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(0,102,54,0.0) 67.95%)',
                borderImageSlice: '1',
                borderImageWidth: '1',
                borderImageOutset: '0',
                borderRadius: '20px',
                background: 'linear-gradient(0deg, rgba(112, 17, 182, 0.15), rgba(112, 17, 182, 0.15)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)',
            },
          }}
          justify="space-between"
          pt="md"
          pb="xs"
          pl={themeOptions.fontSize.l}
          pr={themeOptions.fontSize.l}
          gap={0}
        >
            <Group align="center">
                <div style={{ width: '107px' }}>
                    <Image
                      src={Sample}
                      component={NextImage}
                      alt="sample"
                      height={158}
                    />
                </div>
                <Stack ml="lg" gap="xs" mr="lg">
                    <Text fz={themeOptions.fontSize.l}>Movie Name</Text>
                    <Group gap={themeOptions.fontSize.xs}>
                        {genres.map((e, i) =>
                        <Paper
                          key={i}
                          bg={themeOptions.color.smallBox}
                          fz={themeOptions.fontSize.s}
                          w={116}
                          pt={5}
                          pb={5}
                          radius={13}
                        >
                            <Text ta="center">{e}</Text>
                        </Paper>)}
                    </Group>
                    <Group mt={7} justify="space-between">
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
                    </Group>
                    <Group gap={6} justify="space-around" style={{ maxWidth: 'max-content' }}>
                        <GrLocation />
                        <Text fz={themeOptions.fontSize.xs}>Country</Text>
                    </Group>
                </Stack>
            </Group>
            <Text ta="right" w="100%">
                <Button
                  fz={themeOptions.fontSize.s}
                  c={themeOptions.color.textColorNormal}
                  component="a"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                  variant="transparent"
                  rightSection={<IoIosArrowForward size={14} />}
                  p={0}
                >
                    View More
                </Button>
            </Text>
        </Stack>
    );
}