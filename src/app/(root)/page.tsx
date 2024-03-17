"use client"
import Image from 'next/image'
import img from '../pexels-anjana-c-674010.jpg'
import React, { useRef } from 'react'
import BgImage from '@/assets/images/bg-home.jpeg'
import SearchBar from '@/components/SearchBar'
import rArrow from "@/assets/icons/rarrow.svg"
import Poster from "@/assets/images/poster.jpeg"
import Imdb from "@/assets/images/imdb.png"
import Tomato from "@/assets/images/tomato.png"
import Heart from "@/assets/images/heart.svg"
export default function Home() {
    const sectionRef = useRef(null);
    const handleScroll = () => {
        sectionRef.current.scrollBy({
            top: 0,
            left: 300, // Adjust this value based on the width of each item
            behavior: 'smooth',
        });
    };
    return (
        <>
            {/* Backgroung Image */}
            <div className='h-screen w-screen absolute -z-30 overflow-hidden'>
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
            <div>
                <section className='pl-40 mr-40 pr-20 md:py-20 overflow-hidden relative' ref={sectionRef}>
                    <h1 className='text-4xl mb-10'>Trending</h1>
                    <div className='flex w-max'>
                        <div className='mr-10 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div className='mr-5 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div className='mr-5 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div className='mr-5 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div className='mr-5 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div className='mr-5 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div className='mr-5 w-64 h-auto overflow-hidden'>
                            <div className=' flex justify-end items-end flex-row absolute w-60 mt-4 '>
                                <Image src={Heart} width={30} height={30} alt='fav' className='self-end bg-[#F3F4F6] left-48 border-2 p-1 rounded-full' />
                            </div>
                            <Image src={Poster} alt='poster' width={250} height={370} className='w-96' />
                            <span className='text-[#9CA3AF] font-bold mt-1'>USA, 2016- Current</span>
                            <h3 className='text-lg font-bold mt-1'>Movie Title</h3>
                            <div className='text-left flex justify-between'>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Imdb} width={35} height={17} alt='imdb' className='inline' />
                                    <span className='text-cente mx-2 bottom-0'>8.6/10</span>
                                </div>
                                <div className='flex justify-center items-center mt-1'>
                                    <Image src={Tomato} alt='tomato ' height={17} width={16} className='mr-2' />
                                    <span> 96%</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-[#9CA3AF] font-bold'>Action,Adventure / Horror</span>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <Image src={rArrow} alt='slider' width={30} height={40} className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={handleScroll}/>
                </section>
            </div>
        </>
    )
}
