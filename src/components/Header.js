import React from 'react'
import logo from "../assests/NeoFi.png"

const Header = () => {
    return (
        <>

            <nav class="bg-header-bg fixed w-full z-20 top-0 left-0 ">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <img src={logo} class="h-8 mr-3" alt="Flowbite Logo" />
                    <div class="flex md:order-2">
                        <button type="button" class="text-white rounded-3xl focus:ring-blue-300 font-medium hidden sm:block text-sm w-[140px] h-[40px] text-center mr-3 md:mr-0 bg-gradient-to-r from-regal-blue to-btn-Color">Connect Wallet</button>
                        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div class="items-center bg-#0B0819 justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul class="flex flex-col bg-#0B0819 p-4 md:p-0 mt-4 font-medium  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                            <li className=" ">
                                <p href="#" class="block py-2 pl-3 pr-4 text-active-link  " aria-current="page">Home</p>
                            </li>
                            <li>
                                <p href="#" class="block py-2 pl-3 pr-4 text-header-link rounded  ">About</p>
                            </li>
                            <li>
                                <p href="#" class="block py-2 pl-3 pr-4 text-header-link rounded ">Services</p>
                            </li>
                            <li>
                                <p href="#" class="block py-2 pl-3 pr-4 text-header-link rounded  ">Contact</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >

        </>
    )
}

export default Header