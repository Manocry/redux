import axios from 'axios';
const action = {
    type: 'apiCallBegan',
    payload: {
        url :'',
        method: get,
        data: {
        },
        onSuccess: '',
        onError
    }
}
const api = ({dispatch} )=>next => async action =>{
if (action.type !== "apiCallBegan") return next(action);
//next(action);
const {url, method, data, onSuccess, onError} = action.payload;
    try {
        await axios({
            url: 'http://localhost:9001/api'+url,
            method,
            data
        });
            dispatch({type: onSuccess, payload: data})
    }catch (error){
            dispatch({type: onError, payload: error})
    }
}

export default api;