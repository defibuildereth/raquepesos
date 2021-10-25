import React, { useState } from 'react';
import ConnectionContainer from './ConnectionContainer';
import InfoContainer from './InfoContainer';
import abi from "../utils/DemoToken.json";
import { ethers } from "ethers";
import styled from "styled-components";




const PageContainer = ({ }) => {

    const [currentAccount, setCurrentAccount] = useState("");


    const { ethereum } = window;



    const [blockNumber, setBlockNumber] = useState(0);

    const contractAddress = "0x5AFbe20328E6c180Db77FdBEA5A36e2Af86F06D0";

    const contractABI = abi.abi;

    const provider = new ethers.providers.Web3Provider(ethereum);


    provider.on("block", (blockNumber) => {
        setBlockNumber(blockNumber);
        // console.log(blockNumber);
    })

    const Title = styled.h1`
    text-align: center;
    color: palevioletred;
    `; 
    const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
    `;  

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

    return (<>
        <Wrapper>
        <Title>
        Raquepesos

        </Title>
        {!currentAccount && (
                <button className="connectButton" onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}
        <ConnectionContainer contractAddress={contractAddress} contractABI={contractABI} provider={provider} />
        <InfoContainer />
        <h3>Block Number: {blockNumber}</h3>

        </Wrapper>

    </>
    )

}

export default PageContainer;