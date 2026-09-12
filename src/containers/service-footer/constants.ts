export const serviceFooterConstants = {
  timeZone: 'Europe/Madrid',
  locale: 'es-ES',
  deliveryMinDays: 3,
  deliveryMaxDays: 10,
  deliveryPrefix: 'Compra ahora y recíbelo aproximadamente entre el',
  services: [
    {
      title: 'Devoluciones gratuitas',
      link: 'Ver condiciones',
      desktopHidden: false,
    },
    {
      title: 'Garantía 10 años',
      link: 'Ver condiciones',
      desktopHidden: true,
    },
    {
      title: 'Más de 175 puntos de venta',
      link: 'Ver tiendas',
      desktopHidden: false,
    },
    {
      title: 'Financiación sin intereses',
      link: 'Ver opciones',
      desktopHidden: false,
    },
  ],
} as const
