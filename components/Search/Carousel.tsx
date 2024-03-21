'use client';

import { useRef, useState, useEffect } from 'react';
import { ScrollArea, Group, UnstyledButton } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const viewport = useRef<HTMLDivElement>(null);
    const { ref, height } = useElementSize();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const handleScroll = () => {
        if (viewport.current) {
            const { scrollLeft, scrollWidth, clientWidth } = viewport.current;
            setShowLeftButton(scrollLeft > 50);
            setShowRightButton(scrollLeft + clientWidth < scrollWidth);
        }
    };
    useEffect(() => {
        viewport.current?.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => {
            viewport.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollPrev = () => viewport.current!.scrollBy({ top: 0, behavior: 'smooth', left: -400 });
    const scrollNext = () => viewport.current!.scrollBy({ top: 0, behavior: 'smooth', left: 400 });

    useEffect(() => {
        handleScroll();
    }, [children]); // Call handleScroll whenever children change

    return (
        <Group align="center" wrap="nowrap" ref={ref} maw="calc(100vw - 10rem)">
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
                      background: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
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
                      background: 'linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                  }}
                >
                    <FaChevronRight size={100} />
                </UnstyledButton>
            )}
        </Group>
    );
};

export default Carousel;
