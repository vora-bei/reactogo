/**
 * Created by Никита on 20.09.2016.
 */
import {REQUEST_DATA,CHANGE_DIRECTION} from 'grid.js';

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
    data: [{'title': 1, 'desr': 2}, {'title': 1, 'desr': 2}, {'title': 1, 'desr': 2}]
});

export const gridsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (REQUEST_DATA):
            return state.set('columns', Immutable.fromJS(action.columns))
                .set('data', Immutable.fromJS(action.data))
        case (CHANGE_DIRECTION):
            return state.set('columns', state.get('columns').map((column)=>
                column.get('name')==action.key?column.set('sort',action.direction):column
            ));
        default:
            return state;
    }
};
