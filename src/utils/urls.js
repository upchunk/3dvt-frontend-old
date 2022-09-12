/* eslint-disable no-undef */
export const baseURL = () =>
  process.env.NODE_ENV === "production"
    ? "https://crawlerhub.lndata.com"
    : process.env.NODE_ENV === "staging"
    ? `https://crawlerhub-staging.lndata.com`
    : `http://localhost:8000`;

export const userInfoUrl = (id) => `/api/users/${id}/`;

export const groupInfoUrl = (id) => `/api/group/${id}/`;

export const JWTAuthenticateUrl = () => `/api/token/`;

export const RefreshTokenUrl = () => `/api/token/refresh/`;

export const ApiKeyUrl = () => `/api/apikey/`;

export const RegisterUrl = () => `/api/register/`;

export const UserUpdateUrl = (id) => `/api/update_profile/${id}/`;

export const ChangePasswordUrl = (id) => `/api/change_password/${id}/`;

export const LogOutUrl = () => `/api/logout/`;

export const LogOutAllUrl = () => `/api/logout/all/`;

export const SegmentationUrl = () => `/api/segmentation/`;

export const SegmentationObjectUrl = () => `/api/segmentation/${id}/`;

export const ReconstructionUrl = () => `/api/reconstruction/`;

export const ReconstructionObjectUrl = () => `/api/reconstruction/${id}/`;
