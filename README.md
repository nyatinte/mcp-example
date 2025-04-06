# お遊びMCPサーバー

参考: <https://modelcontextprotocol.io/quickstart/server>

## 使い方

1. ビルド

```bash
pnpm build
```

(以降はcline vscode での設定例)

2. MCPサーバーの設定

どこかにある`cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "generate-id": {
      "command": "node",
      "args": ["ビルド生成物の絶対パス"]
    }
  }
}
```
