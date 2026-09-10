import type { EcoPart } from '@/types/catalog'

export type PriceProps = {
  value: number
  previous?: number | null
  ecoPart?: EcoPart
}
export type PreviousPriceProps = {
  value: number
}
export type EcoPartLabelProps = {
  part: Exclude<EcoPart, null>
}
export type PreviousPartProps = {
  previous?: number | null
  value: number
}
export type EcoPartSectionProps = {
  ecoPart?: EcoPart
}
