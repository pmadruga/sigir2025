
## Overview

| Paper & Link                                                                                                                                                                   | Problem Addressed & Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **RANKERS, JUDGES, AND ASSISTANTS: TOWARDS UNDERSTANDING THE INTERPLAY OF LLMS IN INFORMATION RETRIEVAL EVALUATION**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730348) | Examines the risks when LLMs serve both as rankers (choosing results) and judges (scoring relevance) in information retrieval, possibly biasing system evaluation.<br>Finds LLM judges are more lenient than humans, can be biased toward LLM-based rankers, and may miss subtle performance gaps, risking feedback loops that reward model similarity over actual quality.<br>Recommends maintaining human oversight, transparency, and consistent evaluation practices to ensure IR benchmarks reflect genuine user needs, not just LLM preferences. |
| **INSTRUCTRAG: LEVERAGING RETRIEVAL-AUGMENTED GENERATION ON INSTRUCTION GRAPHS FOR LLM-BASED TASK PLANNING**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730009)         | Improves LLM planning for complex, multi-step tasks by storing successful problem-solving instructions in a reusable instruction graph.<br>Combines retrieval of instruction paths and RL/ML agents to explore and score candidate plans, enabling adaptive, stepwise guidance for both known and novel tasks.<br>Leads to more flexible, explainable, and rapid few-shot learning for new task types by leveraging structured memory of past solutions.                                                                                               |
| **A UNIFIED RETRIEVAL FRAMEWORK WITH DOCUMENT RANKING AND EDU FILTERING FOR MULTI-DOCUMENT SUMMARIZATION**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729884)           | Advances multi-document summarization by automating both query selection and retrieval at the fine-grained Elementary Discourse Unit (EDU) level instead of full sentences or paragraphs.<br>This model-agnostic approach selects important queries and relevant text fragments without human effort, leading to more focused, high-quality summaries.<br>Experiments show its improved retrieval quality and summary informativeness over existing baselines on major summarization datasets.                                                         |
| **RETRIEVAL AUGMENTED GENERATION FOR DYNAMIC GRAPH MODELING**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729958)                                                        | Tackles prediction in dynamic graphs (where relationships shift over time) by retrieving and fusing demonstrations—similar node histories—from a temporal and structural perspective.<br>Combines time- and context-aware retrieval with a graph fusion generator to blend broader past experiences, improving predictions for evolving networks.<br>Outperforms prior methods by moving beyond local node histories and capturing dynamic, global trends effectively.                                                                                 |
| **EMPOWERING LARGE LANGUAGE MODEL AGENT THROUGH STEP-LEVEL SELF-CRITIQUE AND SELF-TRAINING**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729965)                         | Addresses LLM agents’ struggles in complex, multi-step tasks by introducing step-level self-critique within a Monte Carlo Tree Search exploration framework.<br>The agent critiques and refines each action step, not just final outcomes, with all reasoning, refinement, and critique data used for ongoing self-training.<br>Results show improved reliability, solution quality, and self-correction ability, making LLM agents more trustworthy and autonomous in complex problem-solving.                                                        |

## RANKERS, JUDGES, AND ASSISTANTS: TOWARDS UNDERSTANDING THE INTERPLAY OF LLMS IN INFORMATION RETRIEVAL EVALUATION
https://dl.acm.org/doi/10.1145/3726302.3730348

### **1. What is the problem we’re looking at?**

Large Language Models (LLMs), like the AI models powering modern chatbots and search engines, are increasingly used in two key roles within information retrieval (IR) systems:

- As **rankers**: deciding which search results are most relevant to a user’s query.
- As **judges**: automatically evaluating or scoring how relevant those results are—often standing in for human assessors.

But there’s a catch: If both the ranking and the judging are done by LLMs, are we evaluating systems fairly? Or could there be hidden biases and issues? Until now, research only hinted at these problems; we want to dig deeper, especially when LLMs are used both to produce and to evaluate ranking results.

### **2. Why is this important?**

If LLM judges favor systems that use similar LLM technology—maybe because of shared reasoning or stylistic similarities—we might end up with evaluations that are unfairly “gaming” the system. This could hide weaknesses in the models, suppress diversity in search results, or unfairly penalize new ideas that don’t fit the LLM’s training.

### **3. What did we do?**

We:

- Reviewed how LLMs are currently used in IR, emphasizing that these roles are deeply interconnected.
- Ran experiments comparing human judges vs. various LLM judges, using recent TREC Deep Learning datasets of search queries, with human-graded relevance as the “ground truth.”
- Compared systems using both LLM-based rankers and traditional (non-LLM) methods.
- Explored not just LLM-judged ranking, but also what happens when the documents being ranked are themselves generated or rewritten by LLMs.

### **4. What did we find?**

**a) LLM judges are more lenient than humans.**  
When giving relevance scores, LLM judges tend to be more forgiving or “washed out” than strict human judges.

**b) LLM judges are biased toward LLM-based rankers.**  
When ranking systems are LLM-based, LLM judges prefer their results—even if, according to human judges and ground truth, these aren’t the best results. Sometimes, this bias is so strong that the real “gold standard” results (according to humans) are ranked below all LLM-based systems by an LLM judge.

**c) LLMs struggle to spot subtle but significant differences.**  
When the difference in ranking quality between two systems is small—but statistically meaningful (according to humans)—LLM judges often fail to pick this up.

**d) Bias toward LLM-generated content is harder to prove.**  
We checked whether LLM judges prefer texts that have been rewritten or generated by other LLMs (even when the ranking method is not LLM-based). In our specific experiments, we found little evidence for this kind of bias, though prior work claims it exists. So, the jury is still out, and more research is needed.

### **5. Why are these findings important?**

If LLM judges are replacing humans, but are systematically biased or “favor their own kind,” then the entire evaluation process risks becoming a feedback loop—rewarding systems that produce outputs similar to what LLMs expect (or are trained on), even if those are not what real users want.

Worse, if we use LLM-generated labels to train new LLM-based systems (“circularity”), it can make problems snowball: systems learn to optimize for LLM judges rather than real-world usefulness.

### **6. What do we recommend?**

- **LLM judges should not simply replace humans.** LLMs can help speed up evaluation and reduce human workload, but human judgment remains the true gold standard.
- **Consistency is key.** Always use the same LLM judge and settings across comparisons.
- **Be transparent.** Clearly report which LLM model, version, prompt, and config you use.
- **Use LLM judges as filters, not final arbiters.** LLMs can help narrow down which systems are worth deeper, human review, but shouldn’t be the only metric.

### **7. What are the open questions or next steps?**

- How do these biases play out in the wild, especially with different LLM models and more varied evaluation setups?
- How can we better detect and quantify these biases so that system evaluation remains fair and useful?

### **In summary:**  
Using LLMs as both rankers and judges in IR creates risks of hidden biases and feedback loops that can mislead us about true system quality. We provide empirical evidence of these biases, offer early guidelines to help the community, and call for more research to ensure future IR evaluation methods serve real users—not just the algorithms judging themselves

-----

## INSTRUCTRAG: LEVERAGING RETRIEVAL-AUGMENTED GENERATION ON INSTRUCTION GRAPHS FOR LLM-BASED TASK PLANNING
https://dl.acm.org/doi/10.1145/3726302.3730009

### What Problem Are We Solving?

Large Language Models (LLMs), like GPT-4, can carry out tasks by planning and following steps, but often struggle with complex, multi-step problems because they don’t always remember or know all the necessary details. Some recent approaches try to help by letting LLMs look up information in external databases (a method called Retrieval-Augmented Generation, or RAG). However, just adding RAG is often not enough: LLMs' planning abilities can still be limited, and it can be hard to adapt these solutions to new kinds of tasks.

**Our goal:** We want LLMs to be much better at planning and problem-solving, using both task instructions (the ways problems were solved before) and external information, and to be able to rapidly learn new tasks.

### What Is Our Main Idea?

Imagine every solved question is like a path made of instructions (like "Search for X" ➔ "Look up Y"). If we store these solved instruction paths in a structured way—specifically, in a graph where each node clusters similar instructions—it becomes much easier to reuse, combine, and adapt these plans to new questions.

We call our approach **InstructRAG**. It works by:

1. **Building an Instruction Graph:** This is a directed graph where each node is a set of similar instructions, and edges record which tasks or questions are linked across instructions. Think of it as a roadmap of how problems were solved in the past.
    
2. **Growing and Adapting the Graph:** As new questions and tasks arrive, we insert new instruction paths into the graph, merging steps that are similar to those already saved, and creating new branches when necessary. This helps expand the graph’s coverage (what we call "enlargeability"), so it can handle more kinds of questions.
    
3. **Retrieving and Combining Instructions:** When faced with a new question, we train a special agent (an RL-Agent) to explore this graph and find promising paths—that is, sequences of instructions likely to work for this new problem, including combinations never seen before.
    
4. **Choosing the Best Plan:** A second agent (an ML-Agent) scores these candidate paths, selecting the most relevant one for the question. This choice is used to form a structured prompt for the LLM, guiding it through the solution step by step.
    
5. **Rapidly Learning New Tasks:** Even if a new question falls outside the types of tasks the graph has seen before, the LLM can quickly adapt by conditioning on new, task-specific paths (this is "transferability"). The model can be “few-shot” trained: given just a handful of new examples, it updates itself to address novel problems rapidly.
    

### How Do We Build and Use the Instruction Graph?

1. **Start from Examples:** We take a dataset containing solved questions (support set), each annotated with the sequence of steps (instructions) that solved it.
    
2. **Construct Instruction Paths:** For each question, we generate its instruction path, like ["Search for Scott Derrickson", "Lookup nationality"].
    
3. **Insert with Similarity:** When inserting instructions into our graph, we check if each instruction is similar (like, also a "Search" or "Lookup" action about a related topic) to one already present. If it is, we merge it; if not, we create a new node. We use a threshold to decide what’s "similar enough".
    
4. **Build Edges for Tasks:** Edges track which tasks are solved by stepping from one instruction to the next.
    

This approach allows us to blend old and new steps, enabling the system to create novel paths for new questions by combining previously learned instructions in new ways. For example, knowing how to search for “Scott Derrickson” and “Ed Wood” and how to look up their nationality allows us to answer questions about someone else’s nationality with similar steps.

### What’s Special About Our Approach?

- **Enlargeability:** By combining instructions flexibly, our graph can create new solutions for questions within the domains it has encountered, even if it hasn’t seen the precise question before.
    
- **Transferability:** Our framework adapts quickly to brand new types of tasks by incorporating new instructions and re-training with just a few examples, without re-building everything from scratch.
    
- **Agent Collaboration:** We use a two-agent setup: the RL-Agent explores the graph to find plausible instruction sequences, while the ML-Agent uses advanced learning objectives (like contrastive loss) to pick the best match for the current question.
    
- **Structured Guidance to LLMs:** The winning instruction path is packaged into a structured prompt (including task description, instruction definitions, step-by-step plan, and demonstrations) to clearly guide the LLM to a correct, explainable answer.
    

### Summary

Put simply, **InstructRAG** turns the recipe-like ways LLMs solve tasks into a map of instructions, which it then grows, explores, and adapts as new challenges arise. By turning successful problem-solving experiences into a flexible graph, our approach gives LLMs much better tools to plan, adapt, and explain complex solutions, making them more effective and much faster at learning new skills—even with just a few new examples

-----

## A UNIFIED RETRIEVAL FRAMEWORK WITH DOCUMENT RANKING AND EDU FILTERING FOR MULTI-DOCUMENT SUMMARIZATION
https://dl.acm.org/doi/10.1145/3726302.3729884

### **1. What is the problem we’re tackling?**

We focus on multi-document summarization (MDS). That means: given several documents all talking about the same topic (like different news articles about the same event), the goal is to create one concise summary covering all the important points.

But there are two big challenges:

- **Input length limits:** Modern summarization models (especially those based on transformers) can only take in a limited number of words/tokens at a time. If you feed in too much, some information gets chopped off.
- **Retrieval reliance:** To get around these limits, most people "retrieve-then-summarize" — i.e., pick out what they hope are the most important parts from all documents (retrieval) and then let the summarizer write the summary. But existing retrieval methods usually depend on _manually written queries_ (like topic statements or search terms) and work with whole sentences or passages, which can mix relevant and irrelevant information together 3726302.3729884.pdf.

### **2. Why is the _query_ part problematic?**

Let’s use an analogy: imagine you’re trying to quickly find the most useful sentences in a pile of articles. Most systems need you to give them a specific query, like “Rescue operations in the Solomon Islands,” which they use to rank/retrieve text. But:

- Writing good queries is hard and labor-intensive, especially since, for MDS, the documents themselves _collectively_ define the topic.
- Plus, if you focus on sentences or passages, you’re often dragging in extra, irrelevant stuff that muddies your summary.

### **3. What’s our main idea (our solution)?**

Our main innovation is to automate both the _query selection_ and _retrieval granularity_:

- **Automatic query selection:** Instead of having people write queries, our system learns to select the most important queries directly from the documents themselves. The key insight: MDS documents are about the same topic, so it’s possible to find their shared focus by analyzing their content, instead of asking for it up front.
- **Finer-grained retrieval with EDUs:** Rather than retrieving whole sentences or paragraphs, which can contain extra fluff, we break down text into Elementary Discourse Units (EDUs). Think of EDUs as the smallest meaningful pieces of a text (like “They have tried to refloat the vessel since Thursday”). They’re more atomic than sentences but more meaningful than just words 3726302.3729884.pdf. This lets us filter out irrelevant bits more effectively, packing more important info into the limited context length of the summarizer.

### **4. How does our approach actually work?**

- We use a special parser (DMRST) to segment the text into EDUs.
- Our retrieval framework then scores both documents and the EDUs inside them for importance.
    - For _document ranking_, it decides which documents in the collection are most relevant to the central topic, ranking them accordingly.
    - For _EDU filtering_, it filters out those EDU pieces that are less relevant, so only the most critical info remains.
- Both of these steps are _automatic_ — the model figures out the relevant queries and what to keep (and what to drop) as it processes the data.
- The key is an EM algorithm that lets the system dynamically infer good queries and simultaneously filter irrelevant units.

### **5. How is this better than previous methods?**

- No manual query writing or reliance on dataset-provided queries 3726302.3729884.pdf.
- Less risk of pulling in irrelevant information, because we’re working with finer units (EDUs, not just sentences/paragraphs).
- Our approach improves both:
    - **Retrieval quality:** Better alignment with “salient” (i.e., really important) content and less inclusion of non-salient stuff. Metrics like Precision@K and NDCG@K (which measure how well the top-K items match what a human would pick) show we beat strong baselines like BM25 or DYLE 3726302.3729884.pdf.
    - **Final summary quality:** In both automatic and human evaluations, our summaries are more informative and contain less irrelevant information 3726302.3729884.pdf.

### **6. Experiments and Results**

We tested our retrieval+summarization framework on major MDS datasets (news, Wikipedia, scientific papers) and with a range of standard summarization models (BART, PEGASUS, PRIMERA, LLaMA, etc.) 3726302.3729884.pdf. Our method not only leads to better input selection for these models, but also improves their final output summaries, according to standard benchmarks like ROUGE and in human evaluation 3726302.3729884.pdf.

### **7. Why does this matter?**

With ever-growing data and the popularity of large language models, how you select and condense information from multiple sources is crucial. Our work shows that you can get better summaries—not by asking more of humans, but by being smarter about automatic content selection and fine-grained filtering.

### **Summary in a sentence:** 
Our model-agnostic retrieval framework for multi-document summarization replaces manual query needs and coarse-grained selection with automatic, fine-grained EDU-based ranking and filtering, leading to more informative and focused summaries

------

## RETRIEVAL AUGMENTED GENERATION FOR DYNAMIC GRAPH MODELING
https://dl.acm.org/doi/10.1145/3726302.3729958

**What is the problem we want to solve?**

Dynamic graphs are networks—think of social networks, citation networks, or interaction logs—where the relationships between elements (nodes) change over time. A big challenge is predicting what connections or events will happen next based on what has occurred previously. Traditional methods either take "snapshots" at intervals and look at how the graph changes from one snapshot to the next, or they try to model the timing of every single interaction.

Most existing methods only look at a node’s local history to predict its future, which limits their ability to capture bigger patterns or adapt to new, changing behaviors in the graph.

**Our core idea: Retrieval-Augmented Generation for Dynamic Graphs (RAG4DyG)**

The main innovation in RAG4DyG is to enrich the information we use for prediction by fetching (retrieving) relevant "demonstrations" (examples of past node sequences and their outcomes) from a pool of previous samples. We don’t just use a node’s own past—we retrieve and combine useful patterns from the broader graph history, focusing on cases similar to our prediction target, both in content and time.

Let’s break down the main components:

### 1. Sequence Modeling of Dynamic Graphs

We first represent a dynamic graph as sequences: for any target node, we create a chronological list of its past interactions (who it interacted with, and when). This sequence is the "query." The goal is to predict that node’s next set of interactions (the "output sequence") 3726302.3729958.pdf.

### 2. Time- and Context-Aware Retriever

To enhance predictions, we build a retrieval system that, given a query sequence (the history of a target node), can find K most relevant demonstrations (other histories and their next steps) from a database. This system works in two smart ways:

- **Time-aware retrieval:** We prefer demonstrations whose events happened close to the query’s time, using an exponential decay function: the further back (or forward) in time, the less important a demonstration is. This helps ensure that the retrieved examples are temporally relevant 3726302.3729958.pdf.
    
- **Context-aware retrieval:** We use contrastive learning to find demonstrations whose structure (sequence of interactions) is most similar to the query, regardless of timing. We also use data augmentations (masking and cropping) when training the retriever to help it focus on robust, intrinsic patterns and ignore noise or irrelevant details 3726302.3729958.pdf.
    

The training of this retriever involves two losses: one encouraging temporal proximity, the other encouraging contextual similarity. During inference (prediction), we use it to rank the candidate demonstrations for each query.

### 3. Graph Fusion-based Generator

Once we've retrieved several relevant demonstrations, we need to combine their information for use in prediction. Instead of just concatenating long sequences (which can be unwieldy and cause the model to lose focus), we fuse these demonstrations into a "summary graph" 3726302.3729958.pdf.

- All tokens (special markers, nodes, times) from the retrieved demonstrations become nodes in this summary graph.
- Edges capture how these tokens are related in their respective demonstrations.
- We then use a Graph Neural Network (GNN) to process this summary graph, extracting a rich, structured representation that carries both context and structural knowledge from the demonstrations.
- This fused graph representation is combined (prepended) to the original query sequence and passed into a sequence generation model (a Transformer), which then predicts the target node’s future interactions 3726302.3729958.pdf.

### 4. Training and Inference

- During training: We freeze most model parts, except those responsible for graph fusion and output.
- During testing: For each new query, we first retrieve relevant demonstrations, build and fuse the summary graph, combine it with the query, and finally predict what happens next using the trained model 3726302.3729958.pdf.

### 5. Why is this better?

- **Broader Context:** We can go beyond just a node’s own history and leverage similar cases from the entire dataset.
- **Temporal Adaptation:** By factoring in time proximity, we adapt to trends or distribution shifts in the data.
- **Structural Understanding:** The fused graph makes it easier to identify higher-level patterns and relationships.

Experiments on various datasets (social networks, email logs, etc.) show that RAG4DyG outperforms previous models, especially in adapting to new or evolving patterns. This makes predictions about future events in dynamic graphs more accurate and robust 3726302.3729958.pdf.

### **Summary:** 
Imagine you’re trying to predict what will happen to someone in a complex, changing network—like who they’ll email next, based on their previous emails. Instead of just looking at their own email history, you also look for other people who had similar patterns in the past, especially if those patterns happened at around the same time. You then summarize what happened in those similar situations, blend this summary with your original person’s history, and make your prediction.

By doing this smart retrieval and combination, you get a much more flexible and powerful prediction system—one that learns not just from the local past, but from the broad, dynamic tapestry of the whole network’s history

------

## EMPOWERING LARGE LANGUAGE MODEL AGENT THROUGH STEP-LEVEL SELF-CRITIQUE AND SELF-TRAINING
https://dl.acm.org/doi/10.1145/3726302.3729965

### 1. **Big Picture: What Problem Are We Trying to Solve?**

Large Language Models (LLMs)—like ChatGPT—are now being used as "agents" that can perform complex, multi-step tasks. For example, imagine a chatbot that not only answers questions but fetches information from the web, thinks through multiple steps, and makes decisions along the way.

But here's the catch: these agents often struggle with complicated tasks where a single mistake in any step could derail the entire process. It's like following a recipe—one wrong ingredient can ruin the dish. Our goal is to help LLM agents get better at _catching their own mistakes step by step_, rather than only realizing a problem at the end.

### 2. **How Is This Normally Done and What’s Missing?**

Usually, researchers help LLMs improve with two main approaches:

- **Trajectory-level feedback:** After the bot finishes a full task, it reviews what went wrong and tries to fix it next time. But this often doesn’t tell you _where_ the mistake happened.
- **Step-level action selection:** At each step, the bot picks from several possible next actions (using randomness, aka “sampling” for diversity). But this can be a trade-off: more diversity sometimes means lower quality, and vice versa. Also, these methods don’t focus much on the bot’s ability to _critique and correct itself_ at each step.

We realized that what’s missing is **step-level self-critique**: Can a bot not only generate an action at each step, but also look at its own action, critique it in plain language, and then refine or fix it immediately if needed?

This is a challenging problem because:

- Step-level self-critiquing is hard (even for humans!), and LLMs aren’t naturally good at it.
- It's not always clear how to tell if a critique is actually helpful, especially since feedback is sparse (the environment mostly rewards only for the final outcome, not each step).

### 3. **Our Solution: Step-Level Self-Critique Monte Carlo Tree Search (SLSC-MCTS)**

#### What is Monte Carlo Tree Search (MCTS)?

Think of MCTS like a decision tree: at each step, you can take different actions, and each action leads to new states. By simulating (“rolling out”) many possible sequences of actions, you can estimate which paths are best—like a chess player imagining different move sequences.

#### How Do We Use MCTS with LLMs?

- We use MCTS to explore possible decision paths the LLM agent can take in solving a task.
- But we add a twist: **at every step of this search, the agent generates a self-critique of its action in natural language.**
    - The critique includes both a verdict (“good” or “bad”) and explanations.
    - Then, the agent uses that critique to refine its action—repeating this process to expand the diversity and quality of possible actions at each decision point.

By combining MCTS with self-critiques, we can build a decision tree where, at every step, some branches represent “original actions” and others are “refined after critique.”

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