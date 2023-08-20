'use client'

import { useRouter } from 'next/navigation'
import { ShowMoreProps } from '@/types'
import { CustomButton } from '.'
import { updateSearchParams } from '@/utils'

const ShowMore = ({pageNumber, isLast, setLimit}:ShowMoreProps) => {
  console.log('pageNumber', pageNumber)
  const router = useRouter()
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10
    setLimit(newLimit)
    // const newPathname = updateSearchParams('limit', `${newLimit}`)
    // router.push(newPathname)
  }
  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isLast && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore