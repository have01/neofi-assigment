import React, { useEffect, useState } from 'react'
import Header from './Header';
import Arrow from "./downarrow.png"
import { RxCross2 } from 'react-icons/rx';
const App = () => {
    const [message, setMessage] = useState('');
    const [coinName, setCoinName] = useState('btc');
    const [cryptoList, setCryptoList] = useState([])
    const [filterList, setFilterLIst] = useState([])
    const [showModal, setShowModal] = React.useState(false);
    const [searchValue, setSearchValue] = useState('')

    const handleFilterCoins = (value) => {
        setSearchValue(value)
        if (searchValue) {
            const filteredList = cryptoList.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase()))
            setFilterLIst(filteredList);
        } else {
            setCryptoList(cryptoList)
        }
        if (value === "") {

        }
    }
    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@aggTrade')
        console.log(socket)
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessage(message?.p)
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // const handleCryptoList = async () => {
        //   const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
        //   const options = {
        //     method: 'GET',
        //     mode: 'cors',
        //   };
        //   fetch(url, options)
        //     .then(response => response.json())
        //     .then(data => setCryptoList(data))
        //     .catch(error => console.log(error));
        // }

        // handleCryptoList();
        return () => socket.close(); // close websocket connection on unmounting
    }, [])

    // https://api.binance.com/api/v3/ticker/price

    return (
        <>
            <Header />
            <div className='container mx-auto flex justify-center items-center h-[100vh]'>
                <form class="w-[470px] h-[567px] bg-form-bg mx-auto  p-8 rounded-2xl shadow-md">
                    <div class="mb-4">
                        <div className=' text-white text-sm w-[390px] font-bold mb-2 flex mt-[76px] justify-between items-center'>
                            <label class="block text-white text-sm font-bold mb-2" for="name">Current Value</label>
                            <p className="text-[24px] text-blue-700">{Math.floor(message)} </p>
                        </div>
                        <div id="countries" class="bg-bg-select px-3 flex justify-between text-white  rounded-lg h-[60px] items-center mt-[20px] w-[390px] p-2.5" onClick={() => setShowModal(true)}>
                            <p className='text-[16px]'>Ethereum</p>
                            <p className=''><img src={Arrow} alt="" srcset="" /></p>
                        </div>
                    </div>
                    <div class="mt-[24px]">
                        <label class="block text-white text-[14px] text-sm font-bold mb-2" for="email">Amount you want to invest</label>
                        <input class="bg-form-bg px-3 py-2 border border-input-b bg-none h-[60px] items-center  w-[390px]  rounded-md focus:outline-0 mt-[12px]"
                            type="email" id="email" name="email" placeholder="0.00" />
                    </div>
                    <div class="mt-[24px]">
                        <label class="block text-white text-sm font-bold mb-2" for="password">Estimate Number of ETH You will Get</label>
                        <input class="text-white focus:outline-0 bg-bg-select mt-[12px] px-3 py-2 rounded-md text-sm  h-[60px] items-center  w-[390px]"
                            type="password" id="password" name="password" placeholder="0.00" disabled />
                    </div>

                    <button
                        class=" mt-[24px] bg-gradient-to-r from-regal-blue to-btn-Color text-white text-sm font-bold w-[389px] rounded-3xl h-[50px]"
                        type="submit">Buy</button>
                </form>

            </div>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg w-[410px] h-[461px] relative flex flex-col  bg-modal-bg outline-none focus:outline-none mt-20">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <button
                                        className="p-1 ml-auto  border-0 text-white  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className=" text-white  h-6 w-6 text-xl block">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex flex-col items-center justify-center ">
                                    <form class="flex items-center">
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative  rounded-3xl border  border-input-b w-[320px] ">
                                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                                                <svg aria-hidden="true" class="w-5 h-5 text-white dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input type="text" id="simple-search" class="bg-transparent  text-white text-sm rounded-lg focus:outline-0 block w-full pl-10 p-2.5   dark:placeholder-white " placeholder="Search chains" required onChange={(e) => handleFilterCoins(e.target.value)} />
                                        </div>
                                    </form>
                                    <div className='overflow-y-scroll no-scrollbar w-[320px] h-[250px] overflow-x-hidden mt-2 px-2'>
                                        {
                                            filterList.length > 1 ?
                                                filterList.map((coins, index) => (
                                                    <div className='flex justify-between items-center w-full h-[44px] py-2 cursor-pointer'>
                                                        <div className='flex flex-row'>
                                                            <img src={coins?.image} alt={coins?.symbol} srcset='' className='w-[24px] h-[24px]' />
                                                            <p className='text-white px-3'>{coins?.name}</p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                )) :
                                                cryptoList.map((coins, index) => (
                                                    <div className='flex justify-between items-center w-full h-[44px] py-2 cursor-pointer' onClick={() => setCoinName(coins.sym
                                                    )}>
                                                        <div className='flex flex-row'>
                                                            <img src={coins?.image} alt={coins?.symbol} srcset='' className='w-[24px] h-[24px]' />
                                                            <p className='text-white px-3'>{coins?.name}</p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                ))
                                        }

                                    </div>

                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* <div className=''> {message}</div>
      <div>
        <input type="text" value={symbol} onChange={handleSymbolChange} placeholder="Enter a symbol (e.g. BTC)" />
        <button onClick={handleSearch}>Search</button>
        {price && <p>Current price: {price}</p>}
      </div> */}
        </>

    )
}

export default App
