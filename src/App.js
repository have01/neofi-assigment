import React, { useEffect, useState, memo, lazy, Suspense } from 'react';
import { Data } from './CryptoList/data';
import Loader from './components/Loader';


const Header = lazy(() => import('./components/Header'))
const Form = lazy(() => import('./components/Form'))
const Modal = lazy(() => import('./components/Modal'))

const App = () => {
  const [price, setPrice] = useState('');
  const [totalCoins, setTotalCoins] = useState('');
  const [coins, setCoins] = useState('eth');
  const [investAmount, setinvestAmount] = useState("")
  const [cryptoList, setCryptoList] = useState(Data); //crypto list on click to select coins
  const [filterList, setFilterList] = useState([]); //serach result from user input 
  const [showModal, setShowModal] = useState(false); //toggle modal 
  const [coinName, setCoinName] = useState('btc');
  const [loading, setloading] = useState(true)
  const [selectedElement, setSelectedElement] = useState(null);
  // Filtercoin 

  const handleFilterCoins = (value) => {
    if (value) {
      const filteredList = cryptoList.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase()) || coin.symbol.toLowerCase().includes(value.toLowerCase()));
      setFilterList(filteredList);

    } else {
      setFilterList([]);
      setSelectedElement(null)
    }
  };

  // On  invest amount the crypto value get

  const cryptoQuantity = (value) => {
    setinvestAmount(value)
    const total = value / price;
    setTotalCoins(total);
  };

  // on open modal select coin to get detail 
  const handleCoin = (coins) => {
    setCoins(coins);
    setCoinName(coins?.symbol);
    setloading(true)
    setTotalCoins("")
    setinvestAmount("")
    setPrice("")
  };

  useEffect(() => {
    // Binance socket connection to fetch live price of coin
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinName}usdt@aggTrade`);
    const handleSocketMessage = async (event) => {
      const response = await JSON.parse(event.data);
      const convertToInr = await response.p * 80;
      setPrice(convertToInr.toFixed(2));
      setloading(false)
    };
    const handleSocketError = async (error) => {
      console.error('WebSocket error:', error);
    };

    const handleSocketClose = () => {
      console.log('WebSocket connection closed');
    };

    socket.addEventListener('message', handleSocketMessage);
    socket.addEventListener('error', handleSocketError);
    socket.addEventListener('close', handleSocketClose);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
      socket.removeEventListener('error', handleSocketError);
      socket.removeEventListener('close', handleSocketClose);
      socket.close();
    };
  }, [coinName]);

  return (
    <>
      <Suspense fallback={<div className='container mx-auto flex items-center justify-center w-full h-[100vh] '><Loader /></div>}>
        <Header />
        <Form
          coins={coins}
          cryptoList={cryptoList}
          price={price}
          totalCoins={totalCoins}
          cryptoQuantity={cryptoQuantity}
          setShowModal={setShowModal}
          loading={loading}
          investAmount={investAmount}
        />
        <Modal
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setShowModal={setShowModal}
          showModal={showModal}
          filterList={filterList}
          cryptoList={cryptoList}
          handleCoin={handleCoin}
          handleFilterCoins={handleFilterCoins}
        />
      </Suspense>
    </>
  );
};

export default memo(App);
