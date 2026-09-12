import { accessibility } from '@/constants/accessibility'
import { FavoritesList } from '../containers/list'
import { favoritesCopy } from './constants'
import { favoritesStyles } from './styles'
import { FavoritesView } from './view'

export default function FavoritesPage() {
  return <FavoritesView loading={<FavoritesPage.Loading />} />
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
      <div className={favoritesStyles.list}>
        <FavoritesList.Loading />
      </div>
    </main>
  )
}
