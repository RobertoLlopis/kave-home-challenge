import Image from 'next/image'
import { categoryImageConstants } from './constants'
import { categoryImageStyles } from './styles'
import type { CategoryImageProps } from './types'

export default function CategoryImage({ category }: CategoryImageProps) {
  if (!category.highlightImage) return null
  return (
    <Image
      src={category.highlightImage}
      alt=""
      width={400}
      height={500}
      sizes={categoryImageConstants.imageSizes}
      className={categoryImageStyles.image}
    />
  )
}
