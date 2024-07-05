// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    appManifest: false
  },
  ssr: true,
  devtools: { enabled: true },
  extends: [],
  modules: [
    'nuxt-auth-toolkit',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  colorMode: {
    disableTransition: true
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {}
    }
  },
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/fonts.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/mixins/variables.scss";'
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://1.94.60.254:9003',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  },
  pinia: {
    storesDirs: ['./app/stores']
  },
  natlk: {
    baseURL: process.env.BASE_URL || '/',
    pages: {
      login: '/',
      unauthorized: '/401'
    },
    accessToken: {
      cookie: {
        name: 'natlk.token'
      }
    },
    refreshToken: {
      paramName: 'refreshToken',
      cookie: {
        name: 'natlk.refresh'
      }
    },
    cookie: {
      path: process.env.COOKIE_PATH || '/',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      secure: process.env.COOKIE_SECURE === 'true',
      httpOnly: false,
      sameSite: 'lax'
    },
    middleware: {
      auth: { enable: true }
    }
  },
  typescript: {
    strict: false
  },
  future: {
    compatibilityVersion: 4
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
