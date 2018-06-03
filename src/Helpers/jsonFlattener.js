import moment from 'moment';

/*
 * We first populate the empty data
 * We then fill in any data we have at the appropriate time period
 *
 *
 * */

const flattener = (obj, startRange, endRange) => {

    /*Function for populating empty array data*/
    let indexMap = {};


    let builder = (obj, startRange, endRange, points) => {
        let holder = [];
        let segment = (endRange - startRange) / points;
        let filtered = [];

        console.log(obj);

        //Go through every point in the Array populating data into the appropriate segment
        for (let i = 0; i < points + 2; i++) {

            if (i === 0) {

                //POPULATE THE X-AXIS (DISTANCE)
                filtered = obj.filter((object) => {
                    return (object.distance <= i * segment)
                });
            } else {

                filtered = obj.filter((object) => {
                    console.log(object);
                    return (object.distance <= i * segment && object.distance >= (i - 1) * segment)
                });
            }

            holder[i] = {
                distance: Math.round(segment * i * 100) / 100,
                altitude: filtered.length > 0 ? filtered[filtered.length - 1].altitude : null,
                markerIndex: filtered.length > 0 ? filtered[filtered.length - 1].markerIndex : null,
            };


            //This is a lazy way of maintaining sync with the marker Index {markerIndex: altitudeIndex}
            if (filtered.length > 0) {
                filtered.forEach((object) => {
                    indexMap[object.markerIndex] = i;
                });
            }
        }
        return holder;
    };


    //THIS IS THE BEGINNING OF THE FUNCITON INVOCATION
    //STEP 1: BREAK TOTAL KMS INTO

    /*Initialize Variables*/
    var result = builder(obj, startRange, endRange, 50);
    console.log(result);

    return [result, indexMap];

};


export default flattener;