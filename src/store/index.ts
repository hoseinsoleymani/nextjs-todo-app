import {configureStore, createSelector, createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Action, combineReducers} from 'redux';
import {createWrapper, HYDRATE, MakeStore} from 'next-redux-wrapper';

interface SystemData {
    source: string;
}

export interface SystemState {
    data: SystemData | null;
}

const initialSystemState: SystemState = {
    data: null,
};

const systemSlice = createSlice({
    name: 'system',
    initialState: initialSystemState,
    reducers: {
        systemLoaded(state, {payload}: PayloadAction<SystemState>) {
            console.log("first", payload)
            state.data = payload.data;
        },
    },

    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action: any) => {
            console.log("server", action.payload)
            return {
                ...state,
                ...action.payload.data,
            };
        },)
    }
});

interface Pokemon {
    name: string;
}

// API approach
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com'}),
    endpoints: builder => ({
        getPokemonByName: builder.query<Pokemon, string>({
            query: name => `/todos`,
        }),
    }),
});

export const {useGetPokemonByNameQuery} = todoApi;

// Store setup
const reducers = {
    [systemSlice.name]: systemSlice.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
};

const reducer = combineReducers(reducers);

const makeStore: MakeStore<any> = ({reduxWrapperMiddleware}: any) =>
    configureStore({
        reducer,
        devTools: true,
        middleware: getDefaultMiddleware =>
            [...getDefaultMiddleware(), null, todoApi.middleware, reduxWrapperMiddleware].filter(
                Boolean,
            ) as any,
    });

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});

// System thunk
export const fetchSystem = (): AppThunk => async dispatch => {
    const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

    await timeoutPromise(200);

    dispatch(
        systemSlice.actions.systemLoaded({
            data: {
                source: 'GIAP',
            },
        }),
    );
};

// System selectors
const systemSliceSelector = (state: AppState): SystemState => state?.system;

const selectSystemData = createSelector(systemSliceSelector, s => s.data);

export const selectSystemSource = createSelector(selectSystemData, s => s?.source);