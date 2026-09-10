import Link from 'next/link'
import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { Button } from '@/primitives/button'
import { notFoundCopy } from './constants'
import { notFoundStyles } from './styles'

export default function NotFoundPage() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={notFoundStyles.content}
    >
      <h1 className={notFoundStyles.title}>{notFoundCopy.title}</h1>
      <p className={notFoundStyles.message}>{notFoundCopy.message}</p>
      <Button
        nativeButton={false}
        render={<Link href={routes.products} />}
        className={notFoundStyles.action}
      >
        {notFoundCopy.backToProductsLabel}
      </Button>
    </main>
  )
}
