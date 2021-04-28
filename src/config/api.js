var config = {
    URL:'http://68.183.90.24:9000/',
    ENDPOINT:{
        GET:{
            GET_ALL_USERS: 'users',
            SEARCH_BY_NAME_PATH_NAME:'search/',
            GET_USER_BY_ID_PATH_ID:'user/',
            GET_CURRENT_USER:'user'
        },
        POST:{
            REGISTER: 'register',
            LOGIN: 'login',
        },
        PUT:{
            UPDATE_USER:'user',
        },
        DELETE:{
            DELETE_CURRENT_USER:'user'
        }
    }
}

export default config;