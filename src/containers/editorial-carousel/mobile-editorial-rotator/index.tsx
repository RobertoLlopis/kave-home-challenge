'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/primitives/button'
import { cn } from '@/utils/classnames'
import { editorialConstants, editorialItems } from '../constants'
import { editorialStyles } from '../styles'
import { useEditorialRotator } from './hooks'

export function MobileEditorialRotator() {
  const { advance, index, item, visible } = useEditorialRotator()

  return (
    <article
      aria-label={`${index + 1} de ${editorialItems.length}`}
      className={cn(
        editorialStyles.card,
        editorialStyles.mobileCard,
        visible ? editorialStyles.visible : editorialStyles.hidden,
      )}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="100vw"
        className={editorialStyles.image}
      />
      <div className={editorialStyles.overlay} aria-hidden="true" />
      <Button
        type="button"
        nativeButton
        variant="icon"
        className={editorialStyles.advance}
        aria-label={editorialConstants.nextLabel}
        onClick={advance}
      />
      <h2 className={editorialStyles.title}>{item.title}</h2>
      <Link href="#" className={editorialStyles.cta}>
        {item.cta}
      </Link>
    </article>
  )
}
