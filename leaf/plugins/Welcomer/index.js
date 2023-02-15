import { Base } from "../../../src/base/BasePlugin.js";
import Colors from "../../../src/api/Colors.js";
import Command from "../../../src/plugins/Command.js";

class Welcomer extends Base {
  constructor() {
    super({
      name: "Welcomer",
      version: [1, 0, 0],
      srvVersion: [1, 19, 50],
    });
  }

  onEnable() {
    this.api.getLogger().info("The plugin had been enabled");

    const cmd = new Command({
      name: "leave",
      description: "Left message",
      aliases: ["left"],
      args: {
        min: 1,
        max: 1,
      },
      arguments: [
        {
          name: "name",
          type: "wildcard_target",
          optional: false,
        },
      ],
    });

    cmd.run = () => {
      this.api.getLogger().info("[Command] wOW");
    };

    cmd.runAsPlayer = () => {
      this.api.getLogger().info("[Command] wOW");
    };

    cmd.execute();
  }

  /**
   *
   * @param {import('../../../src/api/Player.js').default} player
   */
  onPlayerJoin(player) {
    this.api.getServer().broadcast(Colors.yellow(`${player.username} joined`));
  }

  /**
   *
   * @param {import('../../../src/api/Player.js').default} player
   */
  onPlayerLeave(player) {
    this.api.getServer().broadcast(Colors.yellow(`${player.username} left`));
  }
}

export default Welcomer;
