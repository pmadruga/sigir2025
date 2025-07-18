
## Overview

| Paper & Link | Problem Addressed & Summary |
|---|---|
| **HELM-D: A Dynamic Benchmark for Continual LLM Evaluation**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=6855456e2fe46a9d49d3d3af4f57443d) | Tackles “teaching to the test” in LLM evaluation—where models are overfitting to static, public benchmarks.<br>Introduces a continually updated, dynamic benchmark that prevents memorization and encourages true generalization.<br>Ensures model scores stay meaningful and trustworthy as benchmarks evolve and models improve over time. |
| **A Framework for Calibrating Human Raters on Subjective LLM Tasks**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=61b4a64be663682e8cb037d9719ad8cd) | Focuses on reducing inconsistency and subjectivity in human evaluation of LLM outputs.<br>Defines rigorous rubrics and calibration processes so “good” means the same to every judge.<br>Delivers fairer, more reliable human scores—critical for evaluating nuanced concepts like creativity or helpfulness. |
| **Red-Teaming at Scale: Systematically Discovering LLM Failure Modes**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=fc49306d97602c8ed1be1dfbf0835ead) | Applies systematic “red-teaming”—crash testing—to reveal LLM weaknesses in safety and reliability.<br>Develops large, organized banks of adversarial prompts targeting bias, misinformation, and harmful outputs.<br>Measures model consistency from a safety angle, spotlighting issues that only appear under stress or attempted misuse. |
| **Evaluating Reasoning Pathways, Not Just Final Answers**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=5680522b8e2bb01943234bce7bf84534) | Argues for grading a model’s reasoning process (“chain of thought”), not just its final answer.<br>Evaluates if the logical steps make sense, distinguishing genuine reasoning from lucky guesses or memorization.<br>Yields a truer, more consistent measure of LLM intelligence and reasoning ability. |
| **Assessing the Viability and Bias of LLM-based Evaluators**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=01d8bae291b1e4724443375634ccfa0e) | Explores using powerful LLMs as automated judges to grade other models’ answers, speeding up evaluation.<br>Compares LLM-judge scores to calibrated human experts to check consistency and detect biases (e.g., favoritism).<br>If proven reliable, enables rapid, massive-scale LLM benchmarking with confidence in fairness. |
| **WildChat: A Benchmark of Unfiltered, Real-World User Interactions**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=49182f81e6a13cf5eaa496d51fea6406) | Bridges the gap between clean, artificial benchmarks and messy real-world usage.<br>Introduces a dataset of authentic, unfiltered human-chatbot conversations, capturing typos, changes of intent, and ambiguity.<br>Provides a robust test of practical usefulness and user satisfaction outside controlled lab settings. |
## The Core Problem You're Trying to Solve

Imagine you have five different students, and you want to find out who is "the smartest."

- You could give them all a single, multiple-choice history test. The student who memorized the textbook best will win. But does that make them the smartest?
- You could ask them to write an essay. But how do you grade them fairly? Your mood or personal preference might affect the scores.
- You could ask them to solve a trick math problem. But what if one of them has seen that exact trick before?

This is the exact problem researchers face with LLMs. We need ways to test them that are **fair, consistent, and actually measure what we care about** (like reasoning, not just memorization). The following "papers" each tackle a piece of this puzzle.

---

## Paper 1: The "Stop Teaching to the Test" Paper

**Title like:** _HELM-D: A Dynamic Benchmark for Continual LLM Evaluation_
**[https://sigir2025.dei.unipd.it/detailed-program/paper?paper=6855456e2fe46a9d49d3d3af4f57443d](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=6855456e2fe46a9d49d3d3af4f57443d)**  

#### The Feynman Explanation:

Imagine you gave your students the _exact same final exam_ every single year. After a few years, students wouldn't bother learning the subject; they'd just find old copies of the exam and memorize the answers. The test would become useless for telling you who actually understands the material.

This is what's happening with LLMs. Many of our tests (called "benchmarks") are static and available online. Models are being trained on the answers, so they get a high score without actually being "smarter."

**This paper’s idea is to create a test that is constantly changing.** It's like having a teacher who writes brand new pop quizzes every single week. You can't just memorize old answers; you have to genuinely learn the concepts.

**The Punchline:** This makes evaluation more consistent over time because it measures a model's _actual ability to generalize_, not its ability to cheat on a test it has already seen.

---

## Paper 2: The "Making Human Judges Fair" Paper

**Title like:** _A Framework for Calibrating Human Raters on Subjective LLM Tasks_
**[https://sigir2025.dei.unipd.it/detailed-program/paper?paper=61b4a64be663682e8cb037d9719ad8cd](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=61b4a64be663682e8cb037d9719ad8cd)**  

#### The Feynman Explanation:

Let's say you're judging an essay contest. You have three judges.

- Judge 1 is a tough grader. The best essay gets a B.
- Judge 2 is an easy grader. Every decent essay gets an A.
- Judge 3 loves creative writing but hates formal arguments.

Their scores will be all over the place! You can't reliably say which essay is best. To fix this, you'd give them a **rubric**—a detailed set of rules for how to score things like "clarity," "creativity," and "correctness." You'd have them all grade the same three practice essays first and discuss their scores until they all agree. This is called **calibration**.

**This paper’s idea is to create a strict rulebook and training process for humans who evaluate LLMs.** It makes sure that when a human rates an LLM's response as "good," it means the same thing, no matter who the human is.

**The Punchline:** This makes human feedback, which is crucial for judging things like creativity and helpfulness, far more **consistent and reliable**. You can actually trust the scores.

---

## Paper 3: The "Car Crash Test" Paper

**Title like:** _Red-Teaming at Scale: Systematically Discovering LLM Failure Modes_
**[https://sigir2025.dei.unipd.it/detailed-program/paper?paper=fc49306d97602c8ed1be1dfbf0835ead](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=fc49306d97602c8ed1be1dfbf0835ead)**  

#### The Feynman Explanation:

When we test a car, we don't just see if it can drive down a sunny, empty road. We want to know what happens if it hits a wall at 50 mph, or if it skids on ice. We intentionally try to break it to find its weak spots. This is crash testing.

"Red-teaming" is the crash test for LLMs. Instead of asking it a normal question, you try to trick it. You might ask it to give you harmful advice, talk nonsense, or contradict itself.

**This paper’s idea is to create a systematic, organized way to crash-test LLMs.** Instead of random people poking at it, they develop categories of "crashes" (like bias, misinformation, security flaws) and create thousands of tests to see how and when the model fails.

**The Punchline:** This evaluates consistency from a safety perspective. A good model isn't just right sometimes; it's **consistently safe and reliable**, even when someone tries to misuse it.

---

## Paper 4: The "Show Your Work" Paper

**Title like:** _Evaluating Reasoning Pathways, Not Just Final Answers_
**[https://sigir2025.dei.unipd.it/detailed-program/paper?paper=5680522b8e2bb01943234bce7bf84534](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=5680522b8e2bb01943234bce7bf84534)**  

#### The Feynman Explanation:

Imagine a math problem: `(5 * 4) / 2 = ?`.

- Student A writes: `20 / 2 = 10`. The answer is 10. (Correct reasoning)
- Student B writes: `5 * 4 is 22, and 22 / 2 is 10`. The answer is 10. (Wrong reasoning, lucky guess)

Both got the right answer, but only Student A actually knows how to do the math. If you only grade the final answer, you can't tell them apart.

LLMs often do this. They give the right final answer through a flawed or nonsensical internal "thought process."

**This paper’s idea is to evaluate the LLM's "chain of thought."** We ask the model to explain its steps, to "show its work." We then grade the _process_, not just the final output. Was the logic sound? Did it follow the steps correctly?

**The Punchline:** This provides a much more consistent measure of a model's _true reasoning ability_, separating genuine intelligence from lucky parroting.

---

## Paper 5: The "Let a Smart Robot Grade the Other Robots" Paper

**Title like:** _Assessing the Viability and Bias of LLM-based Evaluators_
**[https://sigir2025.dei.unipd.it/detailed-program/paper?paper=01d8bae291b1e4724443375634ccfa0e](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=01d8bae291b1e4724443375634ccfa0e)**  

#### The Feynman Explanation:

Hiring human judges (from Paper 2) is slow and very expensive. What if we could use a very powerful, smart LLM (like GPT-4) to be the judge for other, smaller LLMs? It would be like asking the world's best professor to grade all the student homework. It would be fast and cheap!

But there's a catch. Is the professor-LLM fair? Does it have hidden biases? For example, maybe it gives a higher score to answers that "sound like itself."

**This paper’s idea is to test the judge.** It carefully compares the scores from the "judge LLM" to the scores from a team of calibrated human experts (from Paper 2). It checks if the LLM judge is consistent, if it agrees with the humans, and if it has any weird preferences or biases.

**The Punchline:** If we can prove that an LLM judge is **consistent and fair**, we can automate evaluation on a massive scale, making it possible to test models much more thoroughly and quickly.

---

## Paper 6: The "Testing in the Real World" Paper

**Title like:** _WildChat: A Benchmark of Unfiltered, Real-World User Interactions_
**[https://sigir2025.dei.unipd.it/detailed-program/paper?paper=49182f81e6a13cf5eaa496d51fea6406](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=49182f81e6a13cf5eaa496d51fea6406)**

#### The Feynman Explanation:

A student can get a perfect score on a textbook Spanish test but be totally unable to order a coffee in Madrid. The test in the classroom is clean and simple. The real world is messy, fast, and unpredictable.

Many LLM benchmarks are like classroom tests. They are clean, simple questions. But in the real world, people type with typos, change their minds mid-sentence, and ask weird, complex questions.

**This paper’s idea is to collect a massive dataset of how real people _actually_ talk to chatbots in the wild.** They take thousands of anonymous, messy, real-world conversations and use them as a new test. Can the LLM handle a user who says "uhhh nvm can u tell me about... not that, the other thing"?

**The Punchline:** This measures how a model performs in realistic situations, closing the gap between lab scores and real-world utility. It provides a more **consistent predictor of how helpful a model will actually be** for an average person.