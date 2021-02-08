module.exports = {
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
        './src/features/**/*.ts': {
            branches: 100,
            statements: 100,
        },
    },
    moduleDirectories: ['node_modules', 'src'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!/node_modules/',
        '!src/reportWebVitals.ts',
        '!src/setupTests.ts',
        '!src/index.tsx',
    ],
}
