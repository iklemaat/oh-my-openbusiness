# CLI Reference

Complete reference for the published `oh-my-opencode` CLI.

## Basic Usage

```bash
# Display help
bunx oh-my-opencode

# Or with npx
npx oh-my-opencode
```

## Commands

| Command | Description |
|---------|-------------|
| `install` | Interactive setup wizard |
| `doctor` | Environment diagnostics and health checks |
| `run` | OpenCode session runner with research completion enforcement |
| `get-local-version` | Display local version information and update check |
| `refresh-model-capabilities` | Refresh the cached model capabilities |
| `version` | Show version information |
| `mcp oauth` | MCP OAuth authentication management |

---

## install

Interactive installation tool for initial Oh My OpenBusiness setup. Provides a TUI based on `@clack/prompts`.

### Usage

```bash
bunx oh-my-opencode install
```

### Installation Process

1. **Provider Selection**: Choose which providers you have (bailian-coding-plan)
2. **Plugin Registration**: Registers `oh-my-openbusiness` in OpenCode settings
3. **Configuration File Creation**: Writes the generated config to `oh-my-openbusiness.jsonc` in the active OpenCode config directory
4. **Authentication Hints**: Shows the `opencode auth login` steps for the providers you selected

### Options

| Option | Description |
|--------|-------------|
| `--no-tui` | Run in non-interactive mode without TUI |
| `--bailian <no|yes>` | bailian-coding-plan subscription |
| `--skip-auth` | Skip authentication setup hints |

---

## doctor

Diagnoses your environment to ensure Oh My OpenBusiness is functioning correctly. The current checks are grouped into system, config, tools, and models.

The doctor command detects common issues including:
- Configuration file validity and JSONC parsing errors
- Model resolution and fallback chain verification
- Missing or misconfigured MCP servers

### Usage

```bash
bunx oh-my-opencode doctor
```

### Diagnostic Categories

| Category | Check Items |
|----------|-------------|
| **System** | OpenCode binary, version (>= 1.0.150), plugin registration |
| **Config** | Configuration file validity, JSONC parsing, Zod schema validation |
| **Tools** | Web search MCPs, research MCPs, MCP servers |
| **Models** | Model capabilities cache, model resolution, agent/category overrides, availability |

### Options

| Option | Description |
|--------|-------------|
| `--status` | Show compact system dashboard |
| `--verbose` | Show detailed diagnostic information |
| `--json` | Output results in JSON format |

### Example Output

```
oh-my-openbusiness doctor

┌──────────────────────────────────────────────────┐
│  Oh-My-OpenBusiness Doctor                        │
└──────────────────────────────────────────────────┘

System
  ✓ OpenCode version: 1.0.155 (>= 1.0.150)
  ✓ Plugin registered in opencode.json

Config
  ✓ oh-my-openbusiness.jsonc is valid
  ✓ Model resolution: all agents have valid fallback chains
  ⚠ categories.visual-audit: using default model

Tools
  ✓ websearch MCP available
  ✓ reddit MCP available
  ✓ x-twitter MCP available

Models
  ✓ 11 agents, 8 categories, 0 overrides
  ⚠ Some configured models rely on compatibility fallback

Summary: 10 passed, 1 warning, 0 failed
```

---

## run

Run opencode with todo/background task completion enforcement. Unlike 'opencode run', this command waits until all todos are completed or cancelled, and all child sessions (background tasks) are idle.

### Usage

```bash
bunx oh-my-opencode run <message>
```

### Options

| Option | Description |
|--------|-------------|
| `-a, --agent <name>` | Agent to use (default: from CLI/env/config, fallback: Sisyphus) |
| `-m, --model <provider/model>` | Model override (e.g., bailian-coding-plan/qwen3.5-plus) |
| `-d, --directory <path>` | Working directory |
| `-p, --port <port>` | Server port (attaches if port already in use) |
| `--attach <url>` | Attach to existing opencode server URL |
| `--on-complete <command>` | Shell command to run after completion |
| `--json` | Output structured JSON result to stdout |
| `--no-timestamp` | Disable timestamp prefix in run output |
| `--verbose` | Show full event stream (default: messages/tools only) |
| `--session-id <id>` | Resume existing session instead of creating new one |

---

## get-local-version

Show current installed version and check for updates.

### Usage

```bash
bunx oh-my-opencode get-local-version
```

### Options

| Option | Description |
|--------|-------------|
| `-d, --directory` | Working directory to check config from |
| `--json` | Output in JSON format for scripting |

### Output

Shows:
- Current installed version
- Latest available version on npm
- Whether you're up to date
- Special modes (local dev, pinned version)

---

## version

Show version information.

### Usage

```bash
bunx oh-my-opencode version
```

`--on-complete` runs through your current shell when possible: `sh` on Unix shells, `pwsh` for PowerShell on non-Windows, `powershell.exe` for PowerShell on Windows, and `cmd.exe` as the Windows fallback.

---

## mcp oauth

Manages OAuth 2.1 authentication for remote MCP servers.

### Usage

```bash
# Login to an OAuth-protected MCP server
bunx oh-my-opencode mcp oauth login <server-name> --server-url https://api.example.com

# Login with explicit client ID and scopes
bunx oh-my-opencode mcp oauth login my-api --server-url https://api.example.com --client-id my-client --scopes read write

# Remove stored OAuth tokens
bunx oh-my-opencode mcp oauth logout <server-name> --server-url https://api.example.com

# Check OAuth token status
bunx oh-my-opencode mcp oauth status [server-name]
```

### Options

| Option | Description |
|--------|-------------|
| `--server-url <url>` | MCP server URL (required for login) |
| `--client-id <id>` | OAuth client ID (optional if server supports Dynamic Client Registration) |
| `--scopes <scopes>` | OAuth scopes as separate variadic arguments |

### Token Storage

Tokens are stored in `~/.config/opencode/mcp-oauth.json` with `0600` permissions (owner read/write only). Key format: `{serverHost}/{resource}`.

---

## Configuration Files

The runtime loads user config as the base config, then merges project config on top:

1. **Project Level**: `.opencode/oh-my-openbusiness.jsonc` or `.opencode/oh-my-openbusiness.json`
2. **User Level**: `~/.config/opencode/oh-my-openbusiness.jsonc` or `~/.config/opencode/oh-my-openbusiness.json`

### Filename Compatibility

Both `.jsonc` and `.json` extensions are supported. JSONC (JSON with Comments) is preferred as it allows:
- Comments (both `//` and `/* */` styles)
- Trailing commas in arrays and objects

If both `.jsonc` and `.json` exist in the same directory, the `.jsonc` file takes precedence.

### JSONC Support

Configuration files support **JSONC (JSON with Comments)** format. You can use comments and trailing commas.

```jsonc
{
  // Agent configuration
  "sisyphus_agent": {
    "disabled": false,
    "planner_enabled": true,
  },

  /* Category customization */
  "categories": {
    "visual-audit": {
      "model": "bailian-coding-plan/kimi-k2.5",
    },
  },
}
```

---

## Troubleshooting

### "OpenCode version too old" Error

```bash
# Update OpenCode
npm install -g opencode@latest
# or
bun install -g opencode@latest
```

### "Plugin not registered" Error

```bash
# Reinstall plugin
bunx oh-my-opencode install
```

### Doctor Check Failures

```bash
# Diagnose with detailed information
bunx oh-my-opencode doctor --verbose

# Show compact system dashboard
bunx oh-my-opencode doctor --status

# JSON output for scripting
bunx oh-my-opencode doctor --json
```

---

## refresh-model-capabilities

Refreshes the cached model capabilities snapshot from models.dev. This updates the local cache used by capability resolution and compatibility diagnostics.

### Usage

```bash
bunx oh-my-opencode refresh-model-capabilities
```

### Options

| Option | Description |
|--------|-------------|
| `-d, --directory` | Working directory to read config from |
| `--source-url <url>` | Override the models.dev source URL |
| `--json` | Output refresh summary as JSON |

### Configuration

Configure automatic refresh behavior in your plugin config:

```jsonc
{
  "model_capabilities": {
    "enabled": true,
    "auto_refresh_on_start": true,
    "refresh_timeout_ms": 5000,
    "source_url": "https://models.dev/api.json"
  }
}
```

---

## Non-Interactive Mode

Use JSON output for CI or scripted diagnostics.

```bash
# Run doctor in CI environment
bunx oh-my-opencode doctor --json

# Save results to file
bunx oh-my-opencode doctor --json > doctor-report.json
```

---

## Developer Information

### CLI Structure

```
src/cli/
├── cli-program.ts        # Commander.js-based main entry
├── install.ts            # @clack/prompts-based TUI installer
├── config-manager/       # JSONC parsing, multi-source config management
│   └── *.ts
├── doctor/               # Health check system
│   ├── index.ts          # Doctor command entry
│   └── checks/           # Individual check modules
├── run/                  # Session runner
│   └── *.ts
└── mcp-oauth/            # OAuth management commands
    └── *.ts
```

### Adding New Doctor Checks

Create `src/cli/doctor/checks/my-check.ts`:

```typescript
import type { DoctorCheck } from "../types";

export const myCheck: DoctorCheck = {
  name: "my-check",
  category: "environment",
  check: async () => {
    const isOk = await someValidation();

    return {
      status: isOk ? "pass" : "fail",
      message: isOk ? "Everything looks good" : "Something is wrong",
    };
  },
};
```

Register in `src/cli/doctor/checks/index.ts`:

```typescript
export { myCheck } from "./my-check";
```
