<img width="60px" align="left" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnpI4HLNuBlCdaN5lmt3_h00OEMNZ7yiK8EqhgqRY&s"></img>

<h2>&nbsp;&nbsp;LeafMCBE</h2>
<p>&nbsp;&nbsp;&nbsp;A Server Software for Minecraft: Bedrock Edition written in Javascript (With types). Server under development</p>

# Link

[Discord](https://discord.gg/MdkcEWjdEn) <br>
[Protocol](https://github.com/PrismarineJS/bedrock-protocol) <br>
[Example Plugin](https://github.com/LeafMCBE/ExamplePlugin)

# Installation

**NOTE:** Before Installing, Check you have `Node` and `Git` haved installed.

- Clone the repo, `git clone --recurse-submodules https://github.com/hvlxh/LeafMCBE.git`
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

# Features

- Plugins Supported
- Logger Supported
- Commands Supported
- Console Commands Supported
- Events Supported
- Chunks Supported (20%)

# Todo List

- Better Network system.
- Imrprove in world system
