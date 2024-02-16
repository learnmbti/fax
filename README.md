Fax
=================

Pipelines to transfer data utilizing GitHub actions

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g fax
$ fax COMMAND
running command...
$ fax (--version)
fax/0.0.0 linux-x64 node-v20.9.0
$ fax --help [COMMAND]
USAGE
  $ fax COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [Fax](#fax)
- [Usage](#usage)
- [Commands](#commands)
  - [`fax hello PERSON`](#fax-hello-person)
  - [`fax hello world`](#fax-hello-world)
  - [`fax help [COMMANDS]`](#fax-help-commands)
  - [`fax plugins`](#fax-plugins)
  - [`fax plugins:install PLUGIN...`](#fax-pluginsinstall-plugin)
  - [`fax plugins:inspect PLUGIN...`](#fax-pluginsinspect-plugin)
  - [`fax plugins:install PLUGIN...`](#fax-pluginsinstall-plugin-1)
  - [`fax plugins:link PLUGIN`](#fax-pluginslink-plugin)
  - [`fax plugins:uninstall PLUGIN...`](#fax-pluginsuninstall-plugin)
  - [`fax plugins reset`](#fax-plugins-reset)
  - [`fax plugins:uninstall PLUGIN...`](#fax-pluginsuninstall-plugin-1)
  - [`fax plugins:uninstall PLUGIN...`](#fax-pluginsuninstall-plugin-2)
  - [`fax plugins update`](#fax-plugins-update)

## `fax hello PERSON`

Say hello

```
USAGE
  $ fax hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/random-istp/fax/blob/v0.0.0/src/commands/hello/index.ts)_

## `fax hello world`

Say hello world

```
USAGE
  $ fax hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ fax hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/random-istp/fax/blob/v0.0.0/src/commands/hello/world.ts)_

## `fax help [COMMANDS]`

Display help for fax.

```
USAGE
  $ fax help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for fax.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.12/src/commands/help.ts)_

## `fax plugins`

List installed plugins.

```
USAGE
  $ fax plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ fax plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/index.ts)_

## `fax plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fax plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ fax plugins add

EXAMPLES
  $ fax plugins add myplugin 

  $ fax plugins add https://github.com/someuser/someplugin

  $ fax plugins add someuser/someplugin
```

## `fax plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ fax plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ fax plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/inspect.ts)_

## `fax plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fax plugins install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ fax plugins add

EXAMPLES
  $ fax plugins install myplugin 

  $ fax plugins install https://github.com/someuser/someplugin

  $ fax plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/install.ts)_

## `fax plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ fax plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ fax plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/link.ts)_

## `fax plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fax plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fax plugins unlink
  $ fax plugins remove

EXAMPLES
  $ fax plugins remove myplugin
```

## `fax plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ fax plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/reset.ts)_

## `fax plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fax plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fax plugins unlink
  $ fax plugins remove

EXAMPLES
  $ fax plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/uninstall.ts)_

## `fax plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fax plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fax plugins unlink
  $ fax plugins remove

EXAMPLES
  $ fax plugins unlink myplugin
```

## `fax plugins update`

Update installed plugins.

```
USAGE
  $ fax plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.1/src/commands/plugins/update.ts)_
<!-- commandsstop -->
