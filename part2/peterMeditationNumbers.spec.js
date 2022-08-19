const peterMeditationNumber = require('./peterMeditationNumbers')

const runTests = async () => {

    const tests = [
        { number: 23245, expect: 22999 },
        { number: 11235888, expect: 11235888 },
        { number: 111110, expect: 99999 },
        { number: 33245, expect: 29999 },
        { number: 12345, expect: 12345 },
    ]

    console.log("\nUnit Tests")
    tests.forEach((objTest, index) => {
        let result = peterMeditationNumber(objTest.number);
        console.log(`${index}. ${objTest.number} - Expect: ${objTest.expect} | Result: ${result == objTest.expect ? "✅" : `❌ (Result: ${result})`}`)
    })

}

module.exports = runTests