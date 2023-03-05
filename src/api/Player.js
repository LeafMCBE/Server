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

import srv from "../../start.js";

class Player {
  /**
   * @readonly
   * @type {import('bedrock-protocol').Client}
   */
  client;

  /**
   * @readonly
   * @type {string}
   */
  username;

  /**
   *
   * @param {import('bedrock-protocol').Client} client
   */
  constructor(client) {
    this.client = client;
    this.username = client.username;
  }

  /**
   *
   * @param {string} text
   */
  send(text) {
    this.client.queue("text", {
      type: "chat",
      needs_transation: false,
      source_name: "",
      xuid: "",
      platform_chat_id: "",
      message: text,
    });

    srv.logger.chat.info(text);
  }

  /**
   *
   * @param {string | undefined} reason
   */
  kick(reason) {
    this.client.disconnect(reason || `Kicked for No reason provided`);
  }
}

export default Player;
