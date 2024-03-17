import MovieCard from '@/app/(root)/components/MovieCard'
import Image from 'next/image';
import React, { useRef } from 'react'
import rArrow from '@/assets/icons/rarrow.svg'

export default function Trending() {
    const scrollRef = useRef(null);
    const handleScroll = () => {
        console.log("scrolling")
        scrollRef.current.scrollBy({
            top: 0,
            left: 300, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };
    return (
        <section className='pl-40 pr-20 md:py-20 relative w-[calc(100vw-50px)]'>
            <h1 className='text-4xl mb-10'>Trending</h1>
            <div ref={scrollRef} className='w-full overflow-hidden'>
                <div className='flex w-max relative'>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
                <Image src={rArrow} alt='slider' width={30} height={40} className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={handleScroll} />
            </div>
        </section>

    )
}
