'use client'

import { useState, Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'


const CustomFilter = ({title, options, setFilter}:CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])
  console.log('Filter selected', selected)
  // const handleUpdateParams = (e:{title:string, value:string}) => {
  //   const newPathname = updateSearchParams(title, e.value.toLowerCase())
  //   router.push(newPathname)
  // }
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={e => {
          e.title === 'No select' ? setSelected(options[0]) : setSelected(e)
          e.title === 'No select' ? setFilter(options[0].value) : setFilter(e.value)
        }}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className="custom-filter__btn">
            <span className='block truncate'>{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              alt="chevron-up-down"
              width={20}
              height={20}
              className='ml-4 object-contain'
            />
          </Listbox.Button>
          <Transition
            // as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="custom-filter__options">
              {options.map(option => (
                <Listbox.Option 
                  key={option.title} 
                  value={option}
                  className={({active}) => `relative cursor-default select-none py-2 px-4 ${active
                    ? 'bg-primary-blue text-white'
                    : 'text-gray-900'}`}>
                  {({active}) => (
                    <span className={`block truncate ${active ? 'font-semibold' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              )).slice(1)}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter