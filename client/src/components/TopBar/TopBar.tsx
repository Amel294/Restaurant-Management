// Path: client\src\components\TopBar\TopBar.tsx

import { Bell, Gift, MessageSquareMore, SearchIcon, Settings } from 'lucide-react';
import avatar from '../../assets/Avatar.jpeg';

const TopBar = () => {
    return (
        <header className="w-full flex flex-col sm:flex-row lg:pr-10 justify-between">
            
            <div className="w-full bg-white rounded-md px-4 py-2 flex items-center focus-within:outline-none focus-within:ring-1 focus-within:ring-inset focus-within:ring-blue-500 transition-all ease-in-out duration-100 mb-4 lg:mb-0">
                <input
                    type="text"
                    className="w-full ml-2 pl-2 text-sm text-gray-700 bg-transparent focus:outline-none"
                    placeholder="Search here"
                />
                <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>

            <div className='flex flex-col md:flex-row  items-center '>
                
                <div className="flex gap-6 ps-6 mx-10 md:mx-0 mb-4 lg:mb-0 justify-between w-full">
                    <div className="relative w-fit h-fit bg-blue-200 rounded-2xl p-2 flex items-center justify-center cursor-pointer">
                        <Bell />
                        <div className="absolute -top-2 -right-1 w-5 h-5 bg-blue-500 border-2 rounded-full text-white text-xxs flex items-center justify-center">
                            21
                        </div>
                    </div>
                    <div className="relative w-fit h-fit bg-blue-200 rounded-2xl p-2 flex items-center justify-center cursor-pointer">
                        <MessageSquareMore />
                        <div className="absolute -top-2 -right-1 w-5 h-5 bg-blue-500 border-2 rounded-full text-white text-xxs flex items-center justify-center">
                            21
                        </div>
                    </div>
                    <div className="relative w-fit h-fit bg-gray-300 rounded-2xl p-2 flex items-center justify-center cursor-pointer">
                        <Gift className="text-gray-800" />
                        <div className="absolute -top-2 -right-1 w-5 h-5 bg-gray-800 border-2 rounded-full text-white text-xxs flex items-center justify-center">
                            21
                        </div>
                    </div>
                    <div className="relative w-fit h-fit bg-red-200 rounded-2xl p-2 flex items-center justify-center cursor-pointer">
                        <Settings className="text-red-500" />
                        <div className="absolute -top-2 -right-1 w-5 h-5 bg-blue-500 border-2 rounded-full text-white text-xxs flex items-center justify-center">
                            21
                        </div>
                    </div>
                </div>

                <div className='flex flex-row h-full'>
                    
                    <div className="h-full border-[0.1px] border-gray-400 mx-6 hidden lg:block"></div>

                    <div className="w-full flex items-center justify-between lg:w-auto gap-6">
                        <div className=" lg:flex items-center space-x-2">
                            <div className='text-3xl md:text-base'>

                                <span className="">Hello,</span>
                                <span className="font-semibold">Amel</span>
                            </div>
                        </div>
                        
                        <img
                            src={avatar}
                            className="w-9 h-9 rounded-full  md:block"
                            alt="Avatar"
                        />
                    </div>

                </div>
            </div>
        </header>
    );
};

export default TopBar;
