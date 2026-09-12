import { MobileEditorialRotator } from './mobile-editorial-rotator'
import { DesktopEditorialRow } from './desktop-editorial-row'
import { editorialStyles } from './styles'

export function EditorialCarousel() {
  return (
    <section aria-label="Inspiración" className={editorialStyles.root}>
      <div className={editorialStyles.mobileOnly}>
        <MobileEditorialRotator />
      </div>
      <div className={editorialStyles.desktopOnly}>
        <DesktopEditorialRow />
      </div>
    </section>
  )
}

EditorialCarousel.Loading = function EditorialLoading() {
  return <div className={editorialStyles.loading} aria-hidden="true" />
}
