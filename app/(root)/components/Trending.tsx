'use client'
import Image from 'next/image';
import { useRef, useState, CSSProperties, useEffect } from 'react';
import MovieCard from '@/app/(root)/components/MovieCard';
import rArrow from '@/assets/icons/rarrow.svg';
import Trend from '@/assets/icons/trends.svg';
import { createStyles } from '@mantine/styles';
// export default function Trending() {
//     const scrollRef = useRef(null);
//     const handleScrollRight = () => {
//         console.log("scrolling")
//         scrollRef.current.scrollBy({
//             top: 0,
//             left: 300, // Adjust this value based on the width of each item
//             behavior: 'smooth',
//         });
//     };
//     const handleScrollLeft = () => {
//         console.log("scrolling")
//         scrollRef.current.scrollBy({
//             top: 0,
//             left: -300, // Adjust this value based on the width of each item
//             behavior: 'smooth',
//         });
//     };
//     const [vis,setVis]=useState(false);
//     return (
//         <section className='pl-20  md:py-20 relative w-[calc(100vw-20px)]'>
//             <h1 className='text-4xl mb-10 inline'>Trending</h1>
//             <Image src={Trend} alt='icon' className='inline ml-2 pb-2' width={35} height={30} />
//             <div ref={scrollRef} className='w-full overflow-hidden'>
//                 <div className='flex w-max relative'>
//                     <MovieCard />
//                     <MovieCard />
//                     <MovieCard />
//                     <MovieCard />
//                     <MovieCard />
//                     <MovieCard />
//                     <MovieCard />
//                     <MovieCard />
//                 </div>

//             {vis && <Image src={rArrow} alt='slider' width={30} height={40} className='bg-[#1a202c] shadow-[-12px_20px_222px_200px_#1a202c] absolute left-40 top-1/2 transform -translate-y-1/2 cursor-pointer rotate-180' onClick={handleScrollLeft} />}
//                     <Image src={rArrow} alt='slider' width={30} height={40} className='bg-[#1a202c] shadow-[-12px_20px_222px_200px_#1a202c] absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={handleScrollRight} />

//             </div>
//         </section>

//     )
// }


export default function Trending() {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowFirstArrow] = useState(false);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            // Check if the container is scrolled horizontally
            if (scrollRef.current.scrollLeft > 0) {
                setShowFirstArrow(true);
            } else {
                setShowFirstArrow(false);
            }
        };

        // Add scroll event listener to the container
        scrollRef.current.addEventListener('scroll', handleScroll);

        // Remove event listener on component unmount
        return () => {
            scrollRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollRight = () => {
        console.log("scrolling");
        setVis(true);
        scrollRef.current.scrollBy({
            top: 0,
            left: 220, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };

    const handleScrollLeft = () => {
        console.log("scrolling")
        scrollRef.current.scrollBy({
            top: 0,
            left: -220, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };

    const { classes, cx } = useStyles()

    return (
        <section className={classes.sectionStyles}>
            <div className={classes.trendStyles}>
                <h1 className={classes.titleStyles}>Trending</h1>
                <Image src={Trend} alt='icon' className={classes.iconStyles} />
            </div>
            <div ref={scrollRef} className={classes.containerStyles}>
                <div className={classes.movieDiv}>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>

                <Image
                    src={rArrow}
                    alt='slider'
                    className={cx(classes.arrowStyles, classes.leftArrow, { [classes.opacity]: showLeftArrow === true })}
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
        // paddingTop: 'rem', // You may adjust the padding as needed
        paddingBottom: '80px',
        position: 'relative',
        width: 'calc(100vw - 20px)',
        background: '#0B0212'
    },

    titleStyles: {
        fontSize: '3rem',
        lineHeight: "5.5rem",
        display: 'inline',
        zIndex: 5,
        // marginRight: "2.5rem"
    },

    iconStyles: {
        // marginLeft: '1rem',
        width: '70px',
    },

    containerStyles: {
        width: '100%',
        overflow: 'hidden',
    },

    arrowStyles: {
        backgroundColor: '#000',
        boxShadow: '-12px 20px 222px 180px #000',
        position: 'absolute',
        top: '55%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 2,
        // filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3))',
    },

    movieDiv: {
        display: 'flex',
        position: 'relative',
        width: 'max-content',
        paddingLeft: '5rem'
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
    trendStyles: {
        width: '25rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));