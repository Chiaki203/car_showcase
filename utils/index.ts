import { CarProps } from '@/types';
import { FilterProps } from '@/types';

export async function fetchCars(filters:FilterProps) {
  const {
    manufacturer,
    model,
    year,
    fuel,
    limit
  } = filters
  const headers = {
    'X-RapidAPI-Key': 'a691018633msh0bd1cfae8b7e10cp103fcfjsnbedb714025e4',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }
  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
    headers: headers
  })
  const result = await response.json()
  return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car:CarProps, angle?:string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')
  const {make, year, model} = car
  url.searchParams.append('customer', 'hrjavascript-mastery')
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle}`)
  return `${url}`
}

export const updateSearchParams = (type:string, value:string) => {
  const searchParams = new URLSearchParams(window.location.search)
  console.log('get searchParams', searchParams)
  searchParams.set(type, value)
  console.log('set searchParams', searchParams)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  console.log('newPathname', newPathname)
  return newPathname
}