import React from 'react';

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import history from './history';
import flattener from './jsonFlattener';
import aggregator from './aggregator';

const firebase = require('firebase');


require("firebase/firestore");


firebase.initializeApp({
    apiKey: "AIzaSyCTZX0lG1JyIBUphH7m5SDoPCpRamPNm24",
    authDomain: "journeyapp91.firebaseapp.com",
    databaseURL: "https://journeyapp91.firebaseio.com",
    projectId: "journeyapp91",
    storageBucket: "journeyapp91.appspot.com",
    messagingSenderId: "515548202082"
});

var database = firebase.database();
var provider = new firebase.auth.FacebookAuthProvider();
var db = firebase.firestore();


const FirebaseAuthService = firebase.auth();

let token = null;

/*
 const requests = {
 del: url =>
 superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
 get: url =>
 superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
 post: (url, body) =>
 superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
 put: (url, body) =>
 superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
 };
 */

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

const Auth = {
    getCurrentUser: () => {
        return dispatch => {
            console.log('getCurrentUser called');
            firebase.auth().onAuthStateChanged(function (user) {
                console.log(user);
                if (user) {
                    console.log('User is logged in');

                    dispatch({
                        type: 'LOGIN',
                        user: user,
                        authenticated: true
                    });
                }
                else {
                    console.log('logging out');
                    dispatch({
                        type: 'LOGIN',
                        user: null,
                        authenticated: false
                    });

                }
            });
        };

    },
    login: () => {
        return dispatch => {
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                console.log(result);

                let additionalUserInfo = result.additionalUserInfo;
                console.log(additionalUserInfo);
                console.log(result);
                console.log(additionalUserInfo.profile.first_name);
                console.log(additionalUserInfo.profile.last_name);
                console.log(additionalUserInfo.profile.phone_number);
                console.log(additionalUserInfo.profile.timezone);
                console.log(result.displayName);


                if (result.additionalUserInfo.isNewUser === true) {
                    console.log(additionalUserInfo.profile.first_name);
                    db.collection("users").doc(result.user.uid).set({
                        first_name: additionalUserInfo.profile.first_name,
                        last_name: additionalUserInfo.profile.last_name,
                        phone_number: result.user.phoneNumber,
                        timezone: additionalUserInfo.profile.timezone,
                        uid: result.user.uid,
                        display_name: result.user.displayName,
                        photo_url: result.user.photoURL,
                        fcm_token: null
                    })
                }

                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user);
                dispatch({
                    type: 'LOGIN',
                    user: user,
                    authenticated: true
                });

                // ...
            }).catch(function (error) {
                console.log('User not Authenticated');
                console.log(error.code);
                console.log(error.message);
                // console.log(error.credential);
                dispatch({
                    type: 'LOGIN',
                    user: null,
                    authenticated: false
                });
            });
        }
    },
    // register: (email, password) => {
    //     return authService.createUserWithEmailAndPassword(email, password);
    // },
    // assignConsole: (uid) => {
    //     return database.ref('users/' + uid).push();
    // },
    // lookupConsole: (uid) => {
    //     return database.ref('users/' + uid).once('value');
    // },
    // lookupConsole2: (uid) => {
    //     return dispatch => {
    //         var consoleWatch = database.ref('users/' + uid);
    //         consoleWatch.on('value', function (snapshot) {
    //             /*
    //              console.log(snapshot.val());
    //              */
    //
    //             dispatch(firebaseQuery.fetchConsole(snapshot.val()))
    //         });
    //     }
    // },
    logout: () => {

        return dispatch => {
            firebase.auth().signOut().then(function () {
                console.log('signedOut');
            }, function () {
                console.log('error');
            });
        }

    }
};

