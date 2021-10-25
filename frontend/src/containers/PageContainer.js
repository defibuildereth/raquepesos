import React, { useState } from 'react';
import ConnectionContainer from './ConnectionContainer';
import InfoContainer from './InfoContainer';
import abi from "../utils/DemoToken.json";
import { ethers } from "ethers";
import styled from "styled-components";




const PageContainer = ({ }) => {

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


    return (<>
        <Wrapper>
        <Title>
        Raquepesos
        <h3>Block Number: {blockNumber}</h3>

        </Title>
        <ConnectionContainer contractAddress={contractAddress} contractABI={contractABI} provider={provider} />
        <InfoContainer />
        </Wrapper>

    </>
    )

}

export default PageContainer;