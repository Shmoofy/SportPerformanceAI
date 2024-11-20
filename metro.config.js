const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");

defaultConfig.resolver.assetExts.push("tflite");

module.exports = defaultConfig;
