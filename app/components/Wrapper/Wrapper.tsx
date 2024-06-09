'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from '../Container';

import { Request as AppRequest } from '../../types/RequestType';
export interface WrapperProps {
  requests: AppRequest[];
}

import { doLogin } from 'app/services/Web3Service';

export function Wrapper({ requests }: WrapperProps) {
  const [wallet, setWallet] = React.useState<string | null>(null);

  function handleBtnLogin() {
    doLogin().then(
      (wallet) => {
        setWallet(wallet);
        window.location.reload();
      }
    ).catch((err) => {
      alert(err.message);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center py-4 w-full'">
      <h1 className='
      text-4xl font-bold text-center text-pink-500 mb-8
    
    '> Help Rescued Cats </h1>
      {requests
        && requests.length > 0
        && requests.map((rq, index) => (
          <Container key={index} title={rq.title} description={rq.description} goal={rq.goal} balance={rq.balance} author={rq.author} contact={rq.contact} id={rq.id || 0} />)
        )
      }
      {!requests
        || requests.length === 0
        && (
          <div className="flex flex-col justify-center items-center">
            <h1> No requests found </h1>

            <button onClick={handleBtnLogin} className="flex flex-row items-center justify-center bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
              <Image className='pr-2' src="/metamask-icon.png" alt="metamask" width={40} height={40} />
              LOGIN TO CREATE A NEW</button>
          </div>
        )
      }
    </div>
  );
}
