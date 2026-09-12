'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/primitives/button'
import { cn } from '@/utils/classnames'
import { editorialConstants, editorialItems } from '../constants'
import { editorialStyles } from '../styles'
import { useEditorialRotator } from './hooks'

export function MobileEditorialRotator() {
  const { advanceManually, index, item, paused, togglePause, visible } =
    useEditorialRotator()

  return (
    <article
      aria-label={`${index + 1} de ${editorialItems.length}`}
      className={editorialStyles.card}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="100vw"
        className={cn(
          editorialStyles.image,
          visible ? editorialStyles.visible : editorialStyles.hidden,
        )}
      />
      <div className={editorialStyles.overlay} aria-hidden="true" />
      <Button
        type="button"
        nativeButton
        variant="icon"
        className={editorialStyles.advance}
        aria-label={editorialConstants.nextLabel}
        onClick={advanceManually}
      />
      <Button
        type="button"
        nativeButton
        variant="secondary"
        className={editorialStyles.pause}
        aria-label={
          paused
            ? editorialConstants.resumeLabel
            : editorialConstants.pauseLabel
        }
        onClick={togglePause}
      >
        {paused
          ? editorialConstants.resumeLabel
          : editorialConstants.pauseLabel}
      </Button>
      <h2 className={editorialStyles.title}>{item.title}</h2>
      <Link href={item.href} className={editorialStyles.cta}>
        {item.cta}
      </Link>
    </article>
  )
}
