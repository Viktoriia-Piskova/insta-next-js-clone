"use client"

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();
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
                    (<img src={session.user.image} alt={session.user.name} className='h-10 w-10 rounded-full cursor-pointer shadow block' onClick={signOut} />
                    ) : (
                        <button onClick={() => signIn()} className='text-sm font-semibold text-blue-500'>Log in</button>
                    )}
            </div>
        </div>
    )
}
