import { accessibility } from '@/constants/accessibility'
import { FavoritesList } from '@/containers/favorites-list'
import { favoritesCopy } from './constants'
import { FavoritesInteractive } from './interactive'
import { favoritesStyles } from './styles'

export default function FavoritesPage() {
  return <FavoritesInteractive loading={<FavoritesPage.Loading />} />
}

FavoritesPage.Loading = function FavoritesPageLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={favoritesStyles.content}
      aria-busy="true"
      aria-label={favoritesCopy.loadingLabel}
    >
      <h1 className={favoritesStyles.title}>{favoritesCopy.title}</h1>
      <FavoritesList.Loading />
    </main>
  )
}
