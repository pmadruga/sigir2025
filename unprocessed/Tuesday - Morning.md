
## Overview

| Paper & Link                                                                                                                                          | Problem Addressed & Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **INQUIRY ASSISTANT USING LLM-GENERATED KNOWLEDGE GRAPHS**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3731956)                                  | Automates customer support by building knowledge graphs from help pages using LLMs, enabling the assistant to ask clarifying questions and provide more accurate responses than traditional retrieval-based bots.<br>Shows that this graph-led approach increases answer correctness and reduces hallucinations compared to retrieval-augmented generation.<br>Finds that turning unstructured help into structured knowledge enables more human-like, flexible dialog management and quicker customer resolutions. |
| **ALLEVIATING LLM-BASED GENERATIVE RETRIEVAL HALLUCINATION IN ALIPAY SEARCH**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3731951)               | Tackles the issue of LLMs hallucinating in Alipay's product search by making document retrieval both reasoned and double-checked.<br>Combines knowledge-distillation (where small models learn reasoning from larger LLMs) with a “Decision Agent” that filters results via expert LLM evaluation.<br>Demonstrates significant improvements in search accuracy, user engagement, and business metrics, with automation and easy system integration.                                                                 |
| **MAAQR: AN LLM-BASED MULTI-AGENT FRAMEWORK FOR ADAPTIVE QUERY REWRITING IN ALIPAY SEARCH**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3731950) | Solves search failure from lexical gaps between user queries and system content by using LLMs fine-tuned with pseudo-data and a multi-agent system for query rewriting.<br>Each agent specializes (relevance, intent, keyword adaptation, user-behavior) and a decision mechanism picks rewrites that maximize actual user impact.<br>Results in more relevant results, higher engagement, and rapid adaptation to changing vocabulary or new apps on the platform.                                                 |
| **EXAMPLES AS THE PROMPT: A SCALABLE APPROACH FOR EFFICIENT LLM ADAPTATION IN E-COMMERCE**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3731941)  | Addresses the cost and rigidity of manual LLM prompt engineering for new e-commerce tasks by automating example selection from real labeled data (“Examples as the Prompt”, EaP).<br>Combines global and local examples to maximize model accuracy and adaptability.<br>An optimized version, EaPlite, removes natural language instructions for faster inference, achieving similar or better results than expert-crafted prompts while reducing operational overhead.                                             |

--------

## INQUIRY ASSISTANT USING LLM-GENERATED KNOWLEDGE GRAPHS
https://dl.acm.org/doi/10.1145/3726302.3731956

![[slides 1.pdf]]

### **1. What Problem Are We Solving?**

Companies get lots of customer questions about their services—think hotel bookings. Traditionally, humans respond to these questions, often by email. This is slow, expensive, and can leave customers unhappy if they wait too long for answers. We want to automate this with AI so that customers get quicker, more accurate help, while reducing costs for businesses.

### **2. Why Isn’t Simple Automation Enough?**

Basic chatbots use pre-set answers or templates, but real customer questions are often vague or incomplete. For example: “I’m getting an error when trying to change my booking.” The AI needs to ask for more specifics to help, not just spit out a generic reply. That’s why current automated systems can’t handle real-life complexity well.

### **3. What Is Our Solution?**

We propose a new way: use Large Language Models (LLMs, like advanced AI chatbots) to read through unstructured help pages (the kind of FAQs or support articles companies already have), and automatically build a “knowledge graph” from them.

A knowledge graph is a smart map of topics, problems, possible solutions, and the conditions for each solution to apply. With this, the AI can better understand what the customer is asking, figure out if it has enough info, and, if not, ask clarifying questions—just like a good human agent.

### **4. How Does Our System Work?**

- **Knowledge Graph Generation:** The AI reads each help page and recognizes key “problems” (like “Change reservation”), “resolutions” (like “Contact support if you booked by phone”), and “conditions” (like “if you’re a logged-in user”). It also notes how topics relate—some are sub-topics, others link to additional help pages.
    
- **Dialogue Manager:** When a user asks something, the AI uses the knowledge graph to figure out what the issue might be and checks if it has a known solution. If not enough information is provided, it asks the user targeted questions to fill in the gaps. If a solution is found, it gives a concise, relevant answer. If not, it can escalate to a human or give a general fallback response.
    

### **5. How Did We Test It?**

We compared our new AI assistant (Graph-Agent) to a standard approach called Retrieval-Augmented Generation (RAG-Agent). The RAG model finds relevant help pages and tries to generate an answer directly from those pages, but doesn’t use a structured knowledge graph.

To see which worked better, we simulated conversations with both AIs on real customer inquiry data from a hotel service:

- Some inquiries could be fully resolved with info from help pages (“resolvable” inquiries).
- Others required escalation, like needing booking info only a human can access (“escalation-required” inquiries).

We measured if the responses were “correct,” “partial,” or “incorrect,” and also looked at things like whether the AI asked clarifying questions, how concise the answers were, and if there were any mistakes.

### **6. What Did We Find?**

- Our Graph-Agent was more accurate than RAG-Agent at solving inquiries that could be answered from help pages, and was less likely to provide incorrect or contradictory responses (“hallucinations”).
- It asked clarifying questions much more often, leading to better, more natural conversations.
- When both approaches couldn’t fully help (for escalation-required cases), our system was better at recognizing when it needed to escalate or provide a useful fallback, instead of making things up.
- However, sometimes our system missed important details if help pages didn’t put them close to the problem description—something we aim to fix in future work.

### **7. Conclusions and The Path Forward**

We showed it is possible to automatically turn existing help documents into a knowledge graph, and then use that structure for more intelligent, human-like customer support chatbots. This system can save costs, improve answer quality, and handle complex, vague customer messages better than current retrieval-based bots.

In the future, we plan to adapt our system to more diverse help page formats, ensure we capture all critical info, and try this approach in other industries beyond hotels.

### **Why Is This Important?**

Better automation here means faster, more natural help for customers and lower costs for businesses—all powered by smarter AI that really understands the structure of knowledge and the subtleties of dialogue, rather than just copying and pasting text from help pages


-------
## ALLEVIATING LLM-BASED GENERATIVE RETRIEVAL HALLUCINATION IN ALIPAY SEARCH
https://dl.acm.org/doi/10.1145/3726302.3731951

![[slides-2.pptx]]
### 1. The Problem: Generative Retrieval and Hallucination

In search systems, especially in scenarios like Alipay’s Fund and Insurance Search, users input all kinds of queries, often with complex intentions. Generative retrieval (GR) powered by Large Language Models (LLMs)—such as GPT, Llama, or Qwen—has shown strong capability to interpret these complex queries and suggest relevant documents or products.

**However, there’s a problem:** LLMs are prone to "hallucination." That means, even if they perform well, sometimes they generate irrelevant or incorrect results, potentially suggesting documents that don’t actually match the user’s needs. This hurts the user experience and business objectives.

### 2. Our Solution: An Optimized GR Framework

We propose a new framework to directly address the hallucination in LLM-based retrieval models. It includes two main modules:

- **Knowledge Distillation Reasoning**
- **Decision Agent**

#### Knowledge Distillation Reasoning

Let’s say you have a small student model that isn’t very smart, and a much larger, knowledgeable teacher. If you want the student to become smarter, you can have the teacher “explain” not just the answer, but also the reasoning behind it.

Here’s what we do in practice:

