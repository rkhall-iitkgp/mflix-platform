'use client';

import { useRef } from 'react';
import { ScrollArea, Button, Group } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import themeOptions from '@/utils/themes';

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const viewport = useRef<HTMLDivElement>(null);
    const { ref, height } = useElementSize();
    const scrollPrev = () =>
        viewport.current!.scrollBy({ top: 0, behavior: 'smooth', left: -400 });
    const scrollNext = () =>
        viewport.current!.scrollBy({ top: 0, behavior: 'smooth', left: +400 });

    return (
        <Group align="center" wrap="nowrap" ref={ref}>
            <ScrollArea viewportRef={viewport} styles={{ scrollbar: { display: 'none', width: 'none' } }}>
                <Group wrap="nowrap" gap="4rem">
                    {children}
                </Group>
            </ScrollArea>
            <Button
              onClick={scrollPrev}
              pos="absolute"
              left={themeOptions.fontSize.l}
              h={height}
              pr={200}
              radius={0}
              style={{
                border: 'none',
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 19.48%, rgba(0, 0, 0, 0) 83.69%)',
              }}
              styles={{
                root: {
                    '& :active': {
                        outline: 'none',
                    },
                },
              }}
            >
                <FaChevronLeft size={100} />
            </Button>
            <Button
              onClick={scrollNext}
              pos="absolute"
              right={themeOptions.fontSize.l}
              h={height}
              pl={200}
              radius={0}
              style={{
                border: 'none',
                background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.8) 19.48%, rgba(0, 0, 0, 0) 83.69%)',
              }}
            >
                <FaChevronRight size={100} />
            </Button>
        </Group>
    );
};

export default Carousel;