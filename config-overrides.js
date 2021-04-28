// const path = require('path');
const { override, addLessLoader } = require('customize-cra');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

function overrideModuleScope(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin));

    return config;
}

module.exports = override(
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
        },
    }),
    overrideModuleScope,
);
