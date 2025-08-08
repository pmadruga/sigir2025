# Evaluating Reasoning Pathways, Not Just Final Answers

**URL:** [https://sigir2025.dei.unipd.it/detailed-program/paper?paper=5680522b8e2bb01943234bce7bf84534](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=5680522b8e2bb01943234bce7bf84534)

## The "Show Your Work" Paper

### The Feynman Explanation:

Imagine a math problem: `(5 * 4) / 2 = ?`.

- Student A writes: `20 / 2 = 10`. The answer is 10. (Correct reasoning)
- Student B writes: `5 * 4 is 22, and 22 / 2 is 10`. The answer is 10. (Wrong reasoning, lucky guess)

Both got the right answer, but only Student A actually knows how to do the math. If you only grade the final answer, you can't tell them apart.

LLMs often do this. They give the right final answer through a flawed or nonsensical internal "thought process."

**This paper's idea is to evaluate the LLM's "chain of thought."** We ask the model to explain its steps, to "show its work." We then grade the _process_, not just the final output. Was the logic sound? Did it follow the steps correctly?

**The Punchline:** This provides a much more consistent measure of a model's _true reasoning ability_, separating genuine intelligence from lucky parroting.

## Problem Addressed & Summary

Argues for grading a model's reasoning process ("chain of thought"), not just its final answer. Evaluates if the logical steps make sense, distinguishing genuine reasoning from lucky guesses or memorization. Yields a truer, more consistent measure of LLM intelligence and reasoning ability.