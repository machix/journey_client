import agent from './agent';

const promiseMiddleware = store => next => action => {
    var uid;
    if (action.payload) {
        if (isPromise(action.payload)) {

            console.log('Register');
            console.log(action.payload);

            action.payload.then(
                (res) => {
                    console.log(action.type);
                    if (action.type === 'REGISTER') {
                        uid = res.uid
                        console.log('Register res');

                        let registerBundle = {
                            name: action.name,
                            vendor: action.vendor,
                            uid: uid
                        };

                        let campaignBundle = {
                            name: 'My Campaign',
                            type: 'email'
                        }

                        agent.FirebaseQuery.consoleEndpoint(null, 'create_console', null, 'users/' + res.uid, registerBundle);
                        agent.FirebaseQuery.consoleEndpoint(null, 'create_campaign', null, 'users/' + res.uid, campaignBundle);
                        action.payload = res;
                        action.uid = res.uid;
                        store.dispatch(action);
                    } else {
                        action.payload = res;
                        action.uid = res.uid;
                        store.dispatch(action);
                    }
                },
                error => {
                    console.log('register error');
                    if (error.code === 'auth/user-not-found') {
                        action.register = true;
                    }
                    action.error = true;
                    action.payload = error.message;
                    action.code = error.code;
                    store.dispatch(action);
                })

            return;
        }
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

/*const localStorageMiddleware = store => next => action => {
 if (action.type === 'REGISTER' || action.type === 'LOGIN') {
 console.log(action.payload);
 if (!action.error) {
 window.localStorage.setItem('jwt', action.payload.user.token);
 agent.setToken(action.payload.user.token);
 }
 } else if (action.type === 'LOGOUT') {
 window.localStorage.setItem('jwt', '');
 agent.setToken(null);
 }

 next(action);
 };*/

export {
    /*  localStorageMiddleware,*/
    promiseMiddleware
};
/*

 if (isPromise(action.payload)) {
 /!*    store.dispatch({ type: 'ASYNC_START', subtype: action.type });*!/
 action.payload.then(
 res => {
 action.payload = res;
 store.dispatch(action);
 },
 error => {
 /!*    console.log('this is the e-mail');
 console.log(action);

 agent.Auth.register(action.email, action.password).catch(function(error) {
 // Handle Errors here.
 action.error = true;
 action.payload = error.message;
 store.dispatch(action);
 // ...
 })*!/
 if(error.code == 'auth/user-not-found') {
 action.register = true;
 }
 action.error = true;
 action.payload = error.message;
 action.code = error.code;
 store.dispatch(action);
 }
 );*/
