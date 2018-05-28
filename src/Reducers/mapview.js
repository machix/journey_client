import moment from 'moment';

const defaultState = {
    altitudeVisible: false,
    currentIndex: 0,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_INDEX':
            console.log('SET_CURRENT_INDEX');
            return {
                ...state,
                currentIndex: action.value,
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