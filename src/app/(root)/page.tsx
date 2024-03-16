import Image from 'next/image'
import React from 'react'
import BgImage from '@/assets/images/bg-home.jpeg'
import SearchBar from '@/components/SearchBar'

export default function Home() {
    return (
        <>
            {/* Backgroung Image */}
            <div className='h-screen w-screen absolute -z-30'>
                <div className='bg-top h-screen w-screen -z-10'></div>
                <Image src={BgImage} alt='Background Image' layout='fill' objectFit='cover' className='bg-home opacity-25 -z-20' />
            </div>

            {/* Hero */}
            <div className="pt-24 hero flex justify-evenly items-center w-[70%]">
                <div className="p-10 md:p-20 flex flex-col">
                    <h1 className='text-[3rem] text-wrap m-2'>Cool Animated Text</h1>
                    <SearchBar />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni est dolores iure natus laboriosam fugit laudantium facilis. Molestiae consectetur explicabo quibusdam esse iusto atque iste quos qui, officiis obcaecati voluptatibus!</p>
                </div>

                
                <div className='w-50%'>
                    <div className="bg-[#D9D9D926] border-solid border-[#FFFFFF] rounded-lg shadow-md p-4 flex flex-col w-full">
                        <h2 className="text-xl font-bold mb-2">{"movie.title"}</h2>
                        <div className="flex items-center mb-2 w-max">
                            <span className="text-gray-500 mr-2">Year:</span>
                            <span className="font-bold">{"movie.year"}</span>
                        </div>
                        <div className="text-gray-700">{"movie.genre"}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
