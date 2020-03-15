"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {Number[]} numbers an array of sorted numbers
 * @returns {Array[]} an array of array of numbers grouped by sequences
 */
exports.default = (function (numbers) {
    if (numbers.length === 0) {
        return [];
    }
    return numbers.reduce(function (array, number, index) {
        if (index === 0 || number !== numbers[index - 1] + 1) {
            array.push([]);
        }
        array[array.length - 1].push(number);
        return array;
    }, []);
});
//# sourceMappingURL=groupSequences.js.map