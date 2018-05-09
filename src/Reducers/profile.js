const defaultState = {
    thumbnails: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'JOURNEY_THUMBNAILS': {
            return {
                ...state,
                thumbnails: action.value
            };
        }
        default:
            return state;
    }
}