const common = {
        beautifulUnsplash: () => {
            return dispatch => {
                console.log('im in here!')
                const URL = "https://api.unsplash.com/photos/random?client_id=17d1aeb4a5d48238dd727a19feff53cc3cdd55c8160f3a48364eb4cb879c6722&collections=142324,369,1278105,536176";
                return fetch(URL, {method: 'GET'})
                    .then(response => Promise.all([response, response.json()])).then(([response, json]) => {
                        if (response.status === 200) {

                            dispatch({
                                type: 'BEAUTIFUL_UNSPLASH',
                                value: json.urls.regular
                            });

                        }
                        else {
                            console.log('oh no')
                        }
                    });
            }
        },
        stripePurchase: (token, value) => {
            console.log('Stripe Purchase');
            console.log(token.id);
            console.log(value);
            console.log(JSON.stringify(token));
            fetch('https://us-central1-journeyapp91.cloudfunctions.net/stripePurchase', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"token": token.id, "value": value}),
            }).then(response => response.json()
            ).then((response) => {
                if (response.status === "succeeded") {
                    console.log('win');
                }
                else {
                    console.log('oh no ' + response.error);
                }
            });
        }

        ,
        getMultipleUnsplash: () => {
            return dispatch => {
                console.log('im in here!')
                const URL = "https://api.unsplash.com/collections/2071606/photos?client_id=17d1aeb4a5d48238dd727a19feff53cc3cdd55c8160f3a48364eb4cb879c6722";
                return fetch(URL, {method: 'GET'})
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            console.log('You got mad errors');
                        }
                    }).then((json) => {
                        console.log(json);
                        dispatch({
                            type: 'JOURNEY_THUMBNAILS',
                            value: json
                        });
                    }).catch(function (error) {
                        console.log('There was an error');
                        console.log(error);
                    });
            }
        },
    }
;

const FirebaseWatcher = {
    links: (id) => {
        return dispatch => {
            var linkWatcher = database.ref('api/v1/responses/' + id);
            linkWatcher.on('value', function (snapshot) {

                if (snapshot.val()) {
                }
                dispatch({type: 'LINK', link: 'https://gifty.link/' + id});
            });
            linkWatcher.off();
        }
    },
    chartDataWatcher: (campaign) => {
        return database.ref('stats/stats_by_campaign/' + campaign)
    },
    campaignWatcher: (console_id) => {
        return database.ref('consoles/' + console_id + '/campaigns')
    }
};

const FireStoreQuery = {
    fetchJourneyMeta: (journey_id) => {
        return dispatch => {
            db.collection('journey_meta').doc(journey_id).get().then(function (doc) {
                if (doc.exists) {
                    console.log('Doc Data: ' + doc);
                    console.log(doc.data());

                    dispatch({
                        type: 'LIVE_JOURNEY_META',
                        liveJourneyMeta: doc.data()
                    });

                    dispatch(FireStoreQuery.fetchUserInfo(doc.data().uid));
                } else {
                    console.log('No such Document');
                }
            })
        }
    },
    fetchUserInfo: (uid) => {
        console.log('fetchUserInfo');
        return dispatch => {
            db.collection('users').doc(uid).get().then(function (doc) {
                if (doc.exists) {
                    console.log('Doc Data: ' + doc.data());
                    console.log(doc.data());
                    dispatch({
                        type: 'LIVE_JOURNEY_AUTHOR',
                        liveJourneyAuthor: doc.data()
                    });


                } else {
                    console.log('No such Document');
                }
            })
        }

    }
};


