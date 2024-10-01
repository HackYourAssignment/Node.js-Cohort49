module.exports = {
  presets: [
    [
      // This is a configurationnnn, here we are telling babel what configuration to use
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
