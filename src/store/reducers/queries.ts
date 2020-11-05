import { v4 } from 'uuid'
import { saveQueries } from '../../persistence'
import { ADD_QUERY, APP_INIT, DELETE_QUERY, Query, QueriesState, UPDATE_QUERY } from '../actions';

export default function queriesReducer(state: QueriesState = [], action) {
    switch (action.type) {
        case APP_INIT:
            return action.payload.queries;

        case ADD_QUERY:
            state = state.concat({
                id: v4(),
                name: 'Untitled Query',
                nodes: [],
                relationships: [],
                predicates: [],
                output: [],
                ...action.payload,
            } as Query)
            return saveQueries(state);

        case UPDATE_QUERY:
            state = state.filter(query => query.id !== action.payload.id)
            .concat({
                ...action.payload,
                updated: false,
                savedAt: new Date()
            } as Query)
            return saveQueries(state);

        case DELETE_QUERY:
            state = state.filter(query => query.id !== action.payload.id)
            return saveQueries(state);
    }

    return state
}
