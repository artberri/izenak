---
description: Create a plan for the specified task.
---

# 📜 How to create a plan

1. Ask the user for the task to create a plan for.
   It is important to ask for the public contracts to be considered. If the user does not provide the public contracts, suggest them based on the task description. Do the same with the implementation phases.
   We understand as public contracts the following things:
   - Pages and components to add, modify or remove, and the properties of each one of them.
   - Test suites to add, modify or remove, and all the test cases inside each one of them.
   - State changes to add, modify or remove, and the tables inside each one of them.
   - Text copies shown to end users in the UI to add, modify or remove.
2. Propose the plan to the user for approval. IMPORTANT: Do not start creating the plan until the user has agreed on the specific contracts to be considered and the implementation phases.
3. Save the plan in a new file inside the `.ai/plans` directory with the current date and a semantic name based on the task description. Example: `2026_01_16-create_embeddable_changelog_widget.md`.

# 🗂️ Plan sections

The plan should contain the following sections:

- Goal
- Context
- Phases (IMPORTANT: each phase should be a vertical slice of the task)
  - Description (brief description of the phase)
  - To-do actions list (checkboxes list of actions to complete the phase)
- Next step

# 💡 Considerations for each plan section

## 🎯 Goal section

- Write it short and concise. It should be 1-3 sentences that summarize the goal of the task.

## 👀 Context section

- List the important files, folders, and code to consider.
- Link the files and folders to the actual code in the repository to make it easier for the user to review the context.
- Read the AGENTS.md file and the relevant documentation referenced in that file to understand the architecture and the coding conventions to follow while proposing the plan.

## 🪜 Phases section

- Each one of the phases should be a vertical slice of the task. Avoid creating the endpoint controller in one phase and the service class it invokes in another one different phase.
- Each phase must contain its description and the to-do actions list.
- Split the task into as many phases as needed to make them easier to review and merge. Do not mix multiple responsibilities in the same phase. For instance, avoid adding the required npm dependencies in the same phase as the first use case implementation.
- We must be able to commit and push the code for each phase without breaking the build. The tests must pass and the added code makes sense as its own isolated unit.

## ⏭️ Next step section

- Write it short and concise. It should be a single sentence that summarizes the next step to be taken to complete the task. That is, which phase should be completed next.
