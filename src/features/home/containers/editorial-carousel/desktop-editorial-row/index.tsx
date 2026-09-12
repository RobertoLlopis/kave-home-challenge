import Image from 'next/image'
import Link from 'next/link'

import { editorialItems } from '@/features/home/containers/editorial-carousel/constants'
import { editorialStyles } from '@/features/home/containers/editorial-carousel/styles'

export function DesktopEditorialRow() {
  return editorialItems.map((item, index) => (
    <article
      key={item.title}
      aria-label={`${index + 1} de ${editorialItems.length}`}
      className={editorialStyles.card}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="33vw"
        className={editorialStyles.image}
      />
      <div className={editorialStyles.overlay} aria-hidden="true" />
      <h2 className={editorialStyles.title}>{item.title}</h2>
      <Link href={item.href} className={editorialStyles.cta}>
        {item.cta}
      </Link>
    </article>
  ))
}
