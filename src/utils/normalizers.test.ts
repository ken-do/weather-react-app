import { normalizeObjectKeys } from './normalizers'

test('normalizeObjectKeys should convert the input object keys to use camelCase', () => {
    const input = {
        first_key: 'a',
        second_key: 'b',
    }

    const expectedOutput = {
        firstKey: 'a',
        secondKey: 'b',
    }

    expect(normalizeObjectKeys(input)).toEqual(expectedOutput)
})
