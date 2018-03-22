import moment from 'moment';

/*
 * We first populate the empty data
 * We then fill in any data we have at the appropriate time period
 *
 *
 * */

const flattener = (obj, startDate, endDate) => {

    /*Function for populating empty array data*/

    const emptyData = {
        twiceDaily: (startDate, endDate) => {
            var holder = [];
            var range = endDate.diff(startDate, 'days') * 2;
            for (var i = 0; i < range + 2; i++) {
                holder[i] = {
                    name: [(i % 2) === 0 ? startDate.clone().add(i * 43200, 'seconds').format('MMM DD') + ' AM' : ' PM'],
                    Sent: 0
                };
            }
            ;

            return holder;
        },
        daily: (startDate, endDate) => {

            var holder = [];
            var dayRange = endDate.diff(startDate, 'days');

            for (var i = 0; i < dayRange + 1; i++) {

                holder[i] = {
                    name: startDate.clone().add(i, 'days').format('MMM DD'),
                    Sent: 0
                };
            }
            ;
            return holder;
        },
        weekly: (startDate, endDate) => {
            var holder = [];
            var weekRange = endDate.diff(startDate, 'weeks');

            for (var i = 0; i < weekRange + 1; i++) {
                holder[i] = {
                    name: [startDate.clone().add(i, 'weeks').format('MMM DD') + ' - ' + startDate.clone().add(i + 1, 'weeks').format('MMM DD')],
                    Sent: 0
                };
            }
            ;
            return holder;
        }
    };

    const populateData = {
        twiceDaily: (obj, startDate, endDate, holder, counter)=> {
            var range = endDate.diff(startDate, 'days') * 2;
            for (var i = 0; i < range + 2; i++) {
                var counter1 = 0;
                var newCustomers1 = 0;
                var gross1 = 0;
                var redeemed1 = 0;

                Object.keys(obj).filter(
                    filterFunc(startDate.clone().add(i * 43200, 'seconds'), startDate.clone().add(i * 43200 + 43200, 'seconds'))).forEach((key) => {
                    counter1 += obj[key].created;
                    newCustomers1 += obj[key].new;
                    gross += obj[key].gross;
                    redeemed += obj[key].redeemed;

                    holder[i] = {
                        name: [(i % 2) === 0 ? startDate.clone().add(i * 43200, 'seconds').format('MMM DD') + ' AM' : ' PM'],
                        Sent: counter1
                    };


                })
                counter += counter1;
                newCustomers += newCustomers1;
                redeemed += redeemed1;
                gross += gross1;
            }
            return holder;

        },
        daily: (obj, startDate, endDate, holder) => {

            var dayRange = endDate.diff(startDate, 'days');
            for (var i = 0; i < dayRange + 1; i++) {
                var counter1 = 0;
                var newCustomers1 = 0;
                var gross1 = 0;
                var redeemed1 = 0;
                var periodOne = 0;
                var periodTwo = 0;
                var unixEndDate = endDate.clone().unix();


                Object.keys(obj).filter(
                    filterFunc(startDate.clone().add(i, 'days'), startDate.clone().add(i + 1, 'days'))).forEach((key) => {
                    counter1 += obj[key].created;
                    newCustomers1 += obj[key].new;
                    gross += obj[key].gross;
                    redeemed += obj[key].redeemed;

                    holder[i] = {
                        name: moment.unix(key).format('MMM DD'),
                        Sent: counter1
                    };

                    //Calculate the percentage
                    if (key < unixEndDate && (unixEndDate - key) < 86400) {
                        periodOne += obj[key].created;
                    }
                    if ((unixEndDate - key) > 86400 && (unixEndDate - key) < 172800) {
                        periodTwo += obj[key].created;
                    }

                })

                counter += counter1;
                newCustomers += newCustomers1;
                redeemed += redeemed1;
                gross += gross1;

                if (periodOne === 0) {
                    percentChange = {
                        value: 'N/A',
                        description: 'No daily change data available!',
                        periodOne: periodOne,
                        periodTwo: periodTwo
                    };

                } else if (periodTwo === 0) {
                    percentChange = {
                        value: 'N/A',
                        description: 'No daily change data available!',
                        periodOne: periodOne,
                        periodTwo: periodTwo
                    }

                } else {
                    percentChange = {
                        value: ((periodOne - periodTwo) / (periodTwo)).toString() + '%',
                        description: 'Change over Last Week!',
                        periodOne: periodOne,
                        periodTwo: periodTwo
                    }

                }
            }
            return holder;
        },
        weekly: (obj, startDate, endDate, holder) => {

            var weekRange = endDate.diff(startDate, 'weeks');
            for (var i = 0; i < weekRange + 1; i++) {
                var counter1 = 0;
                var newCustomers1 = 0;
                var gross1 = 0;
                var redeemed1 = 0;
                var periodOne = 0;
                var periodTwo = 0;
                var unixEndDate = endDate.clone().unix();

                Object.keys(obj).filter(
                    filterFunc(startDate.clone().add(i, 'weeks'), startDate.clone().add(i + 1, 'weeks'))).forEach((key) => {

                    counter1 += obj[key].created;
                    newCustomers += obj[key].new;
                    gross += obj[key].gross;
                    redeemed += obj[key].redeemed;

                    holder[i + 1] = {
                        name: [startDate.clone().add(i, 'weeks').format('MMM DD') + ' - ' + startDate.clone().add(i + 1, 'weeks').format('MMM DD')],
                        Sent: counter1
                    };

                    //Calculate the percentage
                    if (key < unixEndDate && (unixEndDate - key) < 172800) {
                        periodOne += obj[key].created;
                    }
                    if ((unixEndDate - key) > 172800 && (unixEndDate - key) < 345600) {
                        periodTwo += obj[key].created;
                    }


                })
                counter += counter1;
                newCustomers += newCustomers1;
                redeemed += redeemed1;
                gross += gross1;

                if (periodOne === 0) {
                    percentChange = {
                        value: 'N/A',
                        description: 'No weekly change data available!',
                        periodOne: periodOne,
                        periodTwo: periodTwo
                    }
                } else if (periodTwo === 0) {
                    percentChange = {
                        value: 'N/A',
                        description: 'No weekly change data available!',
                        periodOne: periodOne,
                        periodTwo: periodTwo
                    }
                } else {
                    percentChange = {
                        value: ((periodOne - periodTwo) / (periodTwo)).toString() + '%',
                        description: 'Change over Last Week!',
                        periodOne: periodOne,
                        periodTwo: periodTwo
                    }
                }
            }
            return holder;
        }
    }


    /*Filter function for sorting data into appropriate selectedRanges*/
    const filterFunc = (startDate, endDate) => {
        return function (key) {
            return key >= startDate.unix() && key <= endDate.unix();
        }
    }

    /*Initialize Variables*/
    var result = [];
    var counter = 0;
    var newCustomers = 0;
    var redeemed = 0;
    var gross = 0;
    var percentChange;

    var selectedRange = endDate.unix() - startDate.unix();

    if (obj == null) {
        /*Populate the empty data*/
        if (selectedRange < 604800) {
            result = emptyData.twiceDaily(startDate, endDate);
        } else if (selectedRange >= 604800 && selectedRange < 604800 * 12) {
            result = emptyData.daily(startDate, endDate);
        } else if (selectedRange >= 604800 * 12 && selectedRange < 604800 * 53) {
            result = emptyData.weekly(startDate, endDate);
        }
        return [result, 0, 0, 0, 0, {
            value: 'N/A',
            description: 'No change data available!',
            periodOne: 0,
            periodTwo: 0
        }]

    } else {

        if (selectedRange < 604800) {
            result = emptyData.twiceDaily(startDate, endDate);
            result = populateData.twiceDaily(obj, startDate, endDate, result, counter);
        } else if (selectedRange >= 604800 && selectedRange < 604800 * 12) {
            result = emptyData.daily(startDate, endDate);
            result = populateData.daily(obj, startDate, endDate, result, counter);
        } else if (selectedRange >= 604800 * 12 && selectedRange < 604800 * 53) {
            result = emptyData.weekly(startDate, endDate);
            result = populateData.weekly(obj, startDate, endDate, result, counter);
        }

        return [result, Math.round(gross * 100) / 100, redeemed, newCustomers, counter, percentChange];
    }
}


export default flattener;