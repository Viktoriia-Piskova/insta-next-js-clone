"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Modal from 'react-modal';
import { IoMdAddCircleOutline } from 'react-icons/io';

export default function Header() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
            <div className='flex justify-between items-center max-w-6xl mx-auto'>
                <Link href='/' className='hidden lg:inline-flex'>
                    <Image src='/Instagram_logo_black.webp'
                        width={96}
                        height={96}
                        alt='Instagram Logo' />
                </Link>
                <Link href='/' className='lg:hidden'>
                    <Image src='/800px-Instagram_logo_2016.webp'
                        width={40}
                        height={40}
                        alt='Instagram Logo' />
                </Link>

                <input type="text" placeholder='Search' className='bg-gray-50 border border-color-gray-200 text-sm w-full rounded py-2 px-4 max-w-[210px]' />

                {/* menu items */}
                {session ?
                    (<div className='flex gap-2 items-center'>
                        <IoMdAddCircleOutline
                            className='text-2xl cursor-pointer tranform hover:scale-125 transition duration-300 hover:text-red-600'
                            onClick={() => setIsOpen(true)}
                        />
                        <img src={session.user.image} alt={session.user.name} className='h-10 w-10 rounded-full cursor-pointer shadow block' onClick={signOut} />

                    </div>
                    ) : (
                        <button onClick={() => signIn()} className='text-sm font-semibold text-blue-500'>Log in</button>
                    )}
            </div>

            {isOpen && (
                <Modal isOpen={isOpen} className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white shadow-md border-2 rounded-md' onRequestClose={() => setIsOpen(false)} ariaHideApp = {false}>
                    <div>
                        <h1>Modal</h1>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </ Modal>
            )}
        </div>
    );
}
