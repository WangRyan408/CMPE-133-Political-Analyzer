interface PostCSSConfig {
  plugins: Record<string, Record<string, any> | boolean>
}

const config: PostCSSConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
