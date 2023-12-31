/**
 * This file helps us maintain the channels fetched in state, such that when we leave the tab, the channels can be fetched from memory
 */

// External Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CHANNNEL_DEACTIVATED_STATE: 2,
  CHANNEL_BLOCKED_STATE: 3,
  CHANNEL_ACTIVE_STATE: 1,
  CHANNEL_BLACKLIST: [], //a list of channels
  page: 0,
  channels: [], // the channels meta-data
  subscriptionStatus: {}, // a mapping of channel address to user's subscription status
  channelsCache: {}, // a mapping of channel address to channel details
  channelSettings: {}, // a mapping of channel address to channel settings
  userSettings: {}, // a mapping of channel address to user settings
};

export const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannelMeta: (state, action) => {
      state.channels = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    cacheChannelInfo: (state, action) => {
      const { address, meta } = action.payload;
      state.channelsCache[address] = meta;
    },
    cacheSubscribe: (state, action) => {
      const { channelAddress } = action.payload;
      const channelIndex = state.channels.findIndex((channelInfo) => channelInfo.addr === channelAddress);
      state.channels[channelIndex].memberCount++;
      state.channels[channelIndex].isSubscriber = true;
    },
    cacheUnsubscribe: (state, action) => {
      const { channelAddress } = action.payload;
      const channelIndex = state.channels.findIndex((channelInfo) => channelInfo.addr === channelAddress);
      state.channels[channelIndex].memberCount--;
      state.channels[channelIndex].isSubscriber = false;
    },
    updateBulkSubscriptions: (state, action) => {
      state.subscriptionStatus = action.payload;
    },
    updateSubscriptionStatus: (state, action) => {
      const { channelAddress, status } = action.payload;
      state.subscriptionStatus[channelAddress] = status;
    },
    updateBulkUserSettings: (state, action) => {
      state.userSettings = action.payload;
    },
    updateUserSetting: (state, action) => {
      const { channelAddress, settings } = action.payload;
      state.userSettings[channelAddress] = settings;
    },
    removeUserSetting: (state, action) => {
      delete state.userSettings[action.payload];
    },
    updateBulkChannelSettings: (state, action) => {
      state.channelSettings = action.payload;
    },
    updateChannelSetting: (state, action) => {
      const { channelAddress, settings } = action.payload;
      state.channelSettings[channelAddress] = settings;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setChannelMeta,
  incrementPage,
  cacheChannelInfo,
  cacheSubscribe,
  cacheUnsubscribe,
  updateBulkSubscriptions,
  updateSubscriptionStatus,
  updateBulkUserSettings,
  updateUserSetting,
  removeUserSetting,
  updateBulkChannelSettings,
  updateChannelSetting,
} = channelSlice.actions;

export default channelSlice.reducer;
