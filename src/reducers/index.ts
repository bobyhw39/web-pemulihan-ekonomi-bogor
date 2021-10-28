import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import register from './register'
import auth from './auth'
import categories from './categories'
import product from './product'
import banner from './banner'
import user from './user'
import chat from './chat'
import infoWisata from './infoWisata'
import faq from './faq'
import dashboard from './dashboard'
import admin from './admin'
import categoryFaq from './categoryFaq'

const createRootReducer = (history: any) => combineReducers({
    categoryFaq,
    admin,
    dashboard,
    faq,
    infoWisata,
    chat,
    user,
    banner,
    product,
    categories,
    auth,
    register,
    router: connectRouter(history),
});

export default createRootReducer;