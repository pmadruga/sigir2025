## INSTRUCTRAG: LEVERAGING RETRIEVAL-AUGMENTED GENERATION ON INSTRUCTION GRAPHS FOR LLM-BASED TASK PLANNING
https://dl.acm.org/doi/10.1145/3726302.3730009

### What Problem Are We Solving?

Large Language Models (LLMs), like GPT-4, can carry out tasks by planning and following steps, but often struggle with complex, multi-step problems because they don't always remember or know all the necessary details. Some recent approaches try to help by letting LLMs look up information in external databases (a method called Retrieval-Augmented Generation, or RAG). However, just adding RAG is often not enough: LLMs' planning abilities can still be limited, and it can be hard to adapt these solutions to new kinds of tasks.

**Our goal:** We want LLMs to be much better at planning and problem-solving, using both task instructions (the ways problems were solved before) and external information, and to be able to rapidly learn new tasks.

### What Is Our Main Idea?

Imagine every solved question is like a path made of instructions (like "Search for X" ➔ "Look up Y"). If we store these solved instruction paths in a structured way—specifically, in a graph where each node clusters similar instructions—it becomes much easier to reuse, combine, and adapt these plans to new questions.

We call our approach **InstructRAG**. It works by:

1. **Building an Instruction Graph:** This is a directed graph where each node is a set of similar instructions, and edges record which tasks or questions are linked across instructions. Think of it as a roadmap of how problems were solved in the past.
    
2. **Growing and Adapting the Graph:** As new questions and tasks arrive, we insert new instruction paths into the graph, merging steps that are similar to those already saved, and creating new branches when necessary. This helps expand the graph's coverage (what we call "enlargeability"), so it can handle more kinds of questions.
    
3. **Retrieving and Combining Instructions:** When faced with a new question, we train a special agent (an RL-Agent) to explore this graph and find promising paths—that is, sequences of instructions likely to work for this new problem, including combinations never seen before.
    
4. **Choosing the Best Plan:** A second agent (an ML-Agent) scores these candidate paths, selecting the most relevant one for the question. This choice is used to form a structured prompt for the LLM, guiding it through the solution step by step.
    
5. **Rapidly Learning New Tasks:** Even if a new question falls outside the types of tasks the graph has seen before, the LLM can quickly adapt by conditioning on new, task-specific paths (this is "transferability"). The model can be "few-shot" trained: given just a handful of new examples, it updates itself to address novel problems rapidly.
    

### How Do We Build and Use the Instruction Graph?

1. **Start from Examples:** We take a dataset containing solved questions (support set), each annotated with the sequence of steps (instructions) that solved it.
    
2. **Construct Instruction Paths:** For each question, we generate its instruction path, like ["Search for Scott Derrickson", "Lookup nationality"].
    
3. **Insert with Similarity:** When inserting instructions into our graph, we check if each instruction is similar (like, also a "Search" or "Lookup" action about a related topic) to one already present. If it is, we merge it; if not, we create a new node. We use a threshold to decide what's "similar enough".
    
4. **Build Edges for Tasks:** Edges track which tasks are solved by stepping from one instruction to the next.
    

This approach allows us to blend old and new steps, enabling the system to create novel paths for new questions by combining previously learned instructions in new ways. For example, knowing how to search for "Scott Derrickson" and "Ed Wood" and how to look up their nationality allows us to answer questions about someone else's nationality with similar steps.

### What's Special About Our Approach?

- **Enlargeability:** By combining instructions flexibly, our graph can create new solutions for questions within the domains it has encountered, even if it hasn't seen the precise question before.
    
- **Transferability:** Our framework adapts quickly to brand new types of tasks by incorporating new instructions and re-training with just a few examples, without re-building everything from scratch.
    
- **Agent Collaboration:** We use a two-agent setup: the RL-Agent explores the graph to find plausible instruction sequences, while the ML-Agent uses advanced learning objectives (like contrastive loss) to pick the best match for the current question.
    
- **Structured Guidance to LLMs:** The winning instruction path is packaged into a structured prompt (including task description, instruction definitions, step-by-step plan, and demonstrations) to clearly guide the LLM to a correct, explainable answer.
    

### Summary

Put simply, **InstructRAG** turns the recipe-like ways LLMs solve tasks into a map of instructions, which it then grows, explores, and adapts as new challenges arise. By turning successful problem-solving experiences into a flexible graph, our approach gives LLMs much better tools to plan, adapt, and explain complex solutions, making them more effective and much faster at learning new skills—even with just a few new examples