import { UTCStringToHours, dateToFriendlyDate } from './formatters'

test('dateToFriendlyDate should convert a ISO date string to a more user friendly one', () => {
    const actual = dateToFriendlyDate('2021-02-07')
    const expected = 'Sun Feb 07 2021'
    expect(actual).toBe(expected)
})

test('UTCStringToHours should convert a UTC time string to a more user friendly one', () => {
    const actual = UTCStringToHours('2021-02-07T00:11:21.583156-08:00')
    const expected = '3:11 PM'
    expect(actual).toBe(expected)
})
