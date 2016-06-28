/**
 * Created by Никита on 20.09.2016.
 */
export const REQUEST_DATA = 'REQUEST_DATA';
export function requestData() {
    return {
        columns: [{'name': 'title'}, {'name': 'descr'}],
        data: [{'title': 1, 'desr': 2}, {'title': 1, 'desr': 2}, {'title': 1, 'desr': 2}],
        type: 'REQUEST_DATA'
    };
};