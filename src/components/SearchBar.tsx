import React from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import XMarkIcon from '@/assets/icons/xmark.svg'
import MicIcon from '@/assets/icons/mic.svg'
import Image from 'next/image'

export default function SearchBar() {
    return (
        <div className="flex items-center rounded-md overflow-hidden bg-gray-100 px-4 py-2 my-5">
            <Image src={SearchIcon} alt="search" className="h-6 w-6 text-gray-400 mr-2" />
            <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent focus:outline-none text-gray-700"
            />
            <Image src={XMarkIcon} alt="X" className="h-6 w-6 text-gray-400 mr-2" />
            <Image src={MicIcon} alt="Mic" className="h-6 w-6 text-gray-400 mr-2 bg-[#7011B6] p-0.5 rounded-full" />
        </div>
    )
}
