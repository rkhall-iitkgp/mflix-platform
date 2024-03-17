import React from 'react'

export default function Navbar() {
    return (
        <nav className="text-white flex justify-between items-center p-4 absolute w-full px-4 sm:px-10">
            {/* Logo */}
            <div className="flex items-center p-4">
                <img src="/logo.svg" alt="Logo" className="h-8 ml-0 sm:ml-4" />
            </div>

            {/* Links */}
            <ul className="flex space-x-4 p-4">
                <li>
                    <a href="#" className="hover:text-gray-400 px-4 sm:px-8">
                        Movies
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400 px-4 sm:px-8">
                        Shows
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400 px-4 sm:px-8">
                        Drama
                    </a>
                </li>
            </ul>
        </nav>
    )
}
