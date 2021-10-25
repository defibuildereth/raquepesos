import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import styled from "styled-components";



const ConnectionContainer = ({ contractABI, contractAddress, provider }) => {

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])


    const [userInput, setUserInput] = useState("");
    const [userInput2, setUserInput2] = useState("");

    const [currentAccount, setCurrentAccount] = useState("");


    const [pendingTx, setPendingTx] = useState(false);

    const [allStakes, setAllStakes] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const [userAvailableBalance, setUserAvailableBalance] = useState(0);

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

    provider.on("pending", (tx) => {
        console.log(tx);
        setPendingTx(true);
    });

    const getAllBalances = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const demoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const accounts = await ethereum.request({ method: 'eth_accounts' });
                const account = accounts[0];



                const balance = await demoPortalContract.stakeOf(account);
                let readable_balance = ethers.utils.formatEther(balance)
                setUserBalance(readable_balance);


                const availableBalance = await demoPortalContract.balanceOf(account);
                let readable_user_balance = ethers.utils.formatEther(availableBalance)
                setUserAvailableBalance(readable_user_balance)

                const stakes = await demoPortalContract.totalStakes();
                let readable_stakes = ethers.utils.formatEther(stakes);
                setAllStakes(readable_stakes);

            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
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

            // const provider = new ethers.providers.Web3Provider(ethereum);
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

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    // daiContract.on("Transfer", (from, to, amount, event) => {
    //     console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);



    return (<>

        <ConnectionContainer>
            <p>Available to stake: {financial(userAvailableBalance)}</p>
            <form>
                <label>Amount:
                    <input type='number' value={userInput} onChange={handleUserInput}></input></label>
            </form>

            <button className="stakeButton" onClick={() => stake(userInput)}>
                Stake
            </button>

            <p>Currently Staked: {financial(userBalance)}</p>

            <p>Total staked - {financial(allStakes)}</p>

            <p>Your share: {financial(userBalance / allStakes * 100)}%</p>

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

            {!currentAccount && (
                <button className="connectButton" onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}

        </ConnectionContainer>







    </>
    )
}



export default ConnectionContainer;