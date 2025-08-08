# AGENTIR: 2ND WORKSHOP ON AGENT-BASED INFORMATION RETRIEVAL

**Workshop URL:** https://dl.acm.org/doi/10.1145/3726302.3730365

## Keynote Speech: Context Scaling for Agentic Retrieval
**Speaker:** Michael Bendersky (Google, DeepMind, Databricks)
**Profile:** https://scholar.google.com/citations?user=C9mxM5IAAAAJ&hl=en

### Part I - Educated Guesses on the Future of Agentic Retrieval

#### Key Concepts:
- **AgenticRAG ≠ RAG**: 
  - Traditional RAG: User communicates directly with retrieval system
  - Agentic RAG: User communicates with an agent, which then communicates with the retrieval system
- **Short-term scaling**: Agents can help scale retrieval capabilities
- **Offline indexing strategy**: Invest more resources offline to index significantly more information about documents beyond just vectors and tokens, including metadata of all sorts

### Part II - Inference Scaling for Long-Context Retrieval Augmented Generation

**Paper:** https://arxiv.org/abs/2410.04343

#### What Is This Paper About?
This paper investigates how to make Retrieval Augmented Generation (RAG) systems work more effectively when they have to handle very large amounts of information—think of answering complex questions by searching through millions of documents.

#### Why Does This Matter?
RAG systems use large language models (LLMs) plus a retrieval mechanism to fetch relevant documents from a big database (like Wikipedia) before generating answers. Intuitively, if you let the model "see" more documents, it should answer better. But in reality, just throwing in more documents doesn't always help and can sometimes hurt—the models get distracted or "confused" by too much irrelevant data.

#### Key Concepts Explained:

1. **RAG (Retrieval Augmented Generation):**  
   Imagine you want to answer tricky questions. Instead of relying on just your memory, you first grab relevant books or articles, read them, and then answer the question. That's what RAG does: fetch documents, then use an AI model to answer.
   
2. **Scaling Computation:**  
   Giving the model more space (context length) to "read" and more computational steps (iterations) to think. The central question is: Does doing more always make things better?
   
3. **DRAG (Demonstration-Based RAG):**  
   Here, before answering, we show the model several examples (demonstrations) of similar questions and answers, as well as the related documents. This is like showing a student lots of worked-out examples before a test.
   
4. **IterDRAG (Iterative Demonstration-Based RAG):**  
   Sometimes, questions are complicated and require multiple steps to answer. IterDRAG breaks down the problem into simpler parts ("sub-queries"), finds information for those, answers them one by one, and finally puts everything together.

#### Research Methodology:
- **Measured how RAG performance changes as we give it more computational power:**  
  We varied the number of documents, examples, and the number of iterative steps, and carefully measured the results.
  
- **Discovered the best way to allocate resources, as more isn't always better:**  
  For example, retrieving too many documents can hurt performance by adding noise, while the right balance of examples and iterative steps can almost linearly improve results up to a point.
  
- **Compared Traditional RAG, DRAG, and IterDRAG:**
  - Regular RAG quickly plateaus—it doesn't get better beyond a certain number of documents.
  - DRAG (with more examples and documents) keeps improving until it hits technical limits (context window size).
  - IterDRAG can go even further by solving complex, multi-hop questions step by step, especially as more computation is allowed.

#### Error Analysis:
Mistakes often come from:
1. Bad or outdated retrieved information
2. Incorrect reasoning steps
3. "Hallucinations" (the model making things up)
4. Evaluation problems (like not handling abbreviations well)

IterDRAG, which interleaves retrieval and generation, helps with many of these issues.

#### Key Finding: The Inference Scaling Law for RAG
We observed that, under optimal configurations, RAG performance improves almost linearly with the amount of computation—the more computation, the better, but only if resources are allocated smartly.

- **There's a point where adding more is wasteful** (diminishing returns if you just add more documents/steps without selective filtering)
- Our developed computation allocation model can predict what settings will give the best performance for a given computational budget

#### Main Takeaways:
1. Just throwing more data or compute at RAG isn't enough—how you allocate those resources matters a lot
2. DRAG and especially IterDRAG are better ways to scale up RAG for complex, multi-hop questions
3. Our modeling allows researchers and engineers to find optimal settings for their specific computational constraints, maximizing effectiveness

#### Future Implications:
As LLMs get bigger and try to answer ever more complex questions, optimizing inference (how they think and retrieve information) matters for both performance and efficiency. Our findings lay the groundwork for smarter, more scalable RAG systems.

**In essence:** If you want a RAG-based system to answer hard questions by reading lots of documents, don't just throw more at it—use strategies like DRAG and IterDRAG, and allocate resources carefully to get the best results for your computational investment!

