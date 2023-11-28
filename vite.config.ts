import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@muc/assets': path.resolve(__dirname, './public/assets'),
      '@muc/core': path.resolve(__dirname, './src/core/core.ts'),
      '@muc/utils': path.resolve(__dirname, './src/utils/utils.ts'),
      '@muc/hooks': path.resolve(__dirname, './src/hooks/hooks.ts'),
      '@muc/types': path.resolve(__dirname, './src/types/types.ts'),
      '@muc/config': path.resolve(__dirname, './src/config/config.ts'),
      '@muc/layout': path.resolve(__dirname, './src/layout/layout.ts'),
      '@muc/styles': path.resolve(__dirname, './src/styles/styles.ts'),
      '@muc/modules': path.resolve(__dirname, './src/modules/modules.ts'),
      '@muc/screens': path.resolve(__dirname, './src/screens/screens.ts'),
      '@muc/services': path.resolve(__dirname, './src/services/services.ts'),
      '@muc/constant': path.resolve(__dirname, './src/constant/constant.ts'),
      '@muc/providers': path.resolve(__dirname, './src/providers/providers.ts'),
      '@muc/components': path.resolve(
        __dirname,
        './src/components/components.ts'
      ),
    },
  },
  plugins: [react()],
})
