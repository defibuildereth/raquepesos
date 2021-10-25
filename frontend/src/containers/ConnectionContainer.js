import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import styled from "styled-components";



const ConnectionContainer = ({provider, contractAddress, contractABI, userAvailableBalance, allStakes, currentAccount, userBalance}) => {



    const [userInput, setUserInput] = useState("");
    const [userInput2, setUserInput2] = useState("");

    // const [pendingTx, setPendingTx] = useState("");

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
    }

    const handleUserInput2 = (event) => {
        setUserInput2(event.target.value)
    }

    const ConnectionContainer = styled.section`
                color: orange;
                background-color: green;
                padding: 16px;
                border-radius: 12px
                `

    // provider.on("pending", (tx) => {
    //     console.log(tx);
    //     setPendingTx(tx);
    // });


    const withdraw = async (userInput2) => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                // const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const demoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const stakeTxn = await demoPortalContract.removeStake(ethers.utils.parseEther(userInput2));
                console.log("Mining...", stakeTxn.hash);

                await stakeTxn.wait();
                console.log("Mined --", stakeTxn.hash);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const stake = async (userInput) => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                // const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const demoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const stakeTxn = await demoPortalContract.createStake(ethers.utils.parseEther(userInput));
                console.log("Mining...", stakeTxn.hash);

                await stakeTxn.wait();
                console.log("Mined --", stakeTxn.hash);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    // daiContract.on("Transfer", (from, to, amount, event) => {
    //     console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);



    return (<>





        {/* <p>The pending tx is: {pendingTx}</p> */}

        <ConnectionContainer>
            <p>Available to stake: {userAvailableBalance}</p>
            <form>
                <label>Amount:
                    <input type='number' value={userInput} onChange={handleUserInput}></input></label>
            </form>

            <button className="stakeButton" onClick={() => stake(userInput)}>
                Stake
            </button>

            <p>Currently Staked: {userBalance}</p>

            <p>Total staked - {allStakes}</p>

            <p>Your share: {userBalance / allStakes * 100}%</p>

            {userBalance && (
                <>

                    <form>
                        <label>Amount:
                            <input type='number' value={userInput2} onChange={handleUserInput2}></input></label>
                    </form>
                    <button className="withdrawButton" onClick={() => withdraw(userInput2)}>
                        Withdraw
                    </button>


                </>
            )}

            

        </ConnectionContainer>
    </>
    )
}



export default ConnectionContainer;