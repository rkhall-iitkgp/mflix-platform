import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'
import BgImage from '@/assets/images/bg-home.jpeg'

export default function HeroSection() {
    return (
        <>
            <div className='h-screen w-full absolute -z-30 overflow-hidden'>
                <div className='bg-top h-screen w-screen -z-10'></div>
                <Image src={BgImage} alt='Background Image' layout='fill' objectFit='cover' className='bg-home opacity-25 -z-20' />
            </div>
            <div className="pt-24 hero flex justify-evenly items-center w-37.5 overflow-hidden">
                <div className="pl-40 mr-40 pr-20 md:py-20 flex flex-col ">
                    <h1 className='text-[3rem] text-wrap m-2'>Cool Animated Text</h1>
                    <SearchBar />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni est dolores iure natus laboriosam fugit laudantium facilis. Molestiae consectetur explicabo quibusdam esse iusto atque iste quos qui, officiis obcaecati voluptatibus!</p>
                </div>


                <div className='w-[70%] mr-40 overflow-hidden'>
                    <p className='mb-3 text-lg'>Recent Searches:</p>
                    <div className="bg-[#D9D9D926] border-solid border-[#FFFFFF] rounded-lg shadow-md p-4 flex flex-row justify-between w-half">

                        <img src="" alt="poster" />
                        <div className='flex flex-col'>
                            <h2 className="text-xl font-thin mb">{"movie.title"}</h2>
                            <div className="text-white-900 font-thin">{"movie.genre"}</div>
                            <span className="text-gray-500 mr-2 inline">Year</span>
                        </div>

                    </div>
                    <div className="bg-[#D9D9D926] border-solid border-[#FFFFFF] rounded-lg shadow-md p-4 flex flex-row justify-between w-half">

                        <img src="" alt="poster" />
                        <div className='flex flex-col'>
                            <h2 className="text-xl font-thin mb">{"movie.title"}</h2>
                            <div className="text-white-900 font-thin">{"movie.genre"}</div>
                            <span className="text-gray-500 mr-2 inline">Year</span>
                        </div>

                    </div>
                    <div className="bg-[#D9D9D926] border-solid border-[#FFFFFF] rounded-lg shadow-md p-4 flex flex-row justify-between w-half">

                        <img src="" alt="poster" />
                        <div className='flex flex-col'>
                            <h2 className="text-xl font-thin mb">{"movie.title"}</h2>
                            <div className="text-white-900 font-thin">{"movie.genre"}</div>
                            <span className="text-gray-500 mr-2 inline">Year</span>
                        </div>

                    </div>
                    <div className="bg-[#D9D9D926] border-solid border-[#FFFFFF] rounded-lg shadow-md p-4 flex flex-row justify-between w-half">

                        <img src="" alt="poster" />
                        <div className='flex flex-col'>
                            <h2 className="text-xl font-thin mb">{"movie.title"}</h2>
                            <div className="text-white-900 font-thin">{"movie.genre"}</div>
                            <span className="text-gray-500 mr-2 inline">Year</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
