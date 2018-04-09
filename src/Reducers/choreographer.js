import moment from 'moment';

const defaultState = {
    activeCommands: [],
    chatExpanded: false,
    liveJourneyMeta: [],
    preloadMeta: [null, null],
    currentMeta: null,
    position: 0,
    prevPosition: 0,
    nextPosition: 0,
    initialLoad: true,
    currentJourney: null,
    messages: [],
    message: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LIVE_JOURNEY_META':
            console.log('livejourneymetareducer');
            return {
                ...state,
                liveJourneyMeta: action.liveJourneyMeta,
                journeyId: action.journeyId
            };
        case 'PRELOAD_META':
            console.log('PRELOAD_META');
            return {
                ...state,
                preloadMeta: action.value
            };

        case 'CHANGE_POSITION':
            console.log('CHANGE_POSITION');
            console.log(action.value);

            if (action.value > 0 && action.value < state.liveJourneyMeta.length - 1) {
                console.log('in the middle');
                //IN THE THICK OF IT
                return {
                    ...state,
                    position: action.value,
                    prevPosition: action.value - 1,
                    nextPosition: action.value + 1
                }
            } else if (action.value === state.liveJourneyMeta.length - 1) {
                console.log('at the end');
                //AT THE END
                return {
                    ...state,
                    position: action.value,
                    prevPosition: action.value - 1,
                    nextPosition: action.value
                }
            } else {
                console.log('at the beginning');
                return {
                    ...state,
                    position: action.value,
                    prevPosition: 0,
                    nextPosition: action.value + 1
                }
            }
            break;
        case 'CHAT_INITIAL_LOAD':
            console.log('CHAT_INITIAL_LOAD');
            return {
                ...state,
                messages: action.messages
            };
        case 'CHAT_CHILD_ADDED':
            console.log('CHAT_CHILD_ADDED');
            return {
                ...state,
                messages: [...state.messages, action.message],
                message: action.message
            };

        case 'UPDATE_COMMANDS':
            return{
                ...state,
                activeCommands: action.value
            };


        default:
            return state;

    }

}