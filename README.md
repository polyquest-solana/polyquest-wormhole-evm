# Polyquest Wormhole smart contract

## 1. BSC, Base, ARB, Avax Wormhole integration code
Link: [Polyquest Wormhole EVM](https://github.com/polyquest-solana/polyquest-wormhole-evm)

### Smart contract addresses
```
Wormhole integration BSC testnet: 0xA081972981013799A5fB5b573CaC6cc75Dc4F1Eb
Wormhole integration Base Sepolia: 0xEBbB9316B91D8dCEA5BcC472F9c43163F96A9007
Wormhole integration Arbitrum Sepolia: 0x6dFbA3394EE4Cf592c2aD72712DE9892F0aa1433
Wormhole integration Avalanche: 0x90a999c7c9e50ed9F46Eaf3a9f9996E166b040Be
```
For more addresses of each chain, go to `scripts\constant`

### Backend code
- Betting messaging backend in: `backend\BettingCrossChain`
- Token transferring backend in: `backend\RewardCrossChain`

### Handling prediction data transfers using Wormhole's publishMessage and verifyVAA function
- Messaging betting data from Bsc, Base, Arbitrum, Avalanche to Solana: using Wormhole's `publishMessage` in `sendMessageToSolana` function in `contracts\WormholeBridge.sol`.
- Messaging reward data from Solana to Bsc, Base, Arbitrum, Avalanche: using Wormhole's `parseAndVerifyVM` in `receiveSolanaMessage` function in `contracts\WormholeBridge.sol`.

## 2. Testing framework and QA

### Installation
Install all packages using
```
npm i -f
```
Then, create `.env` file with variables based on key-value pairs from `.env.example`
```
PUBLIC_KEY=
PRIVATE_KEY=
INFURA_KEY=
```
There are 2 flow: Betting cross-chain and receiving reward cross-chain

### Send betting message to Solana market program
Run this command:
```
npx hardhat bet WORMHOLE_CHAIN_ID TOKEN_ADDRESS AMOUNT MARKET_KEY ANSWER_KEY
```
* WORMHOLE_CHAIN_ID: Wormhole's evm chain id (BSC, Base Sepolia, Arbitrum Sepolia, Avalanche)
* TOKEN_ADDRESS: address of token used to bet cross-chain
* AMOUNT: amount of token used to bet cross-chain
* MARKET_KEY: the active market id
* ANSWER_KEY: the selected answer id
The betting cross-chain messaging's flow will be shown on the terminal.

### Receive reward token from Solana market program (only WSOL at the moment)
Run this command:
```
npx hardhat reward WORMHOLE_CHAIN_ID AMOUNT
```
* WORMHOLE_CHAIN_ID: Wormhole's evm chain id (BSC, Base Sepolia, Arbitrum Sepolia, Avalanche)
* AMOUNT: amount of token rewarded cross-chain
The token transfer's flow will be shown on the terminal.

## 3. User(dev) guide

### Getting started
This repository is an EVM smart contract for users who make predictions to Polyquest's markets from BSC, Base, Arbitrum and Avalanche. There are 2 user flow:
- Betting cross-chain: Users will interact with this smart contract, and the smart contract will send a cross-chain message to Polyquest by backend.
- Rewarding cross-chain: Users will call the backend to make a token transferring transaction from Solana. Then users will interact with this smart contract to redeem transferring message and collect the reward.

### Betting cross-chain
Users from BSC, Base, Arbitrum and Avalanche can normally access Polyquest by visiting `https://polyquest.xyz/quests` and connecting their wallet.
Users can select a market by click to the market.
After selecting the market, users select one of the answers (below the `Vote` button) and enter the amount of token used for betting in the `Amount` input (next to the `Vote` button).
Finally, users press `Vote` button to make their predictions. Their assets will be locked in this smart contract, and their cross-chain betting data will be transferred to Solana market.
### Receiving reward cross-chain
After a market success, users can visit `/myPage` site to look for their reward.
User press `Reward` tab to show their rewards.
User can press `Claim` button to claim their reward from Solana.