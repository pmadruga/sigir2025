
## AGENTIR: 2ND WORKSHOP ON AGENT-BASED INFORMATION RETRIEVAL
https://dl.acm.org/doi/10.1145/3726302.3730365

# Keynote speach

- Context scaling for agentic retrieval
- Michael Bendersky (Google, DeepMind, databricks)
	- https://scholar.google.com/citations?user=C9mxM5IAAAAJ&hl=en

### Part I -  Educated guesses on what is the future of agentic retrieval
- Why *AgenticRAG != RAG*
	- User communicates the retrieval system directly
	- User communicates with an agent, that then communicates with the retrieval system
- Short term, we can scale retrieval with agents
- We should spent more resources offline to index significantly more information about documents, beyond vectors and tokens
	- Metadata of all sorts

### Part II
#### Inference Scaling for Long-Context Retrieval Augmented Generation
	 https://arxiv.org/abs/2410.04343
**What Is This Paper About?**

This paper investigates how to make Retrieval Augmented Generation (RAG) systems work more effectively when they have to handle very large amounts of information—think of answering complex questions by searching through millions of documents.

**Why Does This Matter?**

RAG systems use large language models (LLMs) plus a retrieval mechanism to fetch relevant documents from a big database (like Wikipedia) before generating answers. Intuitively, if you let the model "see" more documents, it should answer better. But in reality, just throwing in more documents doesn't always help and can sometimes hurt—the models get distracted or "confused" by too much irrelevant data. So, we want to know: How much should we scale up the resources and input to get the best performance without waste?

**Key Concepts Explained Simply:**

1. **RAG (Retrieval Augmented Generation):**  
    Imagine you want to answer tricky questions. Instead of relying on just your memory, you first grab relevant books or articles, read them, and then answer the question. That's what RAG does: fetch documents, then use an AI model to answer.
    
2. **Scaling Computation:**  
    Giving the model more space (context length) to "read" and more computational steps (iterations) to think. The central question is: Does doing more always make things better?
    
3. **DRAG (Demonstration-Based RAG):**  
    Here, before answering, we show the model several examples (demonstrations) of similar questions and answers, as well as the related documents. This is like showing a student lots of worked-out examples before a test.
    
4. **IterDRAG (Iterative Demonstration-Based RAG):**  
    Sometimes, questions are complicated and require multiple steps to answer. IterDRAG breaks down the problem into simpler parts ("sub-queries"), finds information for those, answers them one by one, and finally puts everything together. It's like solving a big math problem by tackling several smaller steps first.
    

**What Did We Actually Do?**

- **Measured how RAG performance changes as we give it more computational power:**  
    We varied the number of documents, examples, and the number of iterative steps, and carefully measured the results.
    
- **Discovered the best way to allocate resources, as more isn't always better:**  
    For example, retrieving too many documents can hurt performance by adding noise, while the right balance of examples and iterative steps can almost linearly improve results up to a point.
    
- **Compared Traditional RAG, DRAG, and IterDRAG:**
    
    - Regular RAG quickly plateaus—it doesn’t get better beyond a certain number of documents.
    - DRAG (with more examples and documents) keeps improving until it hits technical limits (context window size).
    - IterDRAG can go even further by solving complex, multi-hop questions step by step, especially as more computation is allowed.
- **Error Analysis:**  
    We found that mistakes often come from:
    
    1. Bad or outdated retrieved information,
    2. Incorrect reasoning steps,
    3. "Hallucinations" (the model making things up),
    4. Evaluation problems (like not handling abbreviations well). IterDRAG, which interleaves retrieval and generation, helps with many of these issues.

**Key Finding: The Inference Scaling Law for RAG:**

We observed that, under optimal configurations, RAG performance improves _almost linearly_ with the amount of computation—the more computation, the better, but only if resources are allocated smartly.

- **There's a point where adding more is wasteful** (diminishing returns if you just add more documents/steps without selective filtering).
- Our developed _computation allocation model_ can predict what settings will give the best performance for a given computational budget.

**Main Takeaways:**

1. Just throwing more data or compute at RAG isn't enough—how you allocate those resources matters a lot.
2. DRAG and especially IterDRAG are better ways to scale up RAG for complex, multi-hop questions.
3. Our modeling allows researchers and engineers to find optimal settings for their specific computational constraints, maximizing effectiveness.

**Why Is This Important for the Future?**

As LLMs get bigger and try to answer ever more complex questions, optimizing inference (how they think and retrieve information) matters for both performance and efficiency. Our findings lay the groundwork for smarter, more scalable RAG systems.

---

**In essence:**  
If you want a RAG-based system to answer hard questions by reading lots of documents, don't just throw more at it—use strategies like DRAG and IterDRAG, and allocate resources carefully to get the best results for your computational investment!

![[PNG image.png]]
![[agent_talk2.jpg]]

![[agent_talk3.jpg]]
### Part III - Agent Learning From Human Feedback

