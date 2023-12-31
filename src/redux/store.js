// External Packages
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Internal Components
import adminReducer from './slices/adminSlice';
import channelCreationReducer from './slices/channelCreationSlice';
import channelReducer from './slices/channelSlice';
import contractReducer from './slices/contractSlice';
import notificationReducer from './slices/notificationSlice';
import canSendNotification from "./slices/sendNotificationSlice";
import spamReducer from './slices/spamSlice';
import userJourneyReducer from './slices/userJourneySlice';
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
	contracts: contractReducer,
	channels: channelReducer,
	channelCreation: channelCreationReducer,
	admin: adminReducer,
	notifications: notificationReducer,
	spam: spamReducer,
	userJourney: userJourneyReducer,
	canSend:canSendNotification,
	user: userReducer
});

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	})
});

export default store;