const FirebaseQuery = {
    liveJourney: (journey_id) => {
        return dispatch => {
            console.log('GET_LIVE_JOURNEY');
            // new Promise(function (resolve, reject) {
            database.ref('live_journeys/' + journey_id).on('value', (snapshot) => {
                // console.log(snapshot.val());
                if (snapshot.val() !== null) {
                    // resolve(snapshot.val());
                    let sortable = [];

                    for (let uid in snapshot.val()) {
                        let temp = snapshot.val();
                        temp[uid].uid = uid;
                        if (temp[uid].dataUploaded === true) {
                            sortable.push(temp[uid]);
                        }
                    }
                    sortable.sort(function (a, b) {
                        //Reversed Timestamps
                        return b.timestamp - a.timestamp;
                    });

                    //There are -1 altitudes in the altitudes which need to be averaged
                    sortable.forEach((object, index) => {
                        if (object.altitude == -1) {
                            if (index == 0) {
                                object.altitude = sortable[index + 1].altitude;
                            } else if (index === object.length - 1) {
                                object.altitude = sortable[index - 1].altitude;
                            } else {
                                object.altitude = Math.round((sortable[index - 1].altitude + sortable[index + 1].altitude) / 2*100)/100
                            }
                        } else {
                        }
                    });


                    console.log(sortable);

                    //Calculate latlng distances in km
                    let distance = 0;

                    for (let i = 0; i <= sortable.length - 1; i++) {
                        if (i === 0) {
                            sortable[i].distance = 0;
                            sortable[i].markerIndex = 0;

                        } else {
                            distance += calculateDistance(sortable[i - 1].coordinates.lat, sortable[i - 1].coordinates.lng, sortable[i].coordinates.lat, sortable[i].coordinates.lng,);
                            sortable[i].distance = Math.round(distance * 100) / 100;
                            sortable[i].markerIndex = i;

                        }
                    };

                    var altitudeArray = flattener(sortable, sortable[0].distance, sortable[sortable.length-1].distance);

                    console.log(altitudeArray);



                    //Calculate the altitude change in meters
                    let altitude = 0;
                    for (var i = 1; i <= sortable.length - 1; i++) {

                        altitude += Math.abs(sortable[i].altitude - sortable[i - 1].altitude);
                    };

                    dispatch({
                        type: 'LIVE_JOURNEY_DATA',
                        liveJourneyData: sortable,
                        journeyId: journey_id,
                        journeyLength: sortable.length,
                        legDistance: Math.round(distance * 100) / 100,
                        legAltitudeChange: Math.round(altitude * 100) / 100,
                        altitudeArray: altitudeArray[0],
                        indexMap: altitudeArray[1]
                    })
                    ;
                }
            })
            ;
        };
    },
    sendChat: (journey_id, message, member) => {
        console.log('SEND_CHAT');
        database.ref('messages/' + journey_id).push({
            name: member,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        ;
    },
    chatListener: (journey_id) => {
        console.log('CHAT_LISTENER');
        var ignoreItems = true;

        return dispatch => {
            database.ref('messages/' + journey_id).on('child_added', (snapshot) => {
                if (!ignoreItems) {
                    console.log('new Chatlistener Snapshot');
                    console.log(snapshot.val());
                    dispatch({
                        type: 'CHAT_CHILD_ADDED',
                        message: snapshot.val()
                    })

                }

            });
            database.ref('messages/' + journey_id).once('value', (snapshot) => {
                console.log('Initial ChatListener Load');
                console.log(snapshot.val())
                ignoreItems = false;

                let chatSortable = [];

                for (let message in snapshot.val()) {
                    let temp = snapshot.val();
                    chatSortable.push(temp[message]);
                }

                chatSortable.sort(function (a, b) {
                    return a.timestamp - b.timestamp
                });

                // console.log(chatSortable);


                dispatch({
                    type: 'CHAT_INITIAL_LOAD',
                    messages: chatSortable
                })

            });

        };
    },

    requestCapture: (fcmToken) => {

        return dispatch => {

            console.log('requesting a m startcapture');
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
                // Send token to your backend via HTTPS
                // ...
                console.log('This is the hourly refreshed idToken: ' + idToken);
                console.log('This is the FCM Token: ' + fcmToken);

                fetch('https://us-central1-journeyapp91.cloudfunctions.net/remoteCapture', {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                    body: fcmToken,
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.

                })
                    .then(response => Promise.all([response, response.json()])).then(([response, json]) => {
                    if (response.status === 200) {
                        console.log('win');
                    }
                    else {
                        console.log('oh no ' + response.status);
                    }
                });
            }).catch(function (error) {
                // Handle error
            });
        };
    },

    aggregateData: (chartData, stats) => {
        console.log('AGGREGATE_DATA_FROM_ALL_CHARTS');
        return dispatch => {
            var aggregateChartData = aggregator(chartData, stats);

            dispatch({
                type: 'AGGREGATE_CHART_DATA',
                aggregateChartData: aggregateChartData[0],
                gross: aggregateChartData[1],
                redeemed: aggregateChartData[2],
                newCustomers: aggregateChartData[3],
                total: aggregateChartData[4],
                percentChange: aggregateChartData[5],

                /*This is used to ensure that the initial <LoadScreen> is shown in HomeDash.js*/
                loaderDisplay: false
            });
        }

    },
    campaignMeta: (campaign) => {
        return dispatch => {
            console.log('campaignMeta called');
            database.ref('campaigns/' + campaign).on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    dispatch({
                        type: 'CAMPAIGN_META',
                        campaign: campaign,
                        campaignMeta: snapshot.val()
                    })
                }
                return (snapshot.val());
            });
        }
    },
    fetchConsole: (console_id) => {
        console.log('FETCH_CONSOLE');
        return dispatch => {
            database.ref('consoles/' + console_id).on('value', function (snapshot) {
                if (snapshot.val()) {
                    dispatch({type: 'CONSOLE_DATA', consoleData: snapshot.val()});
                } else {
                    dispatch({
                        type: 'CONSOLE_DATA', consoleData: {
                            "active_campaigns": {
                                campaign: null
                            },
                            "agreements": {
                                "-KmMclctWZDKexyM_9Xo": {
                                    "active": true,
                                    "owner": "Default"
                                }
                            },
                            "name": "Default",
                            "campaigns": {
                                campaign: null
                            },
                            "giftys": {
                                "": {
                                    "city": "",
                                    "keyword": "",
                                    "lang": {
                                        "gift": "",
                                        "gift_from": "",
                                        "gift_short": "",
                                        "how_to_redeem": ""
                                    },
                                    description: "",
                                    "price": {
                                        "display": "",
                                        "stripe": {
                                            "all_fees_pct": null,
                                            "application_fee": null,
                                            "cents": null,
                                            "currency": null,
                                            "stripe_fee": null
                                        }
                                    },
                                    "console_id": "Default"
                                }
                            },
                            "notifications": {
                                "uid": {
                                    message: null
                                }
                            },
                            "payment": {
                                "balance": {
                                    "cad": {
                                        "cents": null
                                    }
                                }
                            },
                            "console_id": "Default"
                        }
                    })
                }

            })
        }
    },
    updateChartData: (campaign, filter, startDate, endDate) => {
        console.log('UPDATE_CHART');
        console.log(campaign);

        return dispatch => {

            if (endDate == null || startDate == null) {
                dispatch({
                    type: 'DATE_FILTER',
                    filter: -1,
                    startDate: startDate,
                    endDate: endDate
                })
            } else if (filter == null) {
                database.ref('stats/stats_by_campaign/' + campaign).orderByKey().startAt(startDate.unix().toString()).endAt(endDate.unix().toString()).once('value', function (snapshot) {
                    console.log(snapshot.val());
                    console.log(startDate);
                    var chartData;


                    if (snapshot.val() === null) {
                        /*This is used for creating dummy data when there is:
                         * a) A new registrant
                         * b) When there is no *_public information compiled yet.
                         *Not very efficient? I agree. Hax0r
                         **/

                        chartData = flattener({
                            [startDate.clone().unix()]: {
                                created: 0,
                                gross: 0,
                                new: 0,
                                redeemed: 0
                            }
                        }, startDate.clone(), endDate.clone());
                        console.log(chartData);

                    } else {

                        chartData = flattener(snapshot.val(), startDate.clone(), endDate.clone());
                    }

                    console.log(chartData);
                    console.log(campaign);
                    dispatch({
                        type: 'CHART_DATA',
                        campaign: campaign,
                        chartData: chartData[0],
                        gross: chartData[1],
                        redeemed: chartData[2],
                        newCustomers: chartData[3],
                        total: chartData[4],
                        percentChange: chartData[5]
                    });
                })
            } else {
                database.ref('stats/stats_by_campaign/' + campaign).orderByKey().startAt(startDate.unix().toString()).endAt(endDate.unix().toString()).once('value', function (snapshot) {
                    console.log(snapshot.val());
                    var chartData = flattener(snapshot.val(), startDate, endDate);

                    dispatch({
                        type: 'UPDATE_CHART_DATA',
                        campaign: campaign,
                        chartData: chartData[0],
                        gross: chartData[1],
                        redeemed: chartData[2],
                        newCustomers: chartData[3],
                        total: chartData[4],
                        percentChange: chartData[5],
                        filter: filter,
                        startDate: startDate.clone(),
                        endDate: endDate.clone()
                    });
                })
            }

        }
    },
    updateGifty: (key1, dashboard, editGifty) => {
        return dispatch => {
            var Gifty = database.ref('consoles/' + dashboard + '/giftys/' + key1);
            Gifty.set(editGifty);
            Gifty.off();
            dispatch({
                type: 'MODAL_TOGGLE',
                value: 'close'
            })
        }
    },
    updateTransactionInfo: (id, gift, startDate, endDate) => {
        return dispatch => {

            /*If there is no gift, then grab all transaction History*/
            if (gift === 'all') {
                database.ref('transactions/' + id).orderByChild("timestamp").startAt(startDate.unix()).endAt(endDate.unix()).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: {}
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: snapshot.val()
                        });
                    }
                })
            } else {
                database.ref('transactions/' + id).limitToLast(50).orderByChild("timestamp").startAt(startDate.unix()).endAt(endDate.unix()).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: {}
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: snapshot.val()
                        });
                    }

                })
            }
        }
    },

    requestData: (searchTerm, campaign) => {
        return dispatch => {

            let newTerm = "*" + searchTerm + "*";
            let key = database.ref().child('search/request').push({
                index: 'firebase',
                type: 'offers',
                q: newTerm
            }).key;

            var searchResult = {};
            if (searchTerm === '') {
                dispatch({
                    type: 'CAMPAIGN_SEARCH',
                    key: key,
                    searchResult: {}
                })
            } else {

                database.ref('search/response/' + key + '/hits').on('value',
                    function (snapshot) {
                        if (snapshot.val()) {
                            searchResult = snapshot.val();

                            dispatch({
                                type: 'CAMPAIGN_SEARCH',
                                key: key,
                                campaign: campaign,
                                searchResult: searchResult.hits
                            })
                        }

                    });
            }
        }


    },
    consoleEndpoint: (key, type, dashboard, endpoint, bundle) => {
        /*       return dispatch=> {*/
        var newPostRef = database.ref('api/v1/requests').push();
        var id = newPostRef.key;
        var json = {};
        switch (type) {
            case 'create_console':
                json = {
                    type: type,
                    bundle: bundle
                }
                console.log(json);
                break;
            case 'link_create':
                json = {
                    console_id: dashboard,
                    vendor: 'gravity_yyc',
                    type: type,
                    wait_for_response_at: id,
                    offer: key
                };
                break;
            case 'create_campaign':
                json = {
                    console_id: dashboard,
                    type: type,
                    wait_for_response_at: id,
                    bundle: bundle
                };
                console.log(json);
                break;
            case 'remove_user':
                json = {
                    console_id: dashboard,
                    type: type,
                    wait_for_response_at: id,
                    name: bundle
                }
                break;
            case 'assign_default':
                json = {
                    console_id: dashboard,
                    type: type,
                    wait_for_response_at: endpoint,
                    name: bundle
                }
                break;
        }
        newPostRef.set(json
        )/*.then(FirebaseWatcher.links(id))*/.then(
            /*
             database.ref('api/v1/responses/' + id).set({gifty: key, link: id})
             */
        ).then(
            /*   //This is only for the purposes of being able to mock and fake data
             database.ref('stats/stats_by_campaign/-KmMclctWZDKexyM_9Xo/' + moment().unix()).set({
             created: 1,
             new: Math.floor(Math.random() * 2),
             redeemed: Math.floor(Math.random() * 2),
             gross: Math.round(Math.random() * 2 *100)/100
             })*/
        );
        switch (type) {
            case 'link_create': {
                var linkWatcher = database.ref('api/v1/responses/' + dashboard + '/' + id);
                linkWatcher.on('value', function (snapshot) {
                    if (snapshot.val()) {
                        // toast(<div>{snapshot.val().link}</div>);
                        /*
                                                    dispatch({type: 'LINK', link: 'https://gifty.link/' + snapshot.val().link, key: key});
                        */
                    }
                });
            }
        }
        /*        }*/
    }
}


export default {
    Auth,
    FirebaseQuery,
    FirebaseWatcher,
    FireStoreQuery,
    setToken: _token => {
        token = _token;
    },
    FirebaseAuthService,
    common
};
