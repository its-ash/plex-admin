export default {
  target: 'static',
  head: {
    title: 'plex-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
      },
      {rel: 'stylesheet', type: 'text/css', href: '/css/nucleo-icons.css'},
      {rel: 'stylesheet', type: 'text/css', href: '/css/nucleo-svg.css'}

    ],
    script: [
      {src: '/js/core/popper.min.js', body: true},
      {src: '/js/core/bootstrap.min.js', body: true},
      {src: '/js/plugins/perfect-scrollbar.min.js', body: true},
      {src: '/js/plugins/smooth-scrollbar.min.js', body: true},
      {src: '/js/plugins/chartjs.min.js', body: true},
      {src: '/js/soft-ui-dashboard.js', body: true},
    ]
  },
  ssr: false,
  css: ['assets/scss/main.scss'],
  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    prefetchPayloads: true
  },
  plugins: [
    {src: '~/plugins/chart.js', mode: 'client'}
  ],
  firebase: {
    config: {
      apiKey: "AIzaSyAQll97-_0yFhg4RoNzrRoz_mDca3vF_yY",
      authDomain: "sdp-machines.firebaseapp.com",
      databaseURL: "https://sdp-machines-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "sdp-machines",
      storageBucket: "sdp-machines.appspot.com",
      messagingSenderId: "1074546101131",
      appId: "1:1074546101131:web:57eb2d4ef76c1d27b6fd8e",
      measurementId: "G-WH2L80PD1G"
    },
    services: {
      firestore: true,
      functions: true,
      storage: true,
      database: true
    }
  },
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/firebase'
  ],
  axios: {
    baseURL: 'https://test.foxapi.live',
    proxyHeaders: false,
    credentials: false
  },
  buildDir: 'docs',
  build: {}
}
