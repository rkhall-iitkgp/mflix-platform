'use client';

import { useRef, useState, useEffect } from 'react';
import { ScrollArea, Group, UnstyledButton } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const viewport = useRef<HTMLDivElement>(null);
    const { ref, height } = useElementSize();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (viewport.current) {
                const { scrollLeft, scrollWidth, clientWidth } = viewport.current;
                setShowLeftButton(scrollLeft > 200);
                setShowRightButton(scrollLeft + clientWidth < scrollWidth);
            }
        };

        viewport.current?.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => {
            viewport.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            {showLeftButton && (
                <UnstyledButton
                  onClick={scrollPrev}
                  pos="absolute"
                  left="4rem"
                  h={height}
                  pr={200}
                  style={{
                      border: 'none',
                      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 19.48%, rgba(0, 0, 0, 0) 83.69%)',
                  }}
                >
                    <FaChevronLeft size={100} />
                </UnstyledButton>
            )}
            {showRightButton && (
                <UnstyledButton
                  onClick={scrollNext}
                  pos="absolute"
                  right="4rem"
                  h={height}
                  pl={200}
                  style={{
                      border: 'none',
                      background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.8) 19.48%, rgba(0, 0, 0, 0) 83.69%)',
                  }}
                >
                    <FaChevronRight size={100} />
                </UnstyledButton>
            )}
        </Group>
    );
};

export default Carousel;
