import React from 'react'
import Arrow from "../assests/downarrow.png"
import Loader from './Loader'



const Form = ({ coins, price, totalCoins, cryptoQuantity, setShowModal, cryptoList, loading, investAmount }) => {

    return (
        <div className='container mx-auto flex justify-center items-center h-[90vh] sm:mt-20 overflow-hidden'>
            <div class="w-[90vw] sm:w-[470px]  bg-form-bg sm:h-[567px] bg-div-bg mx-auto border-t border-input-b  mt-20 sm:mt-1 p-8 rounded-2xl shadow-md relative">
                <div className=' -top-[20px] bg-bg-select p-3  border-black border-4 rounded-full items-center text-center absolute left-1/2 transform -translate-x-1/2'>
                    <img src={coins?.image ? coins?.image : cryptoList[0].image} alt="" srcset="" className='w-[44px] h-[44px] rounded-full ' /></div>
                <img src="" alt="" srcset="" />
                <div class="mb-4 ">
                    <div className=' text-white text-sm w-full sm:w-full font-bold mb-2 flex flex-row mt-[76px] justify-between items-center'>
                        <label class="block text-white text-sm font-bold mb-2" for="name">Current Value</label>
                        <p className="text-[24px] text-blue-700 flex flex-row items-center justify-between">₹ {loading ? <Loader /> : price} </p>
                    </div>
                    <div id="countries" class="bg-bg-select px-3 flex justify-between text-white  rounded-lg h-[60px] items-center mt-[20px] w-full sm:w-full p-2.5" onClick={() => setShowModal(true)}>
                        <p className='text-[16px] flex flex-row' ><img src={coins?.image ? coins?.image : cryptoList[0]?.image} alt="" srcset="" className='w-[24px] h-[24px] mr-2' />{coins?.name ? coins?.name : cryptoList[0]?.name}</p>
                        <p className=''><img src={Arrow} alt="" srcset="" /></p>
                    </div>
                </div>
                <div class="mt-[20px]">
                    <label class="block text-white text-[14px] text-sm font-bold mb-2" for="email">Amount you want to invest</label>
                    <div className='w-full flex h-[60px] flex-row justify-between items-center border border-input-b mt-[12px] px-2'>
                        <input class="bg-form-bg text-white px-3  bg-none h-[50px] items-center w-full sm:w-3/4  rounded-md focus:outline-0 "
                            value={investAmount}
                            type="email" id="email" name="email" placeholder="0.00" onChange={(e) => cryptoQuantity(e.target.value)} />
                        <p className='text-blue-700 text-[16px]'>INR</p>
                    </div>
                </div>
                <div class="mt-[24px]">
                    <label class="block text-white text-sm font-bold mb-2" for="password">Estimate Number of {coins?.name} You will Get</label>
                    <input class="text-white focus:outline-0 bg-bg-select mt-[12px] px-3 py-2 rounded-md text-sm  h-[60px] items-center w-full  sm:w-full"
                        type="password" id="password" name="password" placeholder={totalCoins ? totalCoins : "0.00"} disabled />
                </div>

                <button
                    class=" mt-[24px] bg-gradient-to-r from-regal-blue to-btn-Color text-white text-sm font-bold  w-full sm:w-full rounded-3xl h-[50px]"
                    type="">Buy</button>
            </div>
        </div>
    )
}

export default Form