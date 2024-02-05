export function generateMultiolicationTable(number) {
    let table = '';

    for (let i = 1; i <= number; i++) {
        let tableString = '';

        for (let j = 1; j <= number; j++) {
            tableString += ' ' + (i * j) + ' ';
        }

        tableString += '\n';
        table += tableString;

    }

    return table;
}

export function showQuote(arr, symbol) {
    let table = '';
    let maxLength = arr[0].length;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > maxLength) {
            maxLength = arr[i].length;
        }
    }

    for (let i = 0; i < maxLength + 4; i++) {
        table += symbol;
    }

    table += '\n';

    for (let i = 0; i < arr.length; i++) {
        let stars = '';
        stars += `${symbol} ` + arr[i] + ' '.repeat(maxLength - arr[i].length) + ` ${symbol}`;
        stars += '\n';
        table += stars;
    }

    for (let i = 0; i < maxLength + 4; i++) {
        table += symbol;
    }

    return table;
}

export function combineArrays(arr1, arr2) {
    let newarr = [];
    if (arr1.length > arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            newarr.push(arr1[i]);
            if (typeof arr2[i] !== 'undefined') {
                newarr.push(arr2[i]);
            }

        }
    } else for (let i = 0; i < arr2.length; i++) {
        if (typeof arr1[i] !== 'undefined') {
            newarr.push(arr1[i])
        }
        newarr.push(arr2[i]);
    }
    return newarr;
}