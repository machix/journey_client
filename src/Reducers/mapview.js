import moment from 'moment';

const defaultState = {
    altitudeVisible: false,
    indexMap: {},
    currentIndex: 0,
    fitBounds: false,
    videoModalVisible: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_INDEX':
            return {
                ...state,
                currentIndex: action.value,
                fitBounds: false
            };
        case 'SET_FIT_BOUNDS':
            return {
                ...state,
                fitBounds: action.value
            };

        case 'SET_ALTITUDE_VISIBLE':
            return {
                ...state,
                altitudeVisible: action.value
            };
        case 'SET_VIDEO_MODAL_VISIBLE':
            return {
                ...state,
                videoModalVisible: action.value
            };

        default:
            return state;

    }

}