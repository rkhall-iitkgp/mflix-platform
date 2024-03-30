import Mixpanel from 'mixpanel-browser';
Mixpanel.init('13a3fa7691437f64e2f463dc79bb5cc2', {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
});
export default Mixpanel;