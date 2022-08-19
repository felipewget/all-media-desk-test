const calculator = require('./calculator')

const runTests = async () => {

    const tests = [
        { expression: "3+1*1.5", expect: 4.5 },
        { expression: "(5+8)-3+(8-3)/2+5", expect: 17.5 },
        { expression: "1+1", expect: 2 },
        { expression: "2+3", expect: 5 },
        { expression: "5-3+1", expect: 3 },
        { expression: "2+3*4", expect: 14 },
        { expression: "2*3+4", expect: 10 },
        { expression: "(5+8)-3+(8-3)", expect: 15 },
        { expression: "(5+8)*3/8+3", expect: 7.875 },
        { expression: "(5+8)-3+(8-3)/2+5", expect: 17.5 },
    ]

    console.log("\nUnit Tests")
    tests.forEach((objTest, index) => {
        let result = calculator(objTest.expression);
        console.log(`${index}. ${objTest.expression} - Expect: ${objTest.expect} | Result: ${result == objTest.expect ? "✅" : `❌ (Result: ${JSON.stringify(result)})`}`)
    })

}

module.exports = runTests;