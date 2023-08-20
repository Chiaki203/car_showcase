'use client'

import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants'
import { useState, useEffect } from 'react'
import Image from 'next/image'

type Props = {
  searchParams: any
}

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2022)
  const [limit, setLimit] = useState(10)
  const getCars = async() => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        model: model || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
      })
      setAllCars(result)
    } catch(error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // setLoading(true)
    getCars()
  }, [manufacturer, model, fuel, year, limit])
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
  console.log('allCars', allCars)
  console.log('allCars length', allCars.length)
  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />
          <div className='home__filter-container'>
            <CustomFilter 
              title="fuel" 
              options={fuels}
              setFilter={setFuel}/>
            <CustomFilter 
              title="year" 
              options={yearsOfProduction}
              setFilter={setYear}/>
          </div>
        </div>
        <section>
          {loading && (
            <div className='mt-16 w-full flex-center'>
              <Image
                src="/loader.svg"
                alt="loader"
                width={50}
                height={50}
                className='object-contain'
              />
            </div>
          )}
          {!loading && allCars.length > 0 ? (
            <>
              <div className='home__cars-wrapper'>
                {allCars?.map((car, index) => (
                  <CarCard
                    key={index} 
                    car={car}
                  />
                ))}
              </div>
              <ShowMore
                pageNumber={(limit) / 10}
                isLast={(limit) > allCars.length}
                setLimit={setLimit}
              />
            </>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>{!loading && 'Oops, no results'}</h2>
              {/* <p>{allCars?.message}</p> */}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}




// server side rendering

// import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components'
// import { fetchCars } from '@/utils'
// import { fuels, yearsOfProduction } from '@/constants'

// type Props = {
//   searchParams: any
// }

// export default async function Home({searchParams}:Props) {
//   const allCars = await fetchCars({
//     manufacturer: searchParams.manufacturer || '',
//     model: searchParams.model || '',
//     year: searchParams.year || 2022,
//     fuel: searchParams.fuel || '',
//     limit: searchParams.limit || 10,
//   })
//   const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
//   console.log('allCars', allCars)
//   console.log('allCars length', allCars.length)
//   return (
//     <main className="overflow-hidden">
//       <Hero/>
//       <div className='mt-12 padding-x padding-y max-width' id="discover">
//         <div className='home__text-container'>
//           <h1 className='text-4xl font-extrabold'>
//             Car Catalogue
//           </h1>
//           <p>Explore the cars you might like</p>
//         </div>
//         <div className='home__filters'>
//           <SearchBar/>
//           <div className='home__filter-container'>
//             <CustomFilter title="fuel" options={fuels}/>
//             <CustomFilter title="year" options={yearsOfProduction}/>
//           </div>
//         </div>
//         {!isDataEmpty ? (
//           <section>
//             <div className='home__cars-wrapper'>
//               {allCars?.map((car, index) => (
//                 <CarCard
//                   key={index} 
//                   car={car}
//                 />
//               ))}
//             </div>
//             <ShowMore
//               pageNumber={(searchParams.limit || 10) / 10}
//               isLast={(searchParams.limit || 10) > allCars.length}
//             />
//           </section>
//         ) : (
//           <div className='home__error-container'>
//             <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
//             <p>{allCars?.message}</p>
//           </div>
//         )}
//       </div>
//     </main>
//   )
// }
