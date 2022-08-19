const calculator = require('./calculator')
const tests = require('./calculator.spec')

const processArgs = () => {

    let settings = {
        debug: false,
        tests: false,
        expression: ""
    }

    process.argv.forEach((argv) => {
        let arrArg = argv.split('=');
        if (arrArg[1]) {
            switch (arrArg[0]) {
                case "--debug":
                    settings.debug = arrArg[1] == "true"
                    break;
                case "--expression":
                    settings.expression = arrArg[1]
                    break;
                case "--tests":
                    settings.tests = arrArg[1] == "true"
                    break;
            }
        }
    });

    return settings;

}

const run = async () => {
    let params = processArgs()
    if (params.expression.trim().length > 2) {
        let response = await calculator(params.expression, params.debug)
        console.log("\nFinal Result:", response)
    }

    if (params.tests) {
        tests()
    }

    if (!params.tests && params.expression == "") {
        console.log(`\nPlease, type the params`)
    }
}

run();