import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import cuid from 'cuid'
import { nanoid } from 'nanoid'
import { match } from 'ts-pattern'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const server = new McpServer({
  name: 'mcp-example',
  version: '1.0.0',
})

server.tool(
  'generate-id',
  '指定された形式のIDを生成します',
  {
    'id-type': z
      .enum(['uuid', 'cuid', 'nanoid'])
      .describe('uuid | cuid | nanoid'),
  },
  ({ 'id-type': idType }) => {
    const id = match(idType)
      .with('uuid', () => uuidv4())
      .with('cuid', () => cuid())
      .with('nanoid', () => nanoid())
      .exhaustive()
    return {
      content: [
        {
          type: 'text',
          text: id,
        },
      ],
    }
  },
)

const main = async () => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Example MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
