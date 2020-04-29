import L from 'react-loadable';
import LoadingPage from './LoadingPage';
import withTracker from '../withTracker';

const Loadable = opts =>
  withTracker(
    L({
      loading: LoadingPage,
      delay: 300,
      ...opts,
    }),
  );

export default Loadable;
