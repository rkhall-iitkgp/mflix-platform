import { Group, Button, Image, Stack, Text, Paper, Flex } from '@mantine/core';
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
          styles={{
              root: {
                    margin: '0.5rem  0.5rem',
                  minWidth: '600px',
                  borderRadius: '20px',
                  background: 'linear-gradient(0deg, rgba(0, 102, 74, 0.05),rgba(0, 102, 74, 0.05)), linear-gradient(321.23deg, rgba(0, 102, 74, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)',
              },
          }}
          pt="md"
          pl={themeOptions.fontSize.l}
          pr={themeOptions.fontSize.l}
          gap={0}
        >
            <Flex>
                <div>
                    <Image
                      src={Sample}
                      component={NextImage}
                      alt="sample"
                      h={160}
                    />
                </div>
                <Stack ml="lg" gap="xs" mr="lg" style={{color:"white"}}>
                    <Text fz={themeOptions.fontSize.l}>Movie Name</Text>
                    <Group gap={themeOptions.fontSize.xs}>
                        {genres.map((e, i) =>
                            <Paper
                              key={i}
                              bg={themeOptions.color.button}
                              fz={themeOptions.fontSize.s}
                              w={116}
                              pt={5}
                              pb={5}
                              radius={13}
                            >
                                <Text ta="center">{e}</Text>
                            </Paper>)}
                    </Group>
                    <Group mt={7} justify="space-between" gap={themeOptions.fontSize.l} style={{ rowGap: '10px' }} grow preventGrowOverflow={false}>
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
                              alt="tomato"
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
                        <Group gap={6} justify="space-around" style={{ maxWidth: 'max-content' }}>
                            <GrLocation />
                            <Text fz={themeOptions.fontSize.xs}>Country</Text>
                        </Group>
                    </Group>
                </Stack>
            </Flex>
            <Text
              ta="right"
              w="100%"
              styles={{
                  root: {
                      position: 'relative',
                      top: '-1rem',
                  },
              }}
            >
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
