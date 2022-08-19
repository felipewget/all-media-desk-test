const peterMeditationNumber = require('./peterMeditationNumbers')
const tests = require('./peterMeditationNumbers.spec')

const processArgs = () => {

    let settings = {
        tests: false,
        number: null
    }

    process.argv.forEach((argv) => {
        let arrArg = argv.split('=');
        if (arrArg[1]) {

            switch (arrArg[0]) {
                case "--number":
                    settings.number = Number(arrArg[1])
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

    let isValidNumber = params?.number > 0 && params?.number <= Math.pow(10, 18);
    if (isValidNumber) {
        let response = await peterMeditationNumber(params.number)
        console.log("\nFinal Result:", response)
    }

    if (params.tests) {
        tests()
    }

    if (!params.tests && !(isValidNumber)) {
        console.log(`\nPlease, type the params`)
    }
}

run();