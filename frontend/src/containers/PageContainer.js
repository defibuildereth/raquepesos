import React, { useState, useEffect } from 'react';
import ConnectionContainer from './ConnectionContainer';
import abi from "../utils/DemoToken.json";
import { ethers } from "ethers";
import styled from "styled-components";


const PageContainer = ({ }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [allStakes, setAllStakes] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const [userAvailableBalance, setUserAvailableBalance] = useState(0);

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [currentAccount])

    const { ethereum } = window;

    const checkIfWalletIsConnected = async () => {

        try {

            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("we have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const account = accounts[0];

            const signer = provider.getSigner();
            const demoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account: ", account);
                setCurrentAccount(account)

            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }

        getAllBalances();
    }

    const [blockNumber, setBlockNumber] = useState(0);
    const contractAddress = "0x5AFbe20328E6c180Db77FdBEA5A36e2Af86F06D0";
    const contractABI = abi.abi;
    const provider = new ethers.providers.Web3Provider(ethereum);

    provider.on("block", (blockNumber) => {
        setBlockNumber(blockNumber);
        // console.log(blockNumber);
    })

    const getAllBalances = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const demoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const accounts = await ethereum.request({ method: 'eth_accounts' });
                const account = accounts[0];

                const stakes = await demoPortalContract.totalStakes();
                let readable_stakes = ethers.utils.formatEther(stakes);
                setAllStakes(readable_stakes);

                const balance = await demoPortalContract.stakeOf(account);
                let readable_balance = ethers.utils.formatEther(balance)
                setUserBalance(readable_balance);


                const availableBalance = await demoPortalContract.balanceOf(account);
                let readable_user_balance = ethers.utils.formatEther(availableBalance)
                setUserAvailableBalance(readable_user_balance)

            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const Title = styled.h1`
    font-size: 80px;
    text-align: center;
    color: #AC3B61;
    `;
    // const Wrapper = styled.section`
    // padding: 1em;
    // background: papayawhip;
    // `;

    return (<>
            <Title>
                RaquePesos
            </Title>

            <h2>Buy RaquePesos on Uniswap</h2>

            <br></br>
            
            <div id="container">
            {!currentAccount && (
                <button className="connectButton" onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}
            
            <ConnectionContainer getAllBalances={getAllBalances} provider={provider} contractABI={contractABI} contractAddress={contractAddress} userBalance={userBalance} allStakes={allStakes} currentAccount={currentAccount} userAvailableBalance={userAvailableBalance} />
            </div>
            
        
        <h3>Block Number: {blockNumber}</h3>

    </>
    )

}

export default PageContainer;