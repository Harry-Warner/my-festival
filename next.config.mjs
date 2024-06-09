/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                  {
                    test: /\.csv$/,
                    loader: 'csv-loader',
                    options: {
                      dynamicTyping: true,
                      header: true,
                      skipEmptyLines: true
                    }
                  }
                ]
              }
        }
    }
};

export default nextConfig;
