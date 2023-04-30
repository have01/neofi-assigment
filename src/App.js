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
  const [cryptoList, setCryptoList] = useState(Data);
  const [filterList, setFilterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [coinName, setCoinName] = useState('btc');
  const [loading, setloading] = useState(true)

  // Filtercoin 

  const handleFilterCoins = (value) => {
    if (value) {
      const filteredList = cryptoList.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterList(filteredList);
    } else {
      setFilterList([]);
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
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinName}usdt@aggTrade`);
    const handleSocketMessage = (event) => {
      const response = JSON.parse(event.data);
      const convertToInr = Math.floor(response.p) * 80;
      setPrice(convertToInr);
      setloading(false)
    };
    const handleSocketError = (error) => {
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
      <Suspense fallback={<div className='container mx-auto '><Loader /></div>}>
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
