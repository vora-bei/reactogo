/**
 * Created by Никита on 20.09.2016.
 */
import {REQUEST_DATA} from 'grid.js';

export const initialState = Immutable.fromJS({
    columns: [
        {
            'name': 'title',
            'title': 'Имя',
            'sort': 1
        },
        {
            'name': 'descr',
            'title': 'Описание',
            'sort': 0
        },
        {
            'name': 'more',
            'title': 'Больше',
            'sort': -1
        }
    ],
    data: [{'title': 1, 'desr': 2}, {'title': 1, 'desr': 2}, {'title': 1, 'desr': 2}],
});

export const fetchedDataReducer = (state = initialState, action) => {
    switch (action.type) {
        //case (REQUEST_DATA): return state.set('isLoading', true);
        default:
            return state;
    }
};
