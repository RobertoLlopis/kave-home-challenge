export const editorialUrl =
  'https://kavehome.com/es/es/e/character-against-neutrality'
export const editorialFallbackUrl = 'https://kavehome.com/es/es/'

export const editorialItems = [
  {
    title: 'Seasons of Change',
    cta: 'New in',
    href: editorialUrl,
    image:
      'https://d.media.kavehome.com/image/upload/w_480,ar_0.8,f_auto/v1788246329/cms/KaveHome-NEWIN-desktop-aw.jpg',
  },
  {
    title: 'Vivir entre dentro y fuera',
    cta: 'Descubrir',
    href: editorialFallbackUrl,
    image:
      'https://d.media.kavehome.com/image/upload/w_480,ar_0.8,f_auto/v1788021486/cms/KaveHome-Dormitorio-desktop.jpg',
  },
  {
    title: 'El valor de lo que permanece',
    cta: 'Selected Collection',
    href: editorialFallbackUrl,
    image:
      'https://d.media.kavehome.com/image/upload/w_1024,f_auto/v1788162014/cms/KaveHome-Selected-mobile.jpg',
  },
] as const

export const editorialConstants = {
  rotationMs: 3000,
  fadeMs: 500,
  nextLabel: 'Mostrar la siguiente historia editorial',
  pauseLabel: 'Pausar historias editoriales',
  resumeLabel: 'Reanudar historias editoriales',
} as const
