# Red-Teaming at Scale: Systematically Discovering LLM Failure Modes

**URL:** [https://sigir2025.dei.unipd.it/detailed-program/paper?paper=fc49306d97602c8ed1be1dfbf0835ead](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=fc49306d97602c8ed1be1dfbf0835ead)

## The "Car Crash Test" Paper

### The Feynman Explanation:

When we test a car, we don't just see if it can drive down a sunny, empty road. We want to know what happens if it hits a wall at 50 mph, or if it skids on ice. We intentionally try to break it to find its weak spots. This is crash testing.

"Red-teaming" is the crash test for LLMs. Instead of asking it a normal question, you try to trick it. You might ask it to give you harmful advice, talk nonsense, or contradict itself.

**This paper's idea is to create a systematic, organized way to crash-test LLMs.** Instead of random people poking at it, they develop categories of "crashes" (like bias, misinformation, security flaws) and create thousands of tests to see how and when the model fails.

**The Punchline:** This evaluates consistency from a safety perspective. A good model isn't just right sometimes; it's **consistently safe and reliable**, even when someone tries to misuse it.

## Problem Addressed & Summary

Applies systematic "red-teaming"—crash testing—to reveal LLM weaknesses in safety and reliability. Develops large, organized banks of adversarial prompts targeting bias, misinformation, and harmful outputs. Measures model consistency from a safety angle, spotlighting issues that only appear under stress or attempted misuse.