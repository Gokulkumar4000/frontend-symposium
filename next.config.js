// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // Only apply this on the client-side
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          undici: false,  // Exclude undici from being bundled on client-side
        };
      }
  
      return config;
    },
  };
  