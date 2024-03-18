import Image from 'next/image';
import { useRef, useState, CSSProperties, useEffect } from 'react';
import MovieCard from '@/app/(root)/components/MovieCard';
import rArrow from '@/assets/icons/rarrow.svg';
import Trend from '@/assets/icons/trends.svg';
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
    const [showFirstArrow, setShowFirstArrow] = useState(false);
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

    const sectionStyles = {

        paddingLeft: '80px',
        paddingTop: '80px', // You may adjust the padding as needed
        paddingBottom: '80px',
        position: 'relative',
        width: 'calc(100vw - 20px)',
    };

    const titleStyles = {
        fontSize: '2.25rem',
        marginBottom: '40px',
        lineHeight: "2.5rem",
        display: 'inline',
        marginRight: "10px"
    };

    const iconStyles = {
        marginLeft: '8px',
        paddingBottom: '8px',
        display: 'inline',
    };

    const containerStyles = {
        width: '100%',
        overflow: 'hidden',
    };


    const arrowStyles: CSSProperties = {
        backgroundColor: '#1a202c',
        boxShadow: '-12px 20px 222px 200px #1a202c',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    };

    const random: CSSProperties = {
        display: 'flex',
        position: 'relative',
        width: 'max-content'
    };
    return (
        <section className='pl-20  md:py-20 relative w-[calc(100vw-20px)]'>
            <h1 style={titleStyles}>Trending</h1>
            <Image src={Trend} alt='icon' style={iconStyles} />
            <div ref={scrollRef} style={containerStyles}>
                <div style={random}>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
                {showFirstArrow && (
                    <Image
                        src={rArrow}
                        alt='slider'
                        style={{ ...arrowStyles, left: '40px', transform: 'translateY(-50%) rotate(180deg)', transition: 'opacity 5s',opacity: showFirstArrow ? 1 : 0 }}
                        width={30}
                        height={40}
                        onClick={handleScrollLeft}
                    />
                )}
                <Image
                    src={rArrow}
                    alt='slider'
                    style={{ ...arrowStyles, right: '10px' }}
                    width={30}
                    height={40}
                    onClick={handleScrollRight}
                />
            </div>
        </section>
    );
}
