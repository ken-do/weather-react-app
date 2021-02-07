module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!/node_modules/',
        '!src/reportWebVitals.ts',
        '!src/setupTests.ts',
        '!src/index.tsx',
    ],
}
