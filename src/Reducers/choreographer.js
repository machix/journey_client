import moment from 'moment';
const defaultState = {
    liveJourneyMeta: null,
    preloadMeta: [null, null],
    visibleMeta: null,
    position: 0

};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'LIVE_JOURNEY_META':
            console.log('livejourneymetareducer');
            return {
                ...state,
                liveJourneyMeta: action.liveJourneyMeta
            };
        case 'PRELOAD_META':
            console.log('PRELOAD_META');
            return {
                ...state,
                preloadMeta: action.value
            };
        case 'VISIBLE_META':
            console.log('VISIBLE_META');
            return {
                ...state,
                visibleMeta: action.value
            }
        default:
            return state;

    }

}