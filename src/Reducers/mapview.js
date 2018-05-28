import moment from 'moment';

const defaultState = {
    altitudeVisible: false,
    currentIndex: 0,
    fitBounds: false

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_INDEX':
            console.log('SET_CURRENT_INDEX');
            return {
                ...state,
                currentIndex: action.value,
                fitBounds: false
            };
        case 'SET_FIT_BOUNDS':
            return {
                ...state,
                fitBounds: true
            };

        case 'SET_ALTITUDE_VISIBLE':
            return {
                ...state,
                altitudeVisible: action.value
            };

        default:
            return state;

    }

}