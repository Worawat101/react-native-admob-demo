import { AD_OFF, AD_ON } from "../constant";
export const ToggleAdOn = () => ({
  type: AD_ON,
});
export const ToggleAdOff = () => ({
  type: AD_OFF,
});

export const ToggleAds = (ads_state) => {
  return async (dispatch) => {
    if (ads_state === true) {
      dispatch(ToggleAdOn());
    } else {
      dispatch(ToggleAdOff());
    }
  };
};
