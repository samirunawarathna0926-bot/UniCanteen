
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        canteens: resolve(process.cwd(), 'canteens.html'),
        menu: resolve(process.cwd(), 'menu.html'),
        login: resolve(process.cwd(), 'login.html'),
        cart: resolve(process.cwd(), 'cart.html'),
        checkout: resolve(process.cwd(), 'checkout.html'),
        confirmation: resolve(process.cwd(), 'confirmation.html'),
      },
    },
  },
})
