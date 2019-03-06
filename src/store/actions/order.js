import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData).then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
            .catch(error => {
               dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            }).catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
};