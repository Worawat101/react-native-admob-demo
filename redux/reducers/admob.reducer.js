import { AD_OFF, AD_ON } from "../constant";
const initialState = {
  ad_status: true,
};
export default (ad_status = initialState, { type }) => {
  switch (type) {
    case AD_ON:
      return { ad_status: true };
    case AD_OFF:
      return { ad_status: false };
    default:
      return ad_status;
  }
};
