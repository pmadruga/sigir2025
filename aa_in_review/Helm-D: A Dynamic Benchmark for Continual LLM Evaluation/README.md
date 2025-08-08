# HELM-D: A Dynamic Benchmark for Continual LLM Evaluation

**URL:** [https://sigir2025.dei.unipd.it/detailed-program/paper?paper=6855456e2fe46a9d49d3d3af4f57443d](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=6855456e2fe46a9d49d3d3af4f57443d)

## The "Stop Teaching to the Test" Paper

### The Feynman Explanation:

Imagine you gave your students the _exact same final exam_ every single year. After a few years, students wouldn't bother learning the subject; they'd just find old copies of the exam and memorize the answers. The test would become useless for telling you who actually understands the material.

This is what's happening with LLMs. Many of our tests (called "benchmarks") are static and available online. Models are being trained on the answers, so they get a high score without actually being "smarter."

**This paper's idea is to create a test that is constantly changing.** It's like having a teacher who writes brand new pop quizzes every single week. You can't just memorize old answers; you have to genuinely learn the concepts.

**The Punchline:** This makes evaluation more consistent over time because it measures a model's _actual ability to generalize_, not its ability to cheat on a test it has already seen.

## Problem Addressed & Summary

Tackles "teaching to the test" in LLM evaluation—where models are overfitting to static, public benchmarks. Introduces a continually updated, dynamic benchmark that prevents memorization and encourages true generalization. Ensures model scores stay meaningful and trustworthy as benchmarks evolve and models improve over time.