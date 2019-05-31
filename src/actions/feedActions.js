import axios from '../helpers/lioAxiosInstance';
import { GET_FEED_REQUEST, GET_FEED_SUCCESS, GET_FEED_FAILURE } from '../constants/actionTypes';

export const getFeed = params => async (dispatch, getState) => {
    dispatch(getFeedRequest());

    try {
        const { data } = await axios.get('/feed', {
            headers: {
                'Authorization': `Bearer ${getState().user && getState().user.token}`
            },
            params
        });

        dispatch(getFeedSuccess(data.items));
    } catch (e) {
        dispatch(getFeedFailure(e.response ? e.response.data.msg : 'Could not load feed'));
    }
}

export const getFeedRequest = () => ({
    type: GET_FEED_REQUEST
});

export const getFeedSuccess = feed => ({
    type: GET_FEED_SUCCESS,
    payload: { feed }
});

export const getFeedFailure = error => ({
    type: GET_FEED_FAILURE,
    payload: { error }
});
