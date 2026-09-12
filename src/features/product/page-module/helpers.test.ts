import assert from 'node:assert/strict'
import test from 'node:test'

import {
  productMetadataDescription,
  productMetadataTitle,
} from '@/features/product/page-module/helpers'

test('product metadata truncates at word boundaries and within limits', () => {
  const value =
    'Una descripción de producto suficientemente larga para comprobar que nunca termina a mitad de palabra y que mantiene un fragmento natural para los resultados de búsqueda.'
  const description = productMetadataDescription(value)
  const title = productMetadataTitle(
    'Producto con un nombre extraordinariamente largo para buscadores',
  )
  const titleWithBrand = `${title} · Kave Home`

  assert.match(description, /…$/)
  assert.ok(description.length <= 160)
  assert.equal(value.at(description.length - 1), ' ')
  assert.equal(
    productMetadataDescription('<p>Descripción\n\n breve</p>'),
    'Descripción breve',
  )
  assert.match(title, /…$/)
  assert.ok(titleWithBrand.length <= 60)
})
