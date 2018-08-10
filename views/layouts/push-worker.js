// This file must be in the root directory
// Web Notify employs a service worker which runs as a background process until woken up to perform SDK tasks such as displaying notifications.

// 86acbd31cd7c09cf30acb66d2fbedc91daa48b86:1533500281.51
importScripts('https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js')
uaSetup.worker(self, {
  defaultIcon: 'https://sleepy\u002Dbastion\u002D45620.herokuapp.com/assets/img/plantosLogo.svg',
  defaultTitle: 'Plantos',
  defaultActionURL: 'https://sleepy\u002Dbastion\u002D45620.herokuapp.com/myPlants',
  appKey: 'vy8RpVboT4eRSxHRW3IMqQ',
  token: 'MTp2eThScFZib1Q0ZVJTeEhSVzNJTXFROjdSSTVlR1lEVjV0dGZncWJxMnZhSThwQTVySDAtLVhmd1dzNkhOTzFuTEE',
  vapidPublicKey: 'BIXOYl4JQ9Az7VqcxaLH_tsrmX13NZ_3ZM3QSHnfJOlqpeuTukCIa0-7HPNxmSNPouFHhfeuFZVi0SU8Nax2s4Q='
})
