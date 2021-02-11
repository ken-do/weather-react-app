/* eslint-disable import/prefer-default-export */
import _camelCase from 'lodash/camelCase'
import _toPairs from 'lodash/toPairs'
import _fromPairs from 'lodash/fromPairs'

export const normalizeObjectKeys = <T extends Record<string, unknown>, R>(
    obj: T
): R => {
    const pairsFromObj = _toPairs(obj)
    const newPairs = pairsFromObj.map(([key, value]) => [
        _camelCase(key),
        value,
    ])
    return _fromPairs(newPairs) as R
}
