# Proactive Behaviors

These behaviors are required — not optional suggestions. Check each one actively.

## Model Switching

Before starting any task, evaluate complexity:

- **Opus**: Design system architecture, token pipeline changes, new atom/molecule/organism APIs, Figma-to-code workflows, Storybook infrastructure
- **Sonnet**: Adding stories, fixing component props, style tweaks, docs updates
- **Flag immediately** at task start: "Model note: This task warrants Opus — type `/model claude-opus-4-6` then `/clear`."
- After Opus work completes: "Model note: Back to Sonnet — type `/model claude-sonnet-4-6` then `/clear`."

## Agent Teams

Suggest agent teams when you see 2+ independent subtasks:

- Multiple atoms/molecules being created in parallel
- Figma extraction + component implementation simultaneously
- Token generation + component updates
- Say: "This is a good candidate for agent teams — I can run [X] and [Y] in parallel."

## Convention Updates

After completing work that establishes or validates a pattern:

- New atomic design pattern → update `~/Documents/aramiworks/conventions/architecture/frontend.md`
- New token naming or structure → update `~/Documents/aramiworks/conventions/naming.md`
- New Figma-to-code workflow → update conventions or create new doc
- Say: "New pattern emerged — I'll update conventions." Then create a Linear issue + PR.
