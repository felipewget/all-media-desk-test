const isAscending = (number) => {
    const numbers = String(number)
        .split('')
        .map((n) => Number(n));

    return JSON.stringify([...numbers].sort()) == JSON.stringify(numbers);
}

const getAscNumber = (number) => {
    for (let value = number; value >= 0; value--) {
        if (isAscending(value)) {
            return value;
        }
    }
};

const peterMeditationNumber = (numbers) => getAscNumber(numbers);

module.exports = peterMeditationNumber;