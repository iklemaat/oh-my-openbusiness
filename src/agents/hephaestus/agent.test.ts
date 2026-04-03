import { describe, expect, test } from "bun:test";
import {
  getHephaestusPromptSource,
  getHephaestusPrompt,
  createHephaestusAgent,
} from "./index";

describe("getHephaestusPromptSource", () => {
  test("returns 'gpt-5-4' for gpt-5.4 models", () => {
    const model1 = "openai/gpt-5.4";
    const model2 = "openai/gpt-5.4-codex";
    const model3 = "github-copilot/gpt-5.4";

    const source1 = getHephaestusPromptSource(model1);
    const source2 = getHephaestusPromptSource(model2);
    const source3 = getHephaestusPromptSource(model3);

    expect(source1).toBe("gpt-5-4");
    expect(source2).toBe("gpt-5-4");
    expect(source3).toBe("gpt-5-4");
  });

  test("returns 'gpt-5-3-codex' for GPT 5.3 Codex models", () => {
    const model1 = "openai/gpt-5.3-codex";
    const model2 = "github-copilot/gpt-5.3-codex";

    const source1 = getHephaestusPromptSource(model1);
    const source2 = getHephaestusPromptSource(model2);

    expect(source1).toBe("gpt-5-3-codex");
    expect(source2).toBe("gpt-5-3-codex");
  });

  test("returns 'gpt' for generic GPT models", () => {
    const model1 = "openai/gpt-4o";
    const model2 = "github-copilot/gpt-4o";
    const model3 = "openai/gpt-4o";

    const source1 = getHephaestusPromptSource(model1);
    const source2 = getHephaestusPromptSource(model2);
    const source3 = getHephaestusPromptSource(model3);

    expect(source1).toBe("gpt");
    expect(source2).toBe("gpt");
    expect(source3).toBe("gpt");
  });

  test("returns 'gpt' for non-GPT models and undefined", () => {
    const model1 = "anthropic/claude-opus-4-6";
    const model2 = undefined;

    const source1 = getHephaestusPromptSource(model1);
    const source2 = getHephaestusPromptSource(model2);

    expect(source1).toBe("gpt");
    expect(source2).toBe("gpt");
  });
});

describe("getHephaestusPrompt", () => {
  test("GPT 5.4 model returns GPT-5.4 optimized prompt", () => {
    const model = "openai/gpt-5.4";
    const prompt = getHephaestusPrompt(model);

    expect(prompt).toContain("You build context by examining");
    expect(prompt).toContain("autonomous deep researcher for UX research");
    expect(prompt).toContain("<tool_usage_rules>");
  });

  test("GPT 5.4-codex model returns GPT-5.4 optimized prompt", () => {
    const model = "openai/gpt-5.4-codex";
    const prompt = getHephaestusPrompt(model);

    expect(prompt).toContain("You build context by examining");
    expect(prompt).toContain("autonomous deep researcher for UX research");
    expect(prompt).toContain("<tool_usage_rules>");
  });

  test("GPT 5.3-codex model returns GPT-5.3 prompt", () => {
    const model = "openai/gpt-5.3-codex";
    const prompt = getHephaestusPrompt(model);

    expect(prompt).toContain("You are Hephaestus");
    expect(prompt).toContain("Hard Constraints");
    expect(prompt).toContain("<tool_usage_rules>");
  });

  test("generic GPT model returns generic GPT prompt", () => {
    const model = "openai/gpt-4o";
    const prompt = getHephaestusPrompt(model);

    expect(prompt).toContain("KEEP GOING");
    expect(prompt).toContain("autonomous deep researcher");
    expect(prompt).not.toContain("intent_extraction");
  });

  test("Claude model returns generic GPT prompt (Hephaestus default)", () => {
    const model = "anthropic/claude-opus-4-6";
    const prompt = getHephaestusPrompt(model);

    expect(prompt).toContain("autonomous deep researcher");
    expect(prompt).toContain("Hephaestus");
  });

  test("useTaskSystem=true includes Task Discipline for GPT models", () => {
    const model = "openai/gpt-5.4";
    const prompt = getHephaestusPrompt(model, true);

    expect(prompt).toContain("Task Discipline");
    expect(prompt).toContain("task_create");
    expect(prompt).toContain("task_update");
  });

  test("useTaskSystem=false includes Todo Discipline for Claude models", () => {
    const model = "anthropic/claude-opus-4-6";
    const prompt = getHephaestusPrompt(model, false);

    expect(prompt).toContain("Todo Discipline");
    expect(prompt).toContain("todowrite");
  });
});

describe("createHephaestusAgent", () => {
  test("returns AgentConfig with required fields", () => {
    const model = "openai/gpt-5.4";
    const config = createHephaestusAgent(model);

    expect(config).toHaveProperty("description");
    expect(config).toHaveProperty("mode", "primary");
    expect(config).toHaveProperty("model", "openai/gpt-5.4");
    expect(config).toHaveProperty("maxTokens", 32000);
    expect(config).toHaveProperty("prompt");
    expect(config).toHaveProperty("color", "#D97706");
    expect(config).toHaveProperty("permission");
    expect(config.permission).toHaveProperty("question", "allow");
    expect(config.permission).toHaveProperty("call_omo_agent", "allow");
    expect(config).toHaveProperty("reasoningEffort", "medium");
  });

  test("GPT 5.4 model includes GPT-5.4 specific prompt content", () => {
    const model = "openai/gpt-5.4";
    const config = createHephaestusAgent(model);

    expect(config.prompt).toContain("You build context by examining");
    expect(config.prompt).toContain("autonomous deep researcher for UX research");
    expect(config.prompt).toContain("<tool_usage_rules>");
  });

  test("GPT 5.3-codex model includes GPT-5.3 specific prompt content", () => {
    const model = "openai/gpt-5.3-codex";
    const config = createHephaestusAgent(model);

    expect(config.prompt).toContain("You are Hephaestus");
    expect(config.prompt).toContain("Hard Constraints");
    expect(config.prompt).toContain("<tool_usage_rules>");
  });

  test("includes Hephaestus identity in prompt", () => {
    const model = "openai/gpt-5.4";
    const config = createHephaestusAgent(model);

    expect(config.prompt).toContain("Hephaestus");
    expect(config.prompt).toContain("autonomous deep researcher");
  });

  test("useTaskSystem=true produces Task Discipline prompt", () => {
    const model = "openai/gpt-5.4";
    const config = createHephaestusAgent(model, [], [], [], [], true);

    expect(config.prompt).toContain("task_create");
    expect(config.prompt).toContain("task_update");
    expect(config.prompt).not.toContain("todowrite");
  });

  test("useTaskSystem=false produces Todo Discipline prompt", () => {
    const model = "openai/gpt-5.4";
    const config = createHephaestusAgent(model, [], [], [], [], false);

    expect(config.prompt).toContain("todowrite");
    expect(config.prompt).not.toContain("task_create");
  });
});
