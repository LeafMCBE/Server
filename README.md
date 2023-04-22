# ARCHIVED
We are switching the language to Typescript for more easy-to-use and easy-to-write. Check out https://github.com/LeafMCBE/LeafMCBE

[![Discord](https://img.shields.io/discord/1072145422577041555?color=blue&label=Discord&style=for-the-badge)](https://discord.gg/MdkcEWjdEn)
![Latest Tag](https://img.shields.io/github/v/tag/LeafMCBE/Server?label=LATEST%20TAG&style=for-the-badge)
[![License](https://img.shields.io/github/license/LeafMCBE/Server?style=for-the-badge)](https://github.com/LeafMCBE/Server/blob/master/LICENSE)

<img width="110px" align="left" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnpI4HLNuBlCdaN5lmt3_h00OEMNZ7yiK8EqhgqRY&s"></img>

<h1>LeafMCBE</h2>
<p>A Server Software for Minecraft Bedrock Edition written in Javascript</p>

# Link

[Discord](https://discord.gg/MdkcEWjdEn) <br>
[Protocol](https://github.com/PrismarineJS/bedrock-protocol) <br>
[Example Plugin](https://github.com/LeafMCBE/ExamplePlugin)

# Installation

**NOTE:** Before Installing, Check you have `Node` and `Git` haved installed.

- Clone the repo, `git clone --recurse-submodules https://github.com/LeafMCBE/Server.git`
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