- **Data Construction:** We build a training dataset from pairs of queries and documents, labeled as relevant or irrelevant. The relevant pairs come from existing data; for irrelevant pairs, we sample potential candidates using a preliminary retrieval model and double-check them with several LLMs in an ensemble to filter out anything possibly relevant.
- **Reasoning Generation:** For each query-document pair (both relevant and irrelevant), a _powerful_ LLM generates a reason—an explicit explanation of why a document is (or isn't) relevant to the query.
- **Knowledge Distillation:** We then fine-tune our smaller GR model using this enriched data, which contains not only the relevance labels but also the explanations generated by the larger model. This trains the smaller model not just to memorize answers but to actually _think_ about relevance the way the teacher does.

This process is much like a student learning better by understanding the logic of the teacher’s answers, not just the answers themselves.

#### Decision Agent

Even after smarter training, hallucination can still persist—a single process isn’t always perfect. So, after the initial retrieval, we add another layer of checking:

- We use traditional retrieval models (like classic sparse or dense retrievers) to gather more documents related to the GR output.
- For each candidate, we ask a strong LLM to assess the relevance again, but this time from multiple perspectives (e.g., checking product company, type, duration, etc.).
- Only documents that pass this multi-perspective test are kept as final results.

Think of it as a double-checked fallback: before showing results to users, we pass them through an additional expert filter to catch and remove mistakes the first round didn’t notice.

### 3. Why This Works (Results)

Through a series of experiments and A/B tests in Alipay’s live search system, we found:

- Removing the _reasoning_ module led to a ~2% drop in accuracy,
- Removing the _decision agent_ led to further drops,
- Our framework, when fully applied, significantly improved both offline accuracy and live user engagement and business metrics (such as Clicks and Trades) 3726302.3731951.pdf.

### 4. Advantages of Our Approach

- **No need for extra manual annotation:** The process is automated using LLMs.
- **Easily applicable:** Can be plugged into any existing GR model.
- **Significant uplift in accuracy:** Demonstrated both in controlled experiments and in the real-world large-scale environment of Alipay.

### 5. In Simple Terms

Imagine teaching a less experienced junior not just to answer questions quickly, but to always explain their reasoning. Then, before the answer goes out, a group of experts reviews and flags anything suspicious. This two-stage process reduces mistakes and increases trust in the output.

### 6. Impact

This methodology has already been deployed at scale in Alipay’s Fund and Insurance search, delivering measurable improvements in user clicks and transaction counts 3726302.3731951.pdf.

**In summary:** By teaching our models the reasoning behind relevance (not just the answer), and adding a decisive quality control step after initial retrieval, we greatly reduce hallucinations and boost retrieval precision in complex search scenarios.

Let me know if you want me to dive deeper into any specific technical component or illustrate it further!

-------

## MAAQR: AN LLM-BASED MULTI-AGENT FRAMEWORK FOR ADAPTIVE QUERY REWRITING IN ALIPAY SEARCH
https://dl.acm.org/doi/10.1145/3726302.3731950

![[slides-3.pptx]]

### **What Problem Are We Solving?** 
When people search for things on e-commerce platforms like Alipay, they often use words and phrases that don’t exactly match the words used by the sellers or the apps. For example, a user might type “pay bills” but the mini-app is labeled as “utility payments.” This mismatch is called a vocabulary or lexical gap and can lead to bad search results—users might not find what they need, or they see mostly irrelevant items. To fix this, search systems rewrite or expand user queries to better match what’s actually in the system.

### **Traditional Methods and Their Limits** 
Old-school methods add synonyms or related terms to a query, often based on things like click logs, simplified rules, or dictionaries. These help, but they don’t deeply understand what users or items really mean, and they don’t adjust quickly to new apps, new products, or changing user needs.

### **LLMs and Why We Use Them** 
Large Language Models (LLMs), like GPT-4, are exceptional at understanding and generating language. Using them, we can build systems that “rewrite” queries in smarter ways, making user queries align better with item descriptions. But, off-the-shelf LLMs might not know enough about Alipay’s mini-apps or may not keep up with the latest trends and new vocabulary that arise on a platform. They also struggle with changes in user behavior and app content.

### **Our Solution: The MAAQR Framework** 
We designed a system called MAAQR (Multi-Agent Adaptive Query Rewriting) to overcome these challenges. Here’s how it works, step-by-step:

1. **Knowledge-Enhanced Fine-Tuning:**  
    We “teach” an LLM more about Alipay mini-apps by generating lots of synthetic data—pairs of queries and the relevant mini-app keywords. This fine-tuning helps the model connect common search phrases to the words used by actual apps, improving its domain knowledge.
    
    - **Data Synthesis:** We use another LLM (like GPT-4) to generate many pseudo-queries associated with actual mini-app keywords.
    - **Supervised Fine-Tuning:** We train our main model on these pairs. It learns not just to predict keywords from queries (keyword-prediction), but also to rewrite queries as a human would (query-rewriting). We combine both tasks during training to make the model better all around.
2. **Multi-Agent Collaborative Rewriting:**  
    Instead of depending on a single approach, we use several “agents” (think of them as specialized mini-experts) with different strengths:
    
    - **RSQR (Relevance-Steered Query Rewrite):** Focuses on making queries more textually similar to the way people usually search in Alipay.
    - **ISQR (Intent-Steered Query Rewrite):** Focuses on capturing the intended task—rewriting the query so that the search system can match it with a mini-app that fulfills the user’s intent, even if the words are quite different from the original query.
    - **KAQA (Keyword-Aware Query Adaptation):** Adjusts queries so that they align with the latest, professional keywords that describe mini-app functionalities. It uses feedback from RSQR and ISQR—to make sure rewrites match real, up-to-date mini-app content.
    - **QDUB (Query Decisions Driven by User Behavior):** This agent looks at how users interact with search results (for example, which queries lead to more clicks or purchases) and picks the most effective rewritten query for each case, maximizing practical business values.

Think of these agents like a group of chefs: each specializes in one cuisine, and the head chef (QDUB) tastes the results and chooses the best dish for the customer, considering both taste (relevance) and popularity (business impact).

### **How Does This Work in Practice?**

- The knowledge-enhanced LLM generates several possible rewrites for each user query.
- Each agent offers its perspective (textual similarity, intent match, keyword adaptation).
- The system uses data about what works best with real users (clicks, transactions) to pick the most impactful rewrite.
- This multi-agent approach keeps the query rewriting adaptive (it changes as new keywords are added, new apps are introduced, and user behavior shifts).

### **Experimental Results** 
We tested this system with real user queries—especially those that were long, tricky, or previously led to poor results. Compared to industrial baselines and other LLM rewriting methods, our MAAQR system:

- Brought back more relevant mini-apps for each search (higher recall).
- Improved the percentage of good search results.
- Led to higher click-through rates (people interacted with results more), more transactions, and more payment volume.
- Significantly reduced the number of searches that returned zero results.

Importantly, these improvements were achieved with minimal added system delay.

### **Key Takeaways:**

- Searches often fail because users and apps use different words.
- We train a smart language model to understand these differences using lots of (even synthetic) data.
- Rather than using one model, we use several specialized agents, each with its own way of improving search rewrites.
- We let real user behavior guide which rewritten query is best.
- This flexible, adaptive multi-agent system helps users find what they want faster and helps the business too.

-------
## EXAMPLES AS THE PROMPT: A SCALABLE APPROACH FOR EFFICIENT LLM ADAPTATION IN E-COMMERCE
https://dl.acm.org/doi/10.1145/3726302.3731941

### **Step 1: High-Level Overview – What Problem Are We Solving?** 
In e-commerce, companies use Large Language Models (LLMs), like ChatGPT, to perform many tasks—such as understanding what users search for, making recommendations, or helping with customer support. Traditionally, fine-tuning an LLM for each new task takes a lot of time and computational resources. Instead, we can “prompt” these models with carefully written instructions and examples, saving effort and resources.

However, there are problems:

- Designing and maintaining prompts is time-consuming and often needs experts.
- Prompts need frequent updates as business needs change.
- It’s challenging to select unbiased and representative examples for prompts.

### **Step 2: The Key Idea – What Is Our Solution?** 
We introduce a new framework called Examples as the Prompt (EaP). Instead of relying on humans to design the best prompts and pick examples, we let the system automatically select representative examples from real labeled data to use in the prompt. The idea is to maximize the model’s few-shot learning ability—its capability to learn a task just from seeing a few examples.

Further, we introduce EaPlite, a version that removes natural language instructions from the prompt entirely and only uses labeled examples, making the model run much faster.

### **Step 3: Diving Deeper – How Does EaP Work?** 
Imagine you want the LLM to classify search queries into categories like “Product Search,” “Category Search,” or “Non-Shopping Query.” Instead of crafting a prompt with handpicked example queries, EaP automatically selects the most useful examples from a large pool of labeled data.

EaP selects two kinds of examples:

- **Global Examples**: These represent the general distribution of all possible queries. We select these using methods like random selection or clustering so that we cover different types of queries broadly.
- **Local Examples**: These are chosen dynamically based on which ones are most similar to the actual input query the model is handling at the moment. We use mathematical techniques (such as cosine similarity on embeddings) to find the closest matches in the dataset.

By combining global and local examples, EaP ensures the prompt both covers the task broadly and adapts to specific cases.

### **Step 4: What About Performance?** 
We tested EaP on four real-world e-commerce tasks:

1. **Navigation**: Classify search intent as navigation or shopping.
2. **Order**: Is the query about a previous order?
3. **Deal**: Is the query about looking for a deal?
4. **Question2Query (Q2Q)**: Transform question-style queries into shoppable keywords.

In all these cases, EaP matched or beat the performance of carefully engineered prompts made by experts. Notably, for nuanced tasks like navigation intent, automatically chosen examples worked better because it’s hard to describe in words precisely what counts as a navigation query.

### **Step 5: Why Does This Matter?**

- **Automation**: No need for manual curation of prompts or examples.
- **Adaptability**: Easy to update as business data or needs evolve.
- **Efficiency**: EaPlite (using only labeled examples) cut LLM inference time by up to 70% without reducing accuracy.
- **Business Impact**: When used in Amazon’s data-labeling pipeline, this approach led to a measurable, though small, revenue improvement.

### **Step 6: Are There Any Special Insights?**

- Balancing the mix of global and local examples is important for best results.
- Even without lengthy natural language instructions, an LLM can learn from just a well-chosen set of examples.
- Managing prompt length is crucial, as longer prompts can slow down the LLM and make deployment impractical.

### **Conclusion—In Simple Words** 
Traditional prompting for LLMs in e-commerce is like constantly tweaking and rewriting instructions for a student. Our approach, EaP, is like giving the student lots of smartly chosen example problems instead—letting the system pick which examples to show. This makes the student (the LLM) learn the task faster, adapt to new problems, and work more efficiently—saving time, money, and expert effort. EaPlite speeds things up even more by skipping instructions and relying only on examples, with no loss in performance.

In sum, "Examples as the Prompt" is a smarter, faster, and more flexible way to get LLMs to do what you want in e-commerce—with less work and better results

-------
