'use client';

import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ScrollArea, Group, UnstyledButton } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface CarouselProps {
    children: React.ReactNode;
    nextPage?: any;
}

const Carousel: React.FC<CarouselProps> = ({ children, nextPage }) => {
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
    }, [viewport]);

    const scrollPrev = () => viewport.current!.scrollBy({ top: 0, behavior: 'smooth', left: -400 });
    const scrollNext = () => viewport.current!.scrollBy({ top: 0, behavior: 'smooth', left: 400 });

    useEffect(() => {
        handleScroll();
    }, [children]); // Call handleScroll whenever children change

    useEffect(() => {
        if (!showRightButton && nextPage) nextPage()
    }, [showRightButton])

    return (
        <Group align="center" wrap="nowrap" ref={ref} maw="calc(100vw - 10vw)">
            <ScrollArea viewportRef={viewport} styles={{ scrollbar: { display: 'none', width: 'none' } }}>
                <Group wrap="nowrap" gap="2rem" align="flex-start">
                    {children}
                </Group>
            </ScrollArea>
            {showLeftButton && (
                <UnstyledButton
                  onClick={scrollPrev}
                  pos="absolute"
                  left="calc(5vw - 3px)"
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
                  right="calc(5vw - 3px)"
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
