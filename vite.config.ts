import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@cookup/assets': path.resolve(__dirname, './public/assets'),
      '@cookup/core': path.resolve(__dirname, './src/core/core.ts'),
      '@cookup/utils': path.resolve(__dirname, './src/utils/utils.ts'),
      '@cookup/hooks': path.resolve(__dirname, './src/hooks/hooks.ts'),
      '@cookup/redux': path.resolve(__dirname, './src/redux/redux.ts'),
      '@cookup/types': path.resolve(__dirname, './src/types/types.ts'),
      '@cookup/config': path.resolve(__dirname, './src/config/config.ts'),
      '@cookup/layout': path.resolve(__dirname, './src/layout/layout.ts'),
      '@cookup/styles': path.resolve(__dirname, './src/styles/styles.ts'),
      '@cookup/modules': path.resolve(__dirname, './src/modules/modules.ts'),
      '@cookup/screens': path.resolve(__dirname, './src/screens/screens.ts'),
      '@cookup/services': path.resolve(__dirname, './src/services/services.ts'),
      '@cookup/constant': path.resolve(__dirname, './src/constant/constant.ts'),
      '@cookup/firebase': path.resolve(__dirname, './src/firebase.ts'),
      '@cookup/helpers': path.resolve(__dirname, './src/helpers/helpers.ts'),
      '@cookup/providers': path.resolve(
        __dirname,
        './src/providers/providers.ts'
      ),
      '@cookup/components': path.resolve(
        __dirname,
        './src/components/components.ts'
      ),
    },
  },
  plugins: [react()],
  base: 'https://kitchen-stage.web.app',
})
