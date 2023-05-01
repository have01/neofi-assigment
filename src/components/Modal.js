import React, { memo } from 'react'
import Checkmark from "../assests/checkmark.png"

const Modal = ({ setShowModal, showModal, filterList, cryptoList, setSelectedElement, selectedElement, handleCoin, handleFilterCoins }) => {

    const handleElementClick = (index) => {
        setSelectedElement(index);
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-modal-bg bg-opacity-50"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg w-[90vw] sm:w-[410px] h-[461px] relative flex flex-col  bg-modal-bg outline-none focus:outline-none mt-10 sm:mt-40 ">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <button
                                        className="p-1 ml-auto  border-0 text-white  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => {
                                            setShowModal(false)
                                            handleFilterCoins("")
                                        }}
                                    >
                                        <span className=" text-white  h-6 w-6 text-xl block">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex flex-col items-center justify-center ">
                                    <div class="flex items-center">
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative  rounded-3xl border  border-input-b w-[320px] ">
                                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                                                <svg aria-hidden="true" class="w-5 h-5 text-white dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input type="text" id="simple-search" class="bg-transparent  text-white text-sm rounded-lg focus:outline-0 block w-full pl-10 p-2.5   dark:placeholder-white " placeholder="Search chains" required onChange={(e) => handleFilterCoins(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='overflow-y-scroll no-scrollbar w-[320px] h-[270px] overflow-x-hidden mt-2 px-2'>
                                        {
                                            filterList.length > 0 ?
                                                filterList.map((coins, index) => (
                                                    <div className={` ${selectedElement === index && 'bg-active-coin '} rounded-sm flex justify-between items-center w-full h-[44px] p-3 hover:bg-active-coin cursor-pointer`}
                                                        key={index}
                                                        onClick={() => {
                                                            handleElementClick(index)
                                                            handleCoin(coins)
                                                        }}>
                                                        <div className=' w-full flex flex-row justify-between items-center'>
                                                            <div className='flex flex-row '>
                                                                <img src={coins?.image} alt={coins?.symbol} srcset='' className='w-[24px] h-[24px] ' />
                                                                <p className='text-white px-3'>{coins?.name}</p></div>
                                                            <div>  {selectedElement === index && <span><img src={Checkmark} alt="checkmark" srcset="" /></span>}</div>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                )) :
                                                cryptoList.map((coins, index) => (
                                                    <div className={` ${selectedElement === index && 'bg-active-coin '} rounded-sm flex justify-between items-center w-full h-[44px] p-3 hover:bg-active-coin cursor-pointer`}
                                                        key={index}
                                                        onClick={() => {
                                                            handleElementClick(index)
                                                            handleCoin(coins)
                                                        }}>
                                                        <div className=' w-full flex flex-row justify-between items-center'>
                                                            <div className='flex flex-row '>
                                                                <img src={coins?.image} alt={coins?.symbol} srcset='' className='w-[24px] h-[24px] ' />
                                                                <p className='text-white px-3'>{coins?.name}</p></div>
                                                            <div>  {selectedElement === index && <span><img src={Checkmark} alt="checkmark" srcset="" /></span>}</div>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                ))
                                        }

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </>
            ) : null}
        </>
    )
}

export default memo(Modal)