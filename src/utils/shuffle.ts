/*Array Shuffle
* Author: 2tle
*/


export default (array: Array<any>) => {
    return array.sort(() => Math.random() - 0.5)
}
