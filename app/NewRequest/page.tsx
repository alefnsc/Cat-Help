'use client';
import { useState } from 'react';
import { openRequest } from "app/services/Web3Service";
import Image from 'next/image';

export default function NewRequest() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [goal, setGoal] = useState('');

    function handleBtnClose() {
        window.location.href = '/';
    }

    async function handleFormSubmit(event: any) {
        event.preventDefault();

        try {
            await openRequest(title, description, contact, goal)
                .then(() => alert('Request created successfully. The changes will be reflected shortly.'));
            window.location.href = '/';
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-start bg-white">

            <form onSubmit={handleFormSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
                <Image className='m-auto' src="/CatHelp.png" alt="CatHelp" width={100} height={100} />
                <h1 className="text-4xl font-bold text-center text-pink-500 mb-8">New Request</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Contact:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="contact" name="contact" value={contact} onChange={e => setContact(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
                        Goal (BNB):
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="goal" name="goal" value={goal} onChange={e => setGoal(e.target.value)} />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <button onClick={handleBtnClose} className="flex-3 inline-block align-baseline font-bold text-sm py-2 px-4  text-pink-500 hover:text-pink-800 rounded border border-pink-600 focus:outline-none focus:shadow-outline">
                        Close
                    </button>
                    <button onClick={handleFormSubmit} className="flex-1 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}