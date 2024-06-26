import React, { useState } from 'react'
import Image from 'next/image'
import { GlobeIcon, MenuIcon, SearchIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router"
 

function Header({ placeholder }) {

    const [searchInput, setSearchInput] = useState('');
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const router = useRouter()
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key:'selection'
    }
    const [nbGuests, setnbGuests] = useState(1)

    const handleSelect = (ranges) => {
        setstartDate(ranges.selection.startDate);
        setendDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput('');
    }
    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                nbGuests,
            }

        })
    }
    
    /* console.log(searchInput) */
    /* console.log(nbGuests) */
  
    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
            {/* left part */}
            <div onClick={() => router.push('/')}
                className='relative flex items-center h-10 cursor-pointer my-auto'>
                <Image src='https://links.papareact.com/qd3'
                    layout="fill"
                    objectFit='contain'
                    objectPosition='left'
                    />
            </div>

             {/* mid part */}
             <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
                <input
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400' type='text'
                    placeholder={placeholder || 'Start your search'}/>
                <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
            </div>

            {/* right part */}
            <div className='flex items-center space-x-4 justify-end text-gray-500'>
                <p className='hidden md:inline cursor-pointer'>Become a host</p>
                <GlobeIcon className='h-6 cursor-pointer'/>

                <div className='flex space-x-2 border-2 p-2 rounded-full'>
                    <MenuIcon className='h-6'/>
                    <UserCircleIcon className='h-6'/>
                </div>
            </div>
        
            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto'>
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className='flex items-center border-b mb-4'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                        <UserIcon className='h-5'/>
                        <input
                            value={nbGuests}
                            onChange={event => setnbGuests(event.target.value)}
                            type='number'
                            min={1}
                            className='w-12 pl-2 text-lg outline-none text-red-400'
                        />
                    </div>
                    <div className='flex'>
                        <button onClick={resetInput}
                            className='flex-grow text-gray-500'>Cancel</button>
                        <button onClick={search} className='flex-grow text-red-400'>Search</button>
                    </div>
                </div>
            )}

        </header>
      )
}

export default Header