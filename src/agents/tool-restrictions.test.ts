import { describe, test, expect } from "bun:test"
import { createOracleAgent } from "./oracle"
import { createLibrarianAgent } from "./librarian"
import { createExploreAgent } from "./explore"
import { createMomusAgent } from "./momus"
import { createMetisAgent } from "./metis"
import { createAtlasAgent } from "./atlas"

const TEST_MODEL = "anthropic/claude-sonnet-4-5"

describe("agent tool restrictions", () => {
  describe("Oracle", () => {
    test("denies all file-writing tools", () => {
      const agent = createOracleAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["write"]).toBe("deny")
      expect(permission["edit"]).toBe("deny")
      expect(permission["apply_patch"]).toBe("deny")
    })

    test("denies task but allows call_omo_agent for research", () => {
      const agent = createOracleAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["task"]).toBe("deny")
      expect(permission["call_omo_agent"]).toBeUndefined()
    })
  })

  describe("Librarian", () => {
    test("allows write for saving research findings but denies edit/apply_patch", () => {
      const agent = createLibrarianAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["write"]).toBeUndefined()
      expect(permission["edit"]).toBe("deny")
      expect(permission["apply_patch"]).toBe("deny")
    })

    test("denies task and call_omo_agent", () => {
      const agent = createLibrarianAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["task"]).toBe("deny")
      expect(permission["call_omo_agent"]).toBe("deny")
    })
  })

  describe("Explore", () => {
    test("allows write for saving findings but denies edit/apply_patch", () => {
      const agent = createExploreAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["write"]).toBeUndefined()
      expect(permission["edit"]).toBe("deny")
      expect(permission["apply_patch"]).toBe("deny")
    })

    test("denies task and call_omo_agent", () => {
      const agent = createExploreAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["task"]).toBe("deny")
      expect(permission["call_omo_agent"]).toBe("deny")
    })
  })

  describe("Momus", () => {
    test("denies all file-writing tools", () => {
      const agent = createMomusAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["write"]).toBe("deny")
      expect(permission["edit"]).toBe("deny")
      expect(permission["apply_patch"]).toBe("deny")
    })
  })

  describe("Metis", () => {
    test("denies all file-writing tools", () => {
      const agent = createMetisAgent(TEST_MODEL)
      const permission = agent.permission as Record<string, string>
      expect(permission["write"]).toBe("deny")
      expect(permission["edit"]).toBe("deny")
      expect(permission["apply_patch"]).toBe("deny")
    })
  })

  describe("Atlas", () => {
    test("allows delegation tools for orchestration", () => {
      const agent = createAtlasAgent({ model: TEST_MODEL })
      const permission = (agent.permission ?? {}) as Record<string, string>
      expect(permission["task"]).toBeUndefined()
      expect(permission["call_omo_agent"]).toBeUndefined()
    })
  })
})
