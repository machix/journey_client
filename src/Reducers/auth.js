export default (state = {
    isAuthed: false,
    user: null
}, action) => {
    switch (action.type) {
        /*Register & Login both use an older version of middleware. Please switch to Redux-Thunk*/
        case 'LOGIN':
            console.log('Login');
            return {
                ...state,
                user: action.user,
                isAuthed: action.authenticated
            };
        // case 'LOGIN_PAGE_UNLOADED':
        // case 'REGISTER_PAGE_UNLOADED':
        //     console.log('asd;flka;fdlkjasd;flkjasd;flkjasd;fklja;fkljasdf');
        //     return {uid: state.uid};
        // /*        case 'ASYNC_START':
        //  if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
        //  return {...state, inProgress: true};
        //  }
        //  break;*/
        case 'UPDATE_FIELD_AUTH':
            return {
                ...state,
                [action.key]: action.value
            };
        default:
            return {...state}
    }

    return state;
};
