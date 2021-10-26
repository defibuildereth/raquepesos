import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import styled from "styled-components";



const ConnectionContainer = ({ provider, contractAddress, contractABI, userAvailableBalance, allStakes, getAllBalances, currentAccount, userBalance }) => {

    const [userInput, setUserInput] = useState("");
    const [userInput2, setUserInput2] = useState("");

    const [timer, setTimer] = useState(false);

    const [pendingTx, setPendingTx] = useState(null);
    const [completedTx, setCompletedTx] = useState(null);

    // setTimeout(() => {
    //     this.setState({
    //       animationFlag: true
    //     })
    //   }, 4000)
  

    useEffect( () => {
        setTimeout(() => {
            setTimer(true)
        }, 45000)
    }, [])

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
    }

    const handleUserInput2 = (event) => {
        setUserInput2(event.target.value)
    }

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    const withdraw = async (userInput2) => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                // const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const demoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const stakeTxn = await demoPortalContract.removeStake(ethers.utils.parseEther(userInput2));
                console.log("Mining...", stakeTxn.hash);
                setPendingTx(stakeTxn.hash);

                await stakeTxn.wait();
                console.log("Mined --", stakeTxn.hash);
                setPendingTx(null);
                setCompletedTx(stakeTxn.hash);

                getAllBalances();

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
                setPendingTx(stakeTxn.hash);

                await stakeTxn.wait();
                console.log("Mined --", stakeTxn.hash);
                console.log("no longer mining Tx:", stakeTxn.hash)
                setCompletedTx(stakeTxn.hash);
                console.log(completedTx);


                setPendingTx(null);

                getAllBalances();

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }


    const TransactionBox = styled.section`
    padding: 2em;
    background: #BAB2B5;
    color: white;
    border-radius: 20px;
    width: 600px;
    margin: auto;
    `;

    const TransactionConfirmedBox = styled.section`
    background: #123C69;
    padding: 2em;
    color: white;
    border-radius: 20px;
    width: 600px;
    margin: auto;
    `;


    return (<>
        <section>

            {pendingTx && (
                <TransactionBox>There is a pending transaction!<a target="_blank"  href={`https://rinkeby.etherscan.io/tx/${pendingTx}`}>View Details Here</a></TransactionBox>)
            }
            
            


            {completedTx && !timer &&(
                <TransactionConfirmedBox>Your transaction has completed! <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${completedTx}`}>View Details Here</a></TransactionConfirmedBox>
            )}  

            {currentAccount && (
                <>

                    <p>Available to stake: {financial(userAvailableBalance)}</p>
                    <form>
                        <label>Amount:
                            <input type='number' value={userInput} onChange={handleUserInput}></input></label>
                    </form>
                    <div>
                    <button className="ui primary button" onClick={() => stake(userInput)}>
                        Stake
                    </button>
                    </div>

                    <p>Total staked - {financial(allStakes)}</p>

                    <p>Currently Staked: {financial(userBalance)}</p>
                    <br></br>
                    <p>Your share: {financial(userBalance / allStakes * 100)}%</p>
                    <form>
                        <label>Amount:
                            <input type='number' value={userInput2} onChange={handleUserInput2}></input></label>
                    </form>
                    <button className="ui secondary button" onClick={() => withdraw(userInput2)}>
                        Withdraw
                    </button>
                </>
            )}
        </section>
    </>
    )
}

export default ConnectionContainer;