import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir:"public/lib",
    lib: {
      entry: path.resolve(__dirname, 'src/components/export.ts'),
      name: 'eventIntercept',
      fileName: (format) => `event-intercept.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react',"react-dom"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'react',
          "react-dom": "react-dom",
        }
      }
    }
  },
})
