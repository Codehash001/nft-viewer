const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
import { config } from '../dapp.config'

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL)
const esContract = require('../abi/evilSkellies.json')
const evilSkelliesContract = new web3.eth.Contract(esContract.abi, config.evil_skellies_contractAddress)

const ssContract = require('../abi/spaceSkellies.json')
const spaceskelliesContract = new web3.eth.Contract(ssContract.abi, config.space_skellies_contractAddress)

export const getTokensFromOwnerES = async (walletAddress) => {
  const tokens = await evilSkelliesContract.methods.tokensOfOwner(walletAddress).call()
  return tokens
}

export const getTokensFromOwnerSS = async (walletAddress) => {
  const tokens = await spaceskelliesContract.methods.walletOfOwner(walletAddress).call()
  return tokens
}


// optional
export const getTokenURIs = async (tokenID) => {
  const URI = await nftContract.methods.tokenURI(tokenID , timeout = 10000).call()
  return URI
}