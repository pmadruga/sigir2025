## EMPOWERING LARGE LANGUAGE MODEL AGENT THROUGH STEP-LEVEL SELF-CRITIQUE AND SELF-TRAINING
https://dl.acm.org/doi/10.1145/3726302.3729965

### 1. **Big Picture: What Problem Are We Trying to Solve?**

Large Language Models (LLMs)—like ChatGPT—are now being used as "agents" that can perform complex, multi-step tasks. For example, imagine a chatbot that not only answers questions but fetches information from the web, thinks through multiple steps, and makes decisions along the way.

But here's the catch: these agents often struggle with complicated tasks where a single mistake in any step could derail the entire process. It's like following a recipe—one wrong ingredient can ruin the dish. Our goal is to help LLM agents get better at _catching their own mistakes step by step_, rather than only realizing a problem at the end.

### 2. **How Is This Normally Done and What's Missing?**

Usually, researchers help LLMs improve with two main approaches:

- **Trajectory-level feedback:** After the bot finishes a full task, it reviews what went wrong and tries to fix it next time. But this often doesn't tell you _where_ the mistake happened.
- **Step-level action selection:** At each step, the bot picks from several possible next actions (using randomness, aka "sampling" for diversity). But this can be a trade-off: more diversity sometimes means lower quality, and vice versa. Also, these methods don't focus much on the bot's ability to _critique and correct itself_ at each step.

We realized that what's missing is **step-level self-critique**: Can a bot not only generate an action at each step, but also look at its own action, critique it in plain language, and then refine or fix it immediately if needed?

This is a challenging problem because:

- Step-level self-critiquing is hard (even for humans!), and LLMs aren't naturally good at it.
- It's not always clear how to tell if a critique is actually helpful, especially since feedback is sparse (the environment mostly rewards only for the final outcome, not each step).

### 3. **Our Solution: Step-Level Self-Critique Monte Carlo Tree Search (SLSC-MCTS)**

#### What is Monte Carlo Tree Search (MCTS)?

Think of MCTS like a decision tree: at each step, you can take different actions, and each action leads to new states. By simulating ("rolling out") many possible sequences of actions, you can estimate which paths are best—like a chess player imagining different move sequences.

#### How Do We Use MCTS with LLMs?

- We use MCTS to explore possible decision paths the LLM agent can take in solving a task.
- But we add a twist: **at every step of this search, the agent generates a self-critique of its action in natural language.**
    - The critique includes both a verdict ("good" or "bad") and explanations.
    - Then, the agent uses that critique to refine its action—repeating this process to expand the diversity and quality of possible actions at each decision point.

By combining MCTS with self-critiques, we can build a decision tree where, at every step, some branches represent "original actions" and others are "refined after critique."

### 4. **How Does the Whole Pipeline Work?**

#### a) Data Collection

We run many MCTS episodes, and record three kinds of data:

- **Reasoning data:** Sequences of thoughts and actions.
- **Refining data:** Actions corrected as a result of self-critique.
- **Self-critiquing data:** The critiques themselves, which help train the bot to become a better critic.

Importantly, we only keep the high-quality decision paths (those with a high outcome reward) to ensure we're training on good examples.

#### b) Self-Training

- We use the collected data to fine-tune the LLM agent in two ways:
    - **Train reasoning and refinement:** The agent learns not only to produce reasoning chains but to improve them via critique.
    - **Train critiquing ability:** The agent learns to spot errors and articulate useful feedback at each step.

This iterative process—expand the tree, collect critiques, refine actions, and train—improves both how the agent thinks and how it self-corrects.

### 5. **How Is This Different from Existing Methods?**

- Previous approaches might have used critiques only at the end (trajectory-level) or generated action candidates via sampling.
- Ours is the **first method to apply step-level self-critique inside a structured search (MCTS) for LLM agents**, creating a feedback loop where the agent not only tries different actions but also learns how to judge and improve them, all at each decision point.

This leads to:

- Better diversity in explored actions (_thanks to critique-based branching, not just random sampling_).
- Maintained or improved action quality (_because each action is refined with specific feedback_).

### 6. **Results and Impact**

Our experiments show that agents trained with SLSC-MCTS:

- Solve complex tasks more reliably.
- Generate better and more diverse solutions.
- Are better at critiquing and correcting themselves—an essential skill for trustworthy, autonomous behavior.

### 7. **To Summarize Like Feynman Would…**

Imagine teaching a child to solve puzzles:

- Instead of letting them guess a few times and say "try better next time," we watch them _at every move_.
- We ask, "Why did you do that? What went wrong? How would you fix it?"
- They learn both to solve puzzles and to spot—and correct—their own mistakes as they go.

Our paper shows how to make LLM-based agents do exactly that via step-level self-critique combined with a strategic search, making them smarter, more reliable, and better at learning from their own experience