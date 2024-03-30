'use client'
import Image from 'next/image';
import { useRef, useState, CSSProperties, useEffect } from 'react';
import ListCard from '@/components/ListMovies/index';
import rArrow from '@/assets/icons/rarrow.svg';
import { createStyles } from '@mantine/styles';

export default function Trending({similarMoviesData}: {similarMoviesData: any}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowFirstArrow] = useState(false);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            // Check if the container is scrolled horizontally
            if (!scrollRef.current) return;
            if (scrollRef.current.scrollLeft > 0) {
                setShowFirstArrow(true);
            } else {
                setShowFirstArrow(false);
            }
        };

        // Add scroll event listener to the container
        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }
    
        // Remove event listener on component unmount
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleScrollRight = () => {
        if (!scrollRef.current) return;
        console.log("scrolling");
        setVis(true);
        scrollRef.current.scrollBy({
            top: 0,
            left: 220, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };

    const handleScrollLeft = () => {
        if (!scrollRef.current) return;
        console.log("scrolling")
        scrollRef.current.scrollBy({
            top: 0,
            left: -220, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };

    const { classes, cx } = useStyles()
    console.log(similarMoviesData)
    return (
        <section className={classes.sectionStyles}>
            <div ref={scrollRef} className={classes.containerStyles}>
                <div className={classes.movieDiv}>
                    <ListCard movieData={[]} />
                </div>
                
                    <Image
                        src={rArrow}
                        alt='slider'
                        className={cx(classes.arrowStyles, classes.leftArrow, {[classes.opacity]: showLeftArrow === true })}
                        width={30}
                        height={40}
                        onClick={handleScrollLeft}
                    />
                
                <Image
                    src={rArrow}
                    alt='slider'
                    className={cx(classes.arrowStyles, classes.rightArrow)}
                    width={30}
                    height={40}
                    onClick={handleScrollRight}
                />
            </div>
        </section>
    );
}

const useStyles = createStyles(() => ({
    opacity: {
        opacity: 1
    },
    sectionStyles: {
        paddingTop: '80px',
        // paddingBottom: '80px',
        position: 'relative',
        width: 'calc(100vw - 20px)',
    },

    containerStyles: {
        width: '100%',
        overflow: 'hidden',
        height:'32rem',
    },

    arrowStyles: {
        backgroundColor: '#000',
        boxShadow: '-12px 20px 222px 180px #000',
        position: 'absolute',
        top: '45%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex:2,
        // filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3))',
    },

    movieDiv: {
        display: 'flex',
        position: 'relative',
        width: 'max-content',
        paddingLeft:'5rem',
        height:'40rem',
        marginTop:'2rem'
    },

    leftArrow: {
        left: '40px',
        transform: 'translateY(-50%) rotate(180deg)',
        transition: 'opacity .15s',
        opacity: 0
    },

    rightArrow: {
        right: '10px'
    },
}));