/**
 * Created by Никита on 20.09.2016.
 */
import { REQUEST_DATA} from 'grid.js';

export const initialState = Immutable.fromJS({
    columns:[],
    data:[]
});

export const fetchedDataReducer = (state = initialState, action) => {
    switch(action.type) {
        //case (REQUEST_DATA): return state.set('isLoading', true);
        default: return state;
    }
};
