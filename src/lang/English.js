/**
 *  _                 __ __  __  _____ ____  ______
 * | |               / _|  \/  |/ ____|  _ \|  ____|
 * | |     ___  __ _| |_| \  / | |    | |_) | |__
 * | |    / _ \/ _` |  _| |\/| | |    |  _ <|  __|
 * | |___|  __/ (_| | | | |  | | |____| |_) | |____
 * |______\___|\__,_|_| |_|  |_|\_____|____/|______|
 *
 * Copyright 2023 hvlxh
 * Github: https://github.com/LeafMCBE/Server
 */

/**
 * @type {import('../base/BaseLang.js').default}
 */
const Base = {
  playerJoined: "%p joined",
  playerConnected: "%p connected",
  playerLeft: "%p left",
  startingServer: "Starting Server...",
  startedOn: "Listening to %i:%p",
  loadingCCS: "Loading Console Command Sender...",
  loadingPlugin: "Loading %p",
  errFromPlugin: "Error From Plugin",
  errFromPacket: "Packet Error:",
  unhandledInteract: "Unhandled player interaction: %i",
  rpsRefused: "%p refused to install rps, kicking...",
  rpsHaveAll: "%p have all the rps",
  shutdownMsg: "Shut downing the server in few seconds...",
  minArg: "Minimum arguments is %m but got %r\nUsage: %u",
  maxArg: "Maximum arguments is %m but got %r\nUsage: %u",
  banned: "You were been banned by %u",
  bannedC: "%p banned by %u",
  kicked: "You were been kicked by %u",
  kickedC: "%p kicked by %u",
  alrBan: "This player was already banned.",
  notOnline: "%p not online.",
};

export default Base;
