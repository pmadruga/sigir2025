# Assessing the Viability and Bias of LLM-based Evaluators

**URL:** [https://sigir2025.dei.unipd.it/detailed-program/paper?paper=01d8bae291b1e4724443375634ccfa0e](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=01d8bae291b1e4724443375634ccfa0e)

## The "Let a Smart Robot Grade the Other Robots" Paper

### The Feynman Explanation:

Hiring human judges (from Paper 2) is slow and very expensive. What if we could use a very powerful, smart LLM (like GPT-4) to be the judge for other, smaller LLMs? It would be like asking the world's best professor to grade all the student homework. It would be fast and cheap!

But there's a catch. Is the professor-LLM fair? Does it have hidden biases? For example, maybe it gives a higher score to answers that "sound like itself."

**This paper's idea is to test the judge.** It carefully compares the scores from the "judge LLM" to the scores from a team of calibrated human experts (from Paper 2). It checks if the LLM judge is consistent, if it agrees with the humans, and if it has any weird preferences or biases.

**The Punchline:** If we can prove that an LLM judge is **consistent and fair**, we can automate evaluation on a massive scale, making it possible to test models much more thoroughly and quickly.

## Problem Addressed & Summary

Explores using powerful LLMs as automated judges to grade other models' answers, speeding up evaluation. Compares LLM-judge scores to calibrated human experts to check consistency and detect biases (e.g., favoritism). If proven reliable, enables rapid, massive-scale LLM benchmarking with confidence in fairness.