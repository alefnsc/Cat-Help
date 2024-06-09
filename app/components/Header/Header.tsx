'use client';
import React from 'react';
import Image from 'next/image';
import { doLogin } from 'app/services/Web3Service';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface HeaderProps {
  prop?: string;
}

export function Header({ }: HeaderProps) {

  const [wallet, setWallet] = useState<string | null>(null);

  function btnLoginClick() {
    doLogin().then(
      (wallet) => {
        setWallet(wallet);
        window.location.reload();
      }
    ).catch((err) => {
      alert(err.message);
    });
  }

  function btnNewRequest() {
    window.location.href = '/NewRequest';
  }

  useEffect(() => {
    if (localStorage.getItem('wallet')) {
      setWallet(localStorage.getItem('wallet'));
    }
  }, []);

  return (
    <header className="text-white text-center bg-pink-300 w-full py-2">
      <div className='grid grid-cols-2 items-center max-w-screen-xl w-[80%] mx-auto px-5'>
        <div className='flex items-center space-x-2'>
          <Link href='./'><Image src="/CatHelp.png" alt="Cat Help Logo" width={80} height={80} /></Link>

        </div>
        <div className='flex justify-end space-x-2 py-2'>
          {
            wallet
              ? <button onClick={btnNewRequest} className='flex items-center space-x-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded' type='button'><span>GET HELP</span></button>
              : <button onClick={btnLoginClick} className='flex items-center space-x-2 bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded' type='button'><Image alt='metamask' src="/metamask-icon.png" width={20} height={20} /><span>LOGIN</span></button>}
        </div>
      </div>
    </header>
  );
}