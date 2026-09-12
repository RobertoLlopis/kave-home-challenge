import Image from 'next/image'
import Link from 'next/link'
import { editorialItems } from './constants'
import { MobileEditorialRotator } from './mobile-editorial-rotator'
import { editorialStyles } from './styles'

export function EditorialCarousel() {
  return (
    <section aria-label="Inspiración" className={editorialStyles.root}>
      <div className={editorialStyles.mobileOnly}>
        <MobileEditorialRotator />
      </div>
      <div className={editorialStyles.desktopOnly}>
        {editorialItems.map((item, index) => (
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
            <Link href="#" className={editorialStyles.cta}>
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

EditorialCarousel.Loading = function EditorialLoading() {
  return <div className={editorialStyles.loading} aria-hidden="true" />
}
