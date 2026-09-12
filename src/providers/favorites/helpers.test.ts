import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getFavoriteStorage,
  initialFavoritesState,
  isFavoriteImage,
  loadFavorites,
  readFavorites,
  saveFavorites,
  toggleFavorite,
} from '@/providers/favorites/helpers'
import { favoriteItem, mediaHost } from '@/test-support'

test('favorites envelope rejects corrupt, legacy and untrusted records', () => {
  assert.deepEqual(readFavorites('{bad', mediaHost), [])
  assert.deepEqual(readFavorites(JSON.stringify([favoriteItem]), mediaHost), [])
  assert.deepEqual(
    readFavorites(
      JSON.stringify({
        version: 1,
        items: [{ ...favoriteItem, image: 'https://evil.test/x' }],
      }),
      mediaHost,
    ),
    [],
  )
  const saved = {
    ...favoriteItem,
    image: 'https://d.media.kavehome.com/x.jpg',
  }
  assert.deepEqual(
    readFavorites(JSON.stringify({ version: 1, items: [saved] }), mediaHost),
    [saved],
  )
  assert.deepEqual(
    readFavorites(JSON.stringify({ version: 2, items: [saved] }), mediaHost),
    [],
  )
})

test('favorites image validation requires the exact configured HTTPS host', () => {
  assert.equal(
    isFavoriteImage('https://d.media.kavehome.com/x.jpg', mediaHost),
    true,
  )
  assert.equal(
    isFavoriteImage('https://cdn.d.media.kavehome.com/x.jpg', mediaHost),
    false,
  )
  assert.equal(
    isFavoriteImage('https://d.media.kavehome.com:444/x.jpg', mediaHost),
    false,
  )
  assert.equal(
    isFavoriteImage('http://d.media.kavehome.com/x.jpg', mediaHost),
    false,
  )
})

test('favorites storage tolerates blocked access, reads and writes', () => {
  assert.equal(
    getFavoriteStorage(() => {
      throw new DOMException('blocked', 'SecurityError')
    }),
    null,
  )
  assert.deepEqual(loadFavorites(null, mediaHost), [])
  assert.deepEqual(
    loadFavorites(
      {
        getItem: () => {
          throw new Error('blocked')
        },
        setItem: () => undefined,
      },
      mediaHost,
    ),
    [],
  )
  let key = ''
  let value = ''
  saveFavorites(
    {
      getItem: () => null,
      setItem: (nextKey, nextValue) => {
        key = nextKey
        value = nextValue
      },
    },
    [favoriteItem],
  )
  assert.equal(key, 'kave-home-favorites')
  assert.deepEqual(JSON.parse(value), { version: 1, items: [favoriteItem] })
  assert.doesNotThrow(() =>
    saveFavorites(
      {
        getItem: () => null,
        setItem: () => {
          throw new Error('quota')
        },
      },
      [favoriteItem],
    ),
  )
})

test('favorites state starts pending before the first storage read and toggles idempotently', () => {
  assert.equal(initialFavoritesState.pending, true)
  const added = toggleFavorite([], favoriteItem)
  assert.deepEqual(added, [favoriteItem])
  assert.deepEqual(toggleFavorite(added, favoriteItem), [])
})
