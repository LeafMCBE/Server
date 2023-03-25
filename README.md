# LeafMCBE

A Server Software for Minecraft: Bedrock Edition written in Javascript (With types). Server under development

# Link

[Discord](https://discord.gg/MdkcEWjdEn) <br>
[Protocol](https://github.com/PrismarineJS/bedrock-protocol) <br>
[Example Plugin](https://github.com/LeafMCBE/ExamplePlugin)

# Features

- Plugins Supported
- Logger Supported
- Commands Supported
- Console Commands Supported
- Events Supported
- Chunks Supported (20%)

# Installation

- Clone the repo, `git clone https://github.com/hvlxh/LeafMCBE.git`
- Install dependencies, `npm i`
- Start the server, `node .`, `node start.js`, or `npm run start`

# Plugin Usage

Create a javascript file in `./leaf/plugins/<folder>` and write like this:

```js
import { Plugin } from "../../src/plugins/BasePlugin.js";

class Example extends Plugin {
  constructor() {
    super({
      name: "Example",
      version: [1, 0, 0],
      srvVersion: [1, 19, 50],
    });
  }

  onEnable() {
    this.api.getLogger().info("I am enabled!");
  }
}
```

# Todo List

- Better Network system.
- Imrprove in world system
