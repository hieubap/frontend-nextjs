import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getCacheUser } from "../models/Base";
import { isEmpty, uniq, uniqBy } from "../utils/opLodash";


const initialState = {
    user: (() => {
        if (typeof window !== "undefined") {
            try {
                return JSON.parse(localStorage.getItem("user"));
            } catch (e) {
                return {};
            }
        }
    })(),
    settings: {},
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        updateUser(state, { payload }) {
            state.user = payload;
        },
        changeStatus(state, { payload }) {
            state.user.statusACCOUNT = payload;
        },
        updateSetting(state, { payload }) {
            Object.assign(state.settings, payload);
        },
    },
});

export const { updateUser, updateSetting, changeStatus } = appSlice.actions;

const stateApp = (state) => state.app;
const selectUser = createSelector(stateApp, (app) => app.user);
const selectUserManifest = createSelector(stateApp, (app) => {
    if(!isEmpty(app?.user?.manifest)){
        return app.user.manifests.map(manifest=>({id : manifest.id , name : manifest.name}))
    }
    return []
});
const selectUserPermissions = createSelector(stateApp, (app) => {
    const permissionList = [];
    if(!isEmpty(app?.user?.manifest)){
        app.user.manifests.forEach(manifest=>permissionList.push(manifest.permissions))
        return uniqBy(permissionList , 'id')
    }return []
});


export const appSelects = {
    selectUser,
    selectUserPermissions , selectUserManifest
};

export default appSlice.reducer;