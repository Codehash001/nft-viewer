import Head from 'next/head';
import { useState,useEffect } from "react"
import {
  getTokensFromOwnerES,
  getTokensFromOwnerSS
          } from '../ulits/interact'


export default function Mint(){

  const [walletAddress, setWalletAddress] = useState('');
  const [esTokens , setESTokens] = useState([]);
  const [ssTokens , setSSTokens] = useState([]);
  const [isLoading , setIsLoading] = useState(false);


  // function to load Evil Skellies NFTs
  const getESTokens = async () => {
    setESTokens(await getTokensFromOwnerES(walletAddress))
    console.log(esTokens)
  }

  // function to load Space Skellies NFTs
  const getSSTokens = async () => {  
    setSSTokens(await getTokensFromOwnerSS(walletAddress))
    console.log(ssTokens)
  }

  
  // function to get all nfts
  // this is the onClick function
  const getAllTokens = async () => {
    setIsLoading(true)
    await getSSTokens()
    await getESTokens()
    setIsLoading(false)
  }

  
  // handle the input of user's wallet address
  const handleInputChange = (event) => {
    setWalletAddress(event.target.value);
  };
  return (
    <div className='w-screen h-screen'>
          <div className='items-center justify-center mt-10 ml-10'>
        <input
        type="text"
        value={walletAddress}
        onChange={handleInputChange}
        className='w-[450px] border border-black rounded-md p-3'
        placeholder='Enter Wallet Address'
        />
      <button className='px-6 py-3 bg-black rounded-md text-white ml-10' onClick={getAllTokens}>Load NFTs</button>
    </div>

    <div className='flex w-full justify-center'>

    <div className='w-full flex flex-col items-center'>
    <h1 className='text-black text-3xl mt-10 font-bold'>Evil Skellies NFTs</h1>
    <div className="flex flex-wrap justify-center w-full">
   {
   isLoading ?
   <><div className='h-50 text-red-500 text-2xl font-semibold mt-10'>Loading</div></> :
   esTokens ? ( esTokens.map((token, index) => (
        <div key={index} className="m-4">
          <img
            src={`https://spaceships.spaceskellies.io/assets/spaceships/images/${token}.webp`}
            alt={`Evil Skellie ${token}`}
            className="w-64 h-48 object-cover rounded-md"
          />
        </div>
      )))
      : <></>
      }
      </div>
      </div>

      <div className='w-full flex flex-col items-center'>
      <h1 className='text-black text-3xl mt-10 font-bold'>Space Skellies NFTs</h1>
      <div className="flex flex-wrap justify-center w-full">
   {
   isLoading ?
   <><div className='h-50 text-red-500 text-2xl font-semibold  mt-10'>Loading</div></> : 
   ssTokens ? ( ssTokens.map((token, index) => (
        <div key={index} className="m-4">
          <img
            src={`https://ipfs.io/ipfs/bafybeiavall5udkxkdtdm4djezoxrmfc6o5fn2ug3ymrlvibvwmwydgrkm/${token}.jpg`}
            alt={`Space Skellie ${token}`}
            className="w-64 h-48 object-cover rounded-md"
          />
        </div>
      ))) : <></>}
      </div>
      </div>

      </div>
    </div>
  )
} 
