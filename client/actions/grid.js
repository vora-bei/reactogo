/**
 * Created by Никита on 20.09.2016.
 */
export const REQUEST_DATA = 'REQUEST_DATA';
export const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
export function requestData() {
    return {
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
        data: [{'title': 1, 'descr': 2,more:1}, {'title': 2, 'descr': 2,more:2}, {'title': 5, 'descr': 2,more:3}],
        type: 'REQUEST_DATA'
    };
};
export function changeDirection(key, direction) {
    return {
        key,
        direction,
        type: 'CHANGE_DIRECTION'
    };
};