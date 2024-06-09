
import Web3 from 'web3';
import ABI from './ABI.json';
import { Request } from '../types/RequestType';

const CONTRACT_ADDRESS = '0x2f680944B0A3469EB3847e0d38751678C773B48d';


declare global {
    interface Window {
      ethereum: any;
    }
  }

  function getContract() {
    if (!window.ethereum) {
      throw new Error ('Please install metamask');
    }

    const from = localStorage.getItem('wallet');

  if (!from) {
      throw new Error('Please connect to metamask');
  }
    const web3 = new Web3(window.ethereum);

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
  }

  export async function doLogin() {
    if (!window.ethereum) {
        throw new Error ('Please install metamask');
      }
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) {
        throw new Error('Please connect to metamask');
    }
    localStorage.setItem('wallet', accounts[0].toLowerCase());

    return accounts[0];
  }

 export async function getOpenRequests(lastId=0) {
    const contract = getContract();
    const requests: Request[] = await contract.methods.getOpenRequests(lastId+1, 10).call();
    if (!Array.isArray(requests)) {
      console.error('getOpenRequests did not return an array');
      return [];
  }

    return requests.filter(rq => rq.title !== "")
  }

  export async function openRequest(title: string, description: string, contact: string, goal: string) {
    const contract = getContract();
    const result = await contract.methods.openRequest(title, description, contact, Web3.utils.toWei(goal, 'ether')).send();
    return result;
  }

  export async function closeRequest(requestId: number) {
    const contract = getContract();
    const result = await contract.methods.closeRequest(requestId).send();
    return result;
  }

  export async function donate(requestId: number, amount: string) {
    const contract = getContract();
    const result = await contract.methods.donate(requestId).send({ value: Web3.utils.toWei(amount, 'ether') });
    return result;
  }