### Part III - Agent Learning From Human Feedback

#### Core Concept:
- Add a general "Instruction"/"Feedback" to the agent and then it will always keep this in mind
- The agent will learn and adapt based on user feedback
- Part of Databricks implementation and works really well

#### Key Considerations:
- **Feedback localization** - How exactly should feedback affect similar requests?
- **Feedback generalisation** - Should the feedback generalize to all requests?
- **Feedback assignment** - Which parts of the pipeline (retrieval, generation, grounding, ...) should the feedback apply to?

#### Implementation Details:
- Initial idea: Add *{human_feedback}* in the Agent System Prompt
- Actual implementation: Summarize user feedback through the chat and add it as separate prompts
- Smaller models might be less adaptive to user feedback
- More context is not always better - picking the right scaling strategy is important

---

## Extra Speakers

### SLA Management in Reconfigurable Multi-Agent RAG: A Systems Approach to Question Answering

**Paper:** https://arxiv.org/abs/2412.06832

#### 1. What is this paper about?
This paper tackles the challenge of building smart question-answering (QA) systems that use Retrieval-Augmented Generation (RAG). The focus is on QA systems that use multiple agents (several smart helpers working together), specifically on making sure these systems can meet specific requirements like speed, quality, and reliability—these requirements are known as Service Level Agreements (SLAs).

#### 2. Why is this important?
In real-world situations, you don't just want an answer—you want it fast, accurate, and in a particular style (consistent with a brand voice or following safety rules). These systems often run on shared cloud platforms, dealing with unpredictable workloads, network slowdowns, and security issues. If a QA system can't adapt to changing conditions, users get bad, late, or even risky answers.

#### 3. What is new in this paper?
- **A New Framework for Multi-Agent Systems:** Describes how to build horizontally scalable systems—meaning you add more agent "workers" to handle more questions or tougher requirements
- **Smart Resource Management for SLAs:** Outlines how the system can detect user intent, plan how to get the answer, and assign the right agent(s) with the right configuration
- **Abstractive QA Intent Handler:** A special component that decides how to phrase and format the answer based on stylistic and SLA requirements
- **New Metrics and Dataset:** Ways to measure not just correctness, but also style matching and SLA compliance
- **Experimental Validation:** Experiments showing the approach works better than others in real-world-like conditions

#### 4. How does it work? (Step by step)

a. **Intent Detection:** Figure out not just what the question is about, but what kind of "service" it needs (quick and dirty? slow and detailed? super safe?)

b. **Planning:** Determine what information is needed and how to fetch it—maybe search databases, maybe use local knowledge, maybe both

c. **Assignment and Scaling:** Depending on how tough or urgent the question is, and current system conditions, assign the right agent(s) with the right settings

d. **Answer Generation:** The agent(s) retrieve documents and generate answers, considering style and SLA needs

e. **Evaluation and Arbitration:** When multiple agents give answers, use smart ways to pick the best one through voting, "jury" of models, or agent debates until consensus

#### 5. How are we different from previous work?
- Past work focused on scaling by splitting tasks into subtasks but didn't consider SLA requirements in changing environments
- Recent work tries to make query processing smarter with advanced planning but lacks experiments in real-world, tough conditions
- This work directly addresses SLA adaptation with experiments and concrete methods for industry-like needs

#### 6. Key Takeaways:
- **Dynamic Adaptation:** System tweaks itself in real time, shifting resources as workload changes while maintaining quality and performance
- **Flexible & Efficient:** Using multiple, differently-configured agents that can be added or removed as needed for better resource usage and reliability
- **Measurable Improvements:** Experiments show better adherence to style and quality under various scenarios

#### Simple Analogy
Imagine a restaurant (the QA system) that promises both fast food (quick answers) and fine dining (detailed, styled answers) under all conditions, even when crowded or during storms (unpredictable workloads). Instead of one chef, you have a team that can join or leave as needed, each cooking in different styles. A smart planner assigns the right chef(s) for each order and ensures every meal (answer) matches customer expectations and restaurant standards.

#### Summary
A framework for multi-agent, retrieval-enhanced QA systems that can flexibly scale and adapt to real-world demands while meeting user expectations for quality and style, backed by experiments and new success metrics beyond simple correctness.

---

## Workshop Images Referenced
- PNG image.png
- agent_talk1.jpg
- agent_talk2.jpg  
- agent_talk3.jpg
- agent5.jpg
- agent6.jpg
- agent7.jpg

*Note: The Second Half In AI Agents Models and beyond appears to be incomplete content at the end of the source document.*