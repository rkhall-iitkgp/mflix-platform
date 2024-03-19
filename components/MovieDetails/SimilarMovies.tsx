'use client'

import Image from 'next/image';
import { useRef, useState, CSSProperties, useEffect } from 'react';
import MovieCard from './MovieCards';
import rArrow from '@/assets/icons/rarrow.svg';
import Trend from '@/assets/icons/trends.svg';
import { createStyles } from '@mantine/styles';
// export default function SimilarMovies() {
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
//             <h1 className='text-4xl mb-10 inline'>SimilarMovies</h1>
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


export default function SimilarMovies() {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowFirstArrow] = useState(false);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            // Check if the container is scrolled horizontally
            if (scrollRef.current.scrollLeft > 100) {
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
            left: 300, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };

    const handleScrollLeft = () => {
        console.log("scrolling")
        scrollRef.current.scrollBy({
            top: 0,
            left: -300, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };

    const {classes, cx} = useStyles()

    return (
        <section className={classes.sectionStyles}>
            <h1 className={classes.titleStyles} style={{fontWeight:"400", fontSize:"50px"}}>SimilarMovies</h1>
            <div ref={scrollRef} className={classes.containerStyles}>
                <div className={classes.random}>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
                {showLeftArrow && (
                    <Image
                        src={rArrow}
                        alt='slider'
                        className={cx(classes.arrowStyles, classes.leftArrow, {opacity: showLeftArrow ? 1 : 0})}
                        width={30}
                        height={40}
                        onClick={handleScrollLeft}
                    />
                )}
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
    sectionStyles: {
        marginLeft:"20px",
        marginTop:"100px",
        paddingBottom: '80px',
        position: 'relative',
        width: 'calc(100vw - 20px)',
    },

    titleStyles: {
        fontSize: '2.25rem',
        lineHeight: "2.5rem",
        display: 'inline',
        marginRight: "2.5rem",
        marginTop:"2rem",
        
    },

    iconStyles: {
        marginLeft: '2rem',
        paddingBottom: '2rem',
        display: 'inline',
    },

    containerStyles: {
        width: '100%',
        overflow: 'hidden',
        marginTop:'30px',
    },

    arrowStyles: {
        backgroundColor: '#1a202c',
        boxShadow: '-12px 20px 222px 200px #1a202c',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    },

    random: {
        display: 'flex',
        position: 'relative',
        width: 'max-content',
    },

    leftArrow: {
        left: '40px',
        transform: 'translateY(-50%) rotate(180deg)',
        transition: 'opacity 5s'
    },

    rightArrow: {
        right: '10px'
    }
}))