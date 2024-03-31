import Mixpanel from "mixpanel-browser";

Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY!, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",

});
export default Mixpanel;
