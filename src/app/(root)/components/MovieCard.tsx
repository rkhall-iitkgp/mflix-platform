import Image from 'next/image'
import React from 'react'
import Heart from "@/assets/images/heart.svg"
import Poster from "@/assets/images/poster.jpeg"
import Imdb from "@/assets/images/imdb.png"
import Tomato from "@/assets/images/tomato.png"

export default function MovieCard() {
    return (
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
    )
}
