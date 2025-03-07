import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserData, UserProfile, UserRegister} from "../../utils/types";
import {base_url, createToken} from "../../utils/constants.ts";
import {RootState} from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/user`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 409) {
            throw new Error(`user ${user.login} already exist`)
        }
        if (!response.ok) {
            throw new Error('Something goes wrong')
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        return {user: data, token};
    }
)

export const fetchUser = createAsyncThunk(
    'users/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/login`, {
            method: 'Post',
            headers: {
                Authorization: token
            }
        })
        if (response.status === 401) {
            throw new Error(`Login or password incorrect`)
        }
        if (!response.ok) {
            throw new Error('Something goes wrong')
        }
        const data = await response.json();
        return {user: data, token}
    }
)

export const updateUser = createAsyncThunk<UserProfile, UserData, { state: RootState }>(
    'user/update',
    async (user, {getState}) => {
        const response = await fetch(`${base_url}/user`, {
            method: 'Put',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().token,
            }
        })
        if (response.status === 401) {
            throw new Error(`Login or password incorrect`)
        }
        if (!response.ok) {
            throw new Error('Something goes wrong')
        }
        return await response.json();
    }
)

export const changePassword = createAsyncThunk<string, string, { state: RootState }>(
    'user/password',
    async (password: string, {getState}) => {
        const response = await fetch(`${base_url}/user/password`, {
            method: 'Put',
            headers: {
                'X-Password': password,
                Authorization: getState().token
            }
        })
        if (response.status === 401) {
            throw new Error(`Login or password incorrect`)
        }
        if (!response.ok) {
            throw new Error('Something goes wrong')
        }
        return createToken(getState().user.login, password);
    }
)