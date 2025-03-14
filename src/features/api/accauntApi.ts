import {UserData, UserProfile, UserRegister} from "../../utils/types";
import {base_url} from "../../utils/constants.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../../app/store.ts";

export const accountApi = createApi({
    reducerPath: "account",
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers, {getState, endpoint}) => {
            if (endpoint === 'updateUser') {
                const token = (getState() as RootState).token;
                headers.set("Authorization", token);
            }
            return headers;
        }
    }),
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: user => ({
                url: '/user',
                method: 'POST',
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: '/login',
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['profile']
        }),
        updateUser: builder.mutation<UserProfile, UserData>({
            query: (user) => ({
                url: '/user',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['profile']
        }),
        changePassword: builder.mutation<void, { newPassword: string, token: string }>({
            query: ({newPassword, token}) => ({
                url: '/user/password',
                method: 'PUT',
                headers: {
                    'X-Password': newPassword,
                    Authorization: token
                }
            }),
            invalidatesTags: ['profile']
        })
    })
})

export const {
    useChangePasswordMutation,
    useFetchUserQuery,
    useLazyFetchUserQuery,
    useUpdateUserMutation,
    useRegisterUserMutation
} = accountApi
