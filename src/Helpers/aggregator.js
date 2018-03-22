/*Function to calculate percentageChange from stats*/

const percentageChange = (stats) => {

    /*Initialize Variables*/
    var periodOne = 0;
    var periodTwo = 0;
    var description;
    var percentChange = {};

    Object.keys(stats).map((key, index) => {
/*
        console.log(stats[key].percentChange.description);
*/

        periodOne += stats[key].percentChange.periodOne;
        periodTwo += stats[key].percentChange.periodTwo;
        description = stats[key].percentChange.description;

    })

    if (periodOne === 0) {
        percentChange = {
            value: 'N/A',
            description: description
        }
    } else if (periodTwo === 0) {
        percentChange = {
            value: 'N/A',
            description: description
        }
    } else {
        percentChange = {
            value: ((periodOne - periodTwo) / (periodTwo)).toString() + '%',
            description: description
        }
    }

    return percentChange;

}

const aggregator = (obj, stats) => {
/*    console.log(stats);
    console.log(obj);*/

    /*If there is no Campaign Information or Chart Data*/

    if (Object.keys(obj).length === 0 && obj.constructor === Object) {

        return null;
    }
    else {

        var motherArray = [];
        var count = 0;

        /*I need one array to have as a reference. We will use this to map the motherArray*/
        /*All Arrays in the 'obj' should have the same structure. Relies on this to be true*/
        var controlKey = Object.keys(obj);
        var controlArray = obj[controlKey[0]];

        /*Go through each Timestamp in the controlArray*/
        controlArray.forEach((timestamp, index2) => {
            let count = 0;
            let name = timestamp.name;

            /*Find the same timestamp in all of the Arrays in the original obj*/
            Object.keys(obj).map((campaignKey, index3) => {
                count += obj[campaignKey][index2].Sent;
            })

            /*Now count should have been iterated through for ALL of the chartData's*/
            /*Push the controlArray .name and the count;*/
            let holder = {
                name: name,
                Sent: count
            }

            motherArray.push(holder);

        })

/*
        console.log(motherArray);
*/


        /*Calculate the stats information*/

        let gross = 0;
        let redeemed = 0;
        let newCustomers = 0;
        let totalSent = 0;

        let aggregatePercentChange = percentageChange(stats);

        Object.keys(stats).map((statsKey, index) => {
/*
            console.log(stats[statsKey]);
*/
            gross += stats[statsKey].gross;
            redeemed += stats[statsKey].redeemed;
            newCustomers += stats[statsKey].new;
            totalSent += stats[statsKey].total;
        })

/*
        console.log([motherArray, gross, redeemed, newCustomers, totalSent, aggregatePercentChange])
*/

        return [motherArray, gross, redeemed, newCustomers, totalSent, aggregatePercentChange]

    }

}


export default aggregator;