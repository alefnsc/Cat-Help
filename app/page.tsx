'use client';
import { Request as AppRequest } from './types/RequestType';
import React, { useEffect, useState } from 'react';
import { getOpenRequests } from './services/Web3Service';
import { Wrapper } from './components/Wrapper/Wrapper';

const IndexPage: React.FC = () => {
    const [requests, setRequests] = useState<AppRequest[]>([]);

    useEffect(() => {
        async function loadRequests(lastId: number) {
            try {
                const newRequests: AppRequest[] = await getOpenRequests(lastId);
                if (lastId === 0) {
                    setRequests(newRequests);
                } else {
                    const updatedRequests = [...requests, ...newRequests];
                    setRequests(updatedRequests);
                }
            } catch (error: any) {
                alert(error.message);
            }
        }
        loadRequests(0);
    }, []);

    return (
        <Wrapper requests={requests} />
    );
};

export default IndexPage;