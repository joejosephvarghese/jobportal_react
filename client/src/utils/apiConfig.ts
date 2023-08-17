import configKeys from "./config";

const apiConfig = {
    userRegister : `${configKeys.API_URL}user-auth/register`,
    userLogin: `${configKeys.API_URL}user-auth/login`,
    googleSignIN: `${configKeys.API_URL}user-auth/sign-in-with-google`,
    userData: `${configKeys.API_URL}user/user-data`,
    updateUser: `${configKeys.API_URL}user/update-user`,
    uploadResume: `${configKeys.API_URL}user/update-resume`,
    deleteResume: `${configKeys.API_URL}user/delete-resume`,
}

export default apiConfig;