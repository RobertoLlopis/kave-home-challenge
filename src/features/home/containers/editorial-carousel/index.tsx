import { DesktopEditorialRow } from './desktop-editorial-row'
import { editorialMessages } from './messages'
import { MobileEditorialRotator } from './mobile-editorial-rotator'
import { editorialStyles } from './styles'

export function EditorialCarousel() {
  return (
    <section
      aria-label={editorialMessages.sectionLabel}
      className={editorialStyles.root}
    >
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
