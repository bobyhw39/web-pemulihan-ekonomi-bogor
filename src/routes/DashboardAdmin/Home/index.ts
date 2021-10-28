import { lazy } from 'react';
import { retry } from '../../../utils/retry';

const Home = lazy(() =>  retry(() =>import(/* webpackChunkName: "Home" */ "./Home")));

export default Home;