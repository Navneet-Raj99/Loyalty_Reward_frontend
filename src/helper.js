import { ethers, providers } from "ethers";

export const connectWallet = async () => {
    if (window.ethereum) {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return {
            accountFound: true,
            account: account[0]
        }
    } else {
        return {
            accountFound: false,
            account: ""
        }
    }

}