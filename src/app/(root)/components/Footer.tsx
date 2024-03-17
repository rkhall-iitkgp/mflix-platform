import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
    return (
        <footer className="text-white p-8 py-16">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
                {/* Logo Section */}
                <div className="w-full md:w-1/4 px-8 mt-8 md:mt-4">
                    <Link href="/" className="text-3xl font-bold leading-tight text-white no-underline hover:text-gray-400">
                        <Image src={'/logo.svg'} alt="Logo" width={100} height={100} />
                    </Link>
                </div>

                {/* Info Section */}
                <div className="w-full md:w-1/4 px-8 mt-8 md:mt-4">
                    <h4 className="text-gray-400 font-semibold text-lg mb-2">INFO</h4>
                    <ul className="list-none mt-2">
                        <li>
                            <Link href="#" className="text-gray-600 hover:text-gray-400 block mb-2">
                                Phone: +1 (234) 567-8888
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-600 hover:text-gray-400 block mb-2">
                                Email: info@yourcompany.com
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Us Section */}
                <div className="w-full md:w-1/4 px-8 mt-8 md:mt-4">
                <h4 className="text-gray-400 font-semibold text-lg mb-2">CONTACT US</h4>
                    <ul className="list-none mt-2">
                        <li>
                            <Link href="#" className="text-gray-600 hover:text-gray-400 block mb-2">
                                Address Line 1
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-600 hover:text-gray-400 block mb-2">
                                Address Line 2
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Find Us Section */}
                <div className="w-full md:w-1/4 px-8 mt-8 md:mt-4">
                <h4 className="text-gray-400 font-semibold text-lg mb-2">FIND US</h4>
                    <p className="text-gray-600 text-sm">
                        We are located at:
                    </p>
                    <Link
                        href="https://maps.google.com/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center text-gray-600 hover:text-gray-400 mt-2"
                    >
                        Google Maps
                    </Link>
                </div>
            </div>
            <p className='text-gray-400 p-10 text-sm'>
                &copy; 2024 - Copyright
            </p>
        </footer>
    )
}

export default Footer