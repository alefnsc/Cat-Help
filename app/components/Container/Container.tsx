import React from 'react';
import Image from 'next/image';
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import { closeRequest, donate } from 'app/services/Web3Service';
import Web3 from 'web3';
export interface ContainerProps {
  id: number;
  author: string;
  title: string;
  description: string;
  goal: string;
  balance: string;
  contact: string;
  prop?: string;
}

export function Container({ id, author, title, description, goal, balance, contact }: ContainerProps) {

  async function handleBtnDonate() {
    const amount = prompt('Enter the amount to donate');
    if (amount) {
      try {
        await donate(id, amount);
        alert('Donation successful');
      } catch (error: any) {
        alert(error.message);
      }
    }

  }

  async function handleBtnCloseRequest() {
    try {
      if (!confirm('Are you sure you want to close this request?')) {
        return;
      }
      await closeRequest(id);
      alert('Request closed');
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-row flex-nowrap items-center justify-between bg-gray-100 border border-gray-200 rounded-md p-10 max-w-xl shadow-md w-[80%] lg:min-w-[80%] xl:min-w-[80%]">
      <div className="flex flex-col justify-center items-center">
        <Image className='rounded-full' src={generateAvatarURL(author)} alt={title} width={50} height={50} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-sms font-bold text-gray-700 ">{title}</h1>
        <p className="text-gray-700 text-sm text-center"> {description}</p>
        <p className="text-gray-500 text-sm text-center mt-4"> {contact}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <b className="text-gray-700 text-sm">BALANCE: </b>
        <span className="text-gray-700 text-xs">(BNB test)</span>
        <span className="text-sm font-bold text-purple-700">${
          Web3.utils.fromWei(balance, 'ether')
        } </span>

      </div>
      <div className="flex flex-col justify-center items-center">
        <b className="text-gray-700 text-sm">GOAL: </b>
        <span className="text-gray-700 text-xs">(BNB test)</span>
        <span className="text-sm font-bold text-purple-700">${Web3.utils.fromWei(goal, 'ether')}</span>
      </div>
      <div className='flex flex-row my-4'>
        {
          author.toLowerCase() === localStorage.getItem('wallet')
            ? <button onClick={() => handleBtnCloseRequest()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">CLOSE</button>
            : <button onClick={handleBtnDonate} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">DONATE</button>
        }
      </div>
    </div >
  );
} 