'use client'

import { useState, FormEvent, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SearchManufacturer } from '.'

const SearchButton = ({otherClasses}:{otherClasses:string}) => {
  return (
    <button
      type="submit"
      className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying-glass"
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  )
}

type searchBarProps = {
  setManufacturer: Dispatch<SetStateAction<string>>
  setModel: Dispatch<SetStateAction<string>>
}

const SearchBar = ({setManufacturer, setModel}:searchBarProps) => {
  const [searchManufacturer, setSearchManufacturer] = useState('')
  const [searchModel, setSearchModel] = useState('')
  const router = useRouter()
  // console.log('manufacturer', manufacturer)
  // console.log('model', model)
  const handleSearch = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchManufacturer === '' && searchModel === '') {
      return alert('Please fill in the search bar')
    }
    setManufacturer(searchManufacturer)
    setModel(searchModel)
    // updateSearchParams(searchManufacturer.toLowerCase(), searchModel.toLowerCase())
  }
  const updateSearchParams = (manufacturer:string, model:string) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }
    if (model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathname)
  }
  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <div className='searchbar__item'>
        <Image
          src="/model-icon.png"
          alt="model-icon"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={e => setSearchModel(e.target.value)}
          placeholder="Tiguan"
          className='searchbar__input'
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar