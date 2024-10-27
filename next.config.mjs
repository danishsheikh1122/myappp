/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Add a rule for loading HTML files
        config.module.rules.push({
            test: /\.html$/,
            use: 'html-loader', // Use the html-loader for HTML files
        });

        return config;
    },
};

export default nextConfig;
