const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Resolve modules from both the project and the monorepo root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Force single copies of react/react-native to avoid duplicate instance errors
const singletons = ['react', 'react-dom', 'react-native', 'react-native-web'];

// Redirect expo-router _ctx to our local version with hardcoded app root
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'expo-router/_ctx' || moduleName.endsWith('expo-router/_ctx.web.js') || moduleName.endsWith('expo-router/_ctx')) {
    return { type: 'sourceFile', filePath: path.resolve(projectRoot, 'ctx.web.js') };
  }
  // Pin singletons to the mobile app's node_modules
  if (singletons.some((s) => moduleName === s || moduleName.startsWith(s + '/'))) {
    const localPath = path.resolve(projectRoot, 'node_modules', moduleName);
    try { require.resolve(localPath); return { type: 'sourceFile', filePath: require.resolve(localPath) }; } catch {}
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
