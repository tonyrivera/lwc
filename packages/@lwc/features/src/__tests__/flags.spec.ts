/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const { default: pluginTester } = require('babel-plugin-tester');
const plugin = require('../babel-plugin');

const babelOptions = {
    babelrc: false,
    configFile: false,
};

pluginTester({
    title: 'non-prod environments',
    plugin,
    pluginOptions: {
        featureFlags: {
            ENABLE_FEATURE_TRUE: true,
            ENABLE_FEATURE_FALSE: false,
            ENABLE_FEATURE_NULL: null,
        },
        prod: false,
    },
    babelOptions,
    tests: {
        'should transform null compile-time flags into null runtime flags': {
            code: `
                import features from '@lwc/features';

                if (features.ENABLE_FEATURE_NULL) {
                    console.log('features.ENABLE_FEATURE_NULL');
                }

                if (!features.ENABLE_FEATURE_NULL) {
                    console.log('!features.ENABLE_FEATURE_NULL');
                }
            `,
            output: `
                import features, { lwcRuntimeFlags } from '@lwc/features';

                if (lwcRuntimeFlags.ENABLE_FEATURE_NULL) {
                    console.log('features.ENABLE_FEATURE_NULL');
                }

                if (!lwcRuntimeFlags.ENABLE_FEATURE_NULL) {
                    console.log('!features.ENABLE_FEATURE_NULL');
                }
            `,
        },
        'should transform boolean-true compile-time flags': {
            code: `
                import features from '@lwc/features';

                if (features.ENABLE_FEATURE_TRUE) {
                    console.log('features.ENABLE_FEATURE_TRUE');
                }

                if (!features.ENABLE_FEATURE_TRUE) {
                    console.log('!features.ENABLE_FEATURE_TRUE');
                }
            `,
            output: `
                import features, { lwcRuntimeFlags } from '@lwc/features';

                if (lwcRuntimeFlags.ENABLE_FEATURE_TRUE) {
                    console.log('features.ENABLE_FEATURE_TRUE');
                }

                if (!lwcRuntimeFlags.ENABLE_FEATURE_TRUE) {
                    console.log('!features.ENABLE_FEATURE_TRUE');
                }
            `,
        },
        'should transform boolean-false compile-time flags': {
            code: `
                import features from '@lwc/features';

                if (features.ENABLE_FEATURE_FALSE) {
                    console.log('features.ENABLE_FEATURE_FALSE');
                }

                if (!features.ENABLE_FEATURE_FALSE) {
                    console.log('!features.ENABLE_FEATURE_FALSE');
                }
            `,
            output: `
                import features, { lwcRuntimeFlags } from '@lwc/features';

                if (lwcRuntimeFlags.ENABLE_FEATURE_FALSE) {
                    console.log('features.ENABLE_FEATURE_FALSE');
                }

                if (!lwcRuntimeFlags.ENABLE_FEATURE_FALSE) {
                    console.log('!features.ENABLE_FEATURE_FALSE');
                }
            `,
        },
        'should not transform if-tests that are not member expressions (compile-time)': {
            code: `
                import FEATURES from '@lwc/features';

                if (isTrue(FEATURES.ENABLE_FEATURE_TRUE)) {
                    console.log('isTrue(ENABLE_FEATURE_TRUE)');
                }
            `,
            output: `
                import FEATURES, { lwcRuntimeFlags } from '@lwc/features';

                if (isTrue(FEATURES.ENABLE_FEATURE_TRUE)) {
                    console.log('isTrue(ENABLE_FEATURE_TRUE)');
                }
            `,
        },
        'should not transform feature flags when used with a ternary operator': {
            code: `
                import feats from '@lwc/features';
                console.log(feats.ENABLE_FEATURE_NULL ? 'foo' : 'bar');
            `,
            output: `
                import feats, { lwcRuntimeFlags } from '@lwc/features';
                console.log(feats.ENABLE_FEATURE_NULL ? 'foo' : 'bar');
            `,
        },
        'should throw an error if lwcRuntimeFlags are imported': {
            error: 'Invalid import of "lwcRuntimeFlags" from "@lwc/features". Use the default export from "@lwc/features" instead of the "lwcRuntimeFlags" export when implementing your feature behind a flag.',
            code: `
                import { lwcRuntimeFlags } from '@lwc/features';

                if (lwcRuntimeFlags.ENABLE_FEATURE_NULL) {
                    console.log('lwcRuntimeFlags.ENABLE_FEATURE_NULL');
                }
            `,
        },
        'should throw an error if the flag is undefined': {
            error: 'Invalid feature flag "ENABLE_THE_BEER". Flag is undefined.',
            code: `
                import featureFlags from '@lwc/features';

                if (featureFlags.ENABLE_THE_BEER) {
                    console.log('featureFlags.ENABLE_THE_BEER');
                }
            `,
        },
        'should throw an error if the flag name is formatted incorrectly': {
            error: 'Invalid feature flag "enable_the_beer". Flag name must only be composed of uppercase letters and underscores.',
            code: `
                import featureFlags from '@lwc/features';

                if (featureFlags.enable_the_beer) {
                    console.log('featureFlags.enable_the_beer');
                }
            `,
        },
        'should transform nested feature flags': {
            code: `
                import features from '@lwc/features';

                if (features.ENABLE_FEATURE_NULL) {
                    if (features.ENABLE_FEATURE_TRUE) {
                        console.log('nested feature flags sounds like a vary bad idea');
                    }
                }

                if (features.ENABLE_FEATURE_TRUE) {
                    if (features.ENABLE_FEATURE_NULL) {
                        console.log('nested feature flags sounds like a vary bad idea');
                    }
                }
            `,
            output: `
                import features, { lwcRuntimeFlags } from '@lwc/features';

                if (lwcRuntimeFlags.ENABLE_FEATURE_NULL) {
                    if (lwcRuntimeFlags.ENABLE_FEATURE_TRUE) {
                        console.log('nested feature flags sounds like a vary bad idea');
                    }
                }

                if (lwcRuntimeFlags.ENABLE_FEATURE_TRUE) {
                    if (lwcRuntimeFlags.ENABLE_FEATURE_NULL) {
                        console.log('nested feature flags sounds like a vary bad idea');
                    }
                }
            `,
        },
        'should not transform tests that are not an actual reference to the imported binding': {
            code: `
                import featureFlag from '@lwc/features';

                function awesome() {
                    const featureFlag = {
                        ENABLE_FEATURE_FALSE: false,
                    };

                    if (featureFlag.ENABLE_FEATURE_FALSE) {
                        console.log('featureFlag.ENABLE_FEATURE_FALSE');
                    }

                    if (!featureFlag.ENABLE_FEATURE_FALSE) {
                        console.log('!featureFlag.ENABLE_FEATURE_FALSE');
                    }
                }
            `,
            output: `
                import featureFlag, { lwcRuntimeFlags } from '@lwc/features';

                function awesome() {
                    const featureFlag = {
                        ENABLE_FEATURE_FALSE: false,
                    };

                    if (featureFlag.ENABLE_FEATURE_FALSE) {
                        console.log('featureFlag.ENABLE_FEATURE_FALSE');
                    }

                    if (!featureFlag.ENABLE_FEATURE_FALSE) {
                        console.log('!featureFlag.ENABLE_FEATURE_FALSE');
                    }
                }
            `,
        },
        'should not transform member expressions that are not runtime flag lookups': {
            code: `
                import featureFlags from '@lwc/features';

                if (churroteria.ENABLE_FEATURE_TRUE) {
                    console.log('churroteria.ENABLE_FEATURE_TRUE');
                }
            `,
            output: `
                import featureFlags, { lwcRuntimeFlags } from '@lwc/features';

                if (churroteria.ENABLE_FEATURE_TRUE) {
                    console.log('churroteria.ENABLE_FEATURE_TRUE');
                }
            `,
        },
        'should not transform member expressions that are computed': {
            code: `
                import featureFlags from '@lwc/features';

                if (featureFlags['ENABLE_FEATURE_TRUE']) {
                    console.log("featureFlags['ENABLE_FEATURE_TRUE']");
                }
            `,
            output: `
                import featureFlags, { lwcRuntimeFlags } from '@lwc/features';

                if (featureFlags['ENABLE_FEATURE_TRUE']) {
                    console.log("featureFlags['ENABLE_FEATURE_TRUE']");
                }
            `,
        },
    },
});

// Forces TypeScript to treat this file as a module, not a script, which avoids:
// Error TS2451: Cannot redeclare block-scoped variable 'pluginTester'
// ...which are due to the same top-level variable names being used here and in flags-prod.spec.ts.
export {};