- The idea is to add a general "Instruction"/"Feedback" to the agent and then it will always keep this in mind. The agent will learn and adapt based on the user feedback.
- Part of databricks and it works really well
- Questions you need to consider
	- Feedback locatioxation - how exactly should feedback affect similar requests
	- Feedback generalisation - Should the feedback generalize to all requests?
	- Feedback assignment - Which parts of the pipeline (retrieval, generation, grounding, ...) should the feedback apply to?
- Idea: We could add *{human_feedback}* in the Agent System Prompt

- The way it is implementet is not in the system prompt. The tend to summarise the users feedback through the chat, and add it as separate prompts.
- Smaller models might be less adaptive to the user feedback.

- More context is not always better - picking the right scaling strategy is important

![[agent_talk1.jpg]]

-----

# Extra Speakers

## SLA Management in Reconfigurable Multi-Agent RAG: A Systems Approach to Question Answering
https://arxiv.org/abs/2412.06832

### **1. What is this paper about?**

This paper tackles the challenge of building smart question-answering (QA) systems that use Retrieval-Augmented Generation (RAG). Imagine you ask a question, and instead of the system guessing the answer from its training, it first searches documents (retrieves information) and then generates a final answer. We focus on QA systems that use multiple agents (think: several smart helpers working together), and especially on making sure these systems can meet specific requirements (like speed, quality, and reliability)—these requirements are known as Service Level Agreements (SLAs).

### **2. Why is this important?**

In real-world situations, you don’t just want an answer—you want it fast, accurate, and in a particular style (think: consistent with a brand voice or following safety rules). But these systems often run on shared cloud platforms, dealing with unpredictable workloads, network slowdowns, and security issues. If a QA system can’t adapt to changing conditions, users get bad, late, or even risky answers. We want to make systems that are not only smart but also reliable and adjustable depending on the operating environment.

### **3. What is new in this paper?**

- **A New Framework for Multi-Agent Systems:** We describe how to build horizontally scalable systems—meaning you add more agent "workers" to handle more questions or tougher requirements, and each agent can have different settings depending on the task.
- **Smart Resource Management for SLAs:** We outline how the system can detect what a user wants (intent), plan how to get the answer, and then assign the right agent(s) with the right configuration to get the job done, considering the current load, network, and requirements.
- **Abstractive QA Intent Handler:** We present a special component that decides how to phrase and format the answer based on stylistic and SLA requirements.
- **New Metrics and Dataset:** We create ways to measure not just if the answer is correct, but also if it matches the expected style and meets SLA requirements—this is valuable for industry (think: customer service bots).
- **Experimental Validation:** We don’t just describe ideas; we run experiments to show that our approach works better than others in real-world-like conditions.

### **4. How does it work? (Step by step)**

a. **Intent Detection:** First, when a question comes in, we figure out not just what it is about, but what kind of "service" it needs. Quick and dirty? Slow and detailed? Super safe? Each need may tweak how we answer.

b. **Planning:** Next, we figure out what information is needed and how to fetch it—maybe search databases, maybe just use local knowledge, maybe both.

c. **Assignment and Scaling:** Depending on how tough or urgent the question is, and the current system conditions, we assign the right agent(s) with the right settings. We can spin up more agents if things get busy, and each agent can be slightly different depending on the requirements.

d. **Answer Generation:** The agent(s) retrieve documents and generate answers, considering style and SLA needs.

e. **Evaluation and Arbitration:** Sometimes, more than one agent gives an answer. We have smart ways to pick the best one, using voting or having a "jury" of models [26], or asking multiple agents to debate until they reach consensus [5][13][27].

### **5. How are we different from previous work?**

- Past work often focused on scaling by splitting up tasks into subtasks for different modules, but didn’t consider the challenge of needing to meet SLAs in changing environments.
- Some recent work tries to make the query process smarter with advanced planning or modular frameworks [9][12][14][29], but lacks experiments in real-world, tough conditions with shifting demands.
- We directly address SLA adaptation, with experiments and concrete methods for industry-like needs.

### **6. Key Takeaways:**

- **Dynamic Adaptation:** Our system tweaks itself in real time, shifting resources as the workload changes, keeping answers high quality and within the promised performance—think of a flexible team that sends more help or specialized members when needed.
- **Flexible & Efficient:** By using multiple, differently-configured agents that can be added or removed as needed, the system uses resources better and stays reliable.
- **Measurable Improvements:** Our experiments show better adherence to style and quality under various scenarios.

### **Simple Analogy**

Imagine a restaurant (the QA system) that promises fast food (quick answers) and fine dining (detailed, styled answers) under all conditions, even when it’s crowded or a storm knocks out half the kitchen (unpredictable workloads). Instead of just having one chef, you have a team of chefs that can join or leave as needed, and each can cook in different styles. There’s a smart planner who assigns the right chef(s) for each order and checks to make sure every meal (answer) matches the customer’s expectations and the restaurant’s standards for speed and quality.

### **Summary**

We’ve built a framework for multi-agent, retrieval-enhanced QA systems that can flexibly scale and adapt to real-world demands while always aiming to meet user expectations for quality and style. We back this up with experiments and new ways to measure success beyond simple correctness.

![[agent5.jpg]]

![[agent7.jpg]]

![[agent6.jpg]]

-----
The Second Half In AI Agents Models and beyond