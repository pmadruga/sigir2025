
## Overview

| Paper & Link                                                                                                                                                                          | Problem Addressed & Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PROACTIVE CONVERSATIONAL AI: A COMPREHENSIVE SURVEY OF ADVANCEMENTS AND OPPORTUNITIES**<br>[Link](https://dl.acm.org/doi/10.1145/3715097)                                           | Surveys how dialogue systems can become proactive—taking the initiative to anticipate, plan, and guide conversations rather than merely react.<br>Defines and categorizes proactivity across various system types (open-domain, task-oriented, information-seeking) and discusses technical, ethical, and evaluation challenges.<br>Highlights recent progress powered by large language models and provides an up-to-date roadmap for future research in proactive, more helpful AI assistants. |
| **DISCO: LLM KNOWLEDGE DISTILLATION FOR EFFICIENT SPARSE RETRIEVAL IN CONVERSATIONAL SEARCH**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729966)                               | Targets efficient conversational search retrieval by distilling knowledge from LLMs to sparse retrievers.<br>Instead of matching representations rigidly, their DiSCo method distills similarity score distributions from LLM “teachers,” training flexible, efficient retrievers using SPLADE and multiple teachers.<br>Achieves state-of-the-art accuracy and efficiency on multi-turn search, needing fewer slow LLM calls at inference.                                                      |
| **CLARIFYING AMBIGUITIES: ON THE ROLE OF AMBIGUITY TYPES IN PROMPTING METHODS FOR CLARIFICATION GENERATION**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729922)                | Addresses the problem of ambiguous user queries in search/dialogue systems.<br>Proposes an AT-CoT method: first classifies ambiguity type in the query, then reasons specifically about it before generating a clarification question.<br>Results show this targeted approach outperforms standard prompting for clarification, improving both clarification quality and downstream search/retrieval performance.                                                                                |
| **BEYOND WHOLE DIALOGUE MODELING: CONTEXTUAL DISENTANGLEMENT FOR CONVERSATIONAL RECOMMENDATION**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729903)                            | Tackles the challenge of capturing both entity-focused and background context in conversational recommenders.<br>DisenCRS separates focus and background information via contrastive and counterfactual learning and adaptively balances their influence when generating recommendations.<br>This context disentanglement leads to more accurate, situation-aware movie suggestions compared to prior approaches.                                                                                |
| **MSCRS: MULTI-MODAL SEMANTIC GRAPH PROMPT LEARNING FRAMEWORK FOR CONVERSATIONAL RECOMMENDER SYSTEMS**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730040)                      | Enhances CRSs by fusing multimodal info (text, images, knowledge graphs) into rich semantic graphs and connecting them via prompt learning.<br>Unifies recommendation and conversation generation so both inform each other dynamically.<br>MSCRS achieves state-of-the-art results for movie advice and chat, showing importance of multi-modal, graph-based context and joint learning.                                                                                                        |
| **ACTION FIRST: LEVERAGING PREFERENCE-AWARE ACTIONS FOR MORE EFFECTIVE DECISION-MAKING IN INTERACTIVE RECOMMENDER SYSTEMS**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729885) | Proposes AF-IRS, a system combining LLMs and external recommenders by first generating candidate items using a preference-tree and then refining recommendations or clarifying questions in a loop.<br>Focuses on flexible, nuanced user preference extraction and efficient narrowing of choices, followed by action-aware decision-making.<br>Enables more adaptive, interactive and accurate recommendations as user needs evolve.                                                            |
| **BRIDGING THE GAP: FROM AD-HOC TO PROACTIVE SEARCH IN CONVERSATIONS**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729915)                                                      | Addresses the mismatch between conversational “chit-chat” and neural retrievers trained on short, focused queries.<br>Proposes Conv2Query: generates and filters concise, effective queries adapted from conversation context before passing to retrievers.<br>Experimentally proves this conversion and filtering step bridges the gap, making proactive conversational search significantly more effective.                                                                                    |
| **SEARCH-BASED INTERACTION FOR CONVERSATION RECOMMENDATION VIA GENERATIVE REWARD MODEL BASED SIMULATED USER**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730080)               | Improves conversational recommendation by training with LLM-powered simulated users that provide rich, attribute-level critique and item scoring.<br>This synthetic feedback loop allows recommender models to refine their suggestions far more efficiently and with real-world-like variety—without the cost of real user data.<br>Outperforms prior LLM and CRS-based recommenders on standard datasets through this interactive, search-based framework.                                     |


## PROACTIVE CONVERSATIONAL AI: A COMPREHENSIVE SURVEY OF ADVANCEMENTS AND OPPORTUNITIES
https://dl.acm.org/doi/10.1145/3715097

### 1. **What’s this paper about in simple terms?**

In this paper, we examine how conversational AI systems (the technology behind chatbots and voice assistants) can become more proactive, rather than just reacting to user instructions. This means, instead of always waiting for a user to say something, the AI figures out when to take the lead—anticipating needs, asking questions, shifting topics, or suggesting actions that benefit the conversation or the user in the long term.

### 2. **Why does this matter?**

Most dialogue systems today are reactive: you say something, they answer. This works for many situations, but it means they often can’t help you as well as a human could. For example, a human assistant might notice you’re frustrated and offer emotional support without being asked or suggest a more efficient solution to your problem before you even know there is one. Introducing proactivity can make dialogue systems more helpful, engaging, and capable of complex interactions, leading us closer to true intelligent assistants.

### 3. **What are the key ideas and definitions?**

We define a proactive dialogue system as one that can plan conversations to achieve goals by taking initiative and anticipating future outcomes, rather than just following what the user wants every time. This definition has three main elements:

- **Anticipation**: The AI tries to predict or plan for future goals or outcomes—like keeping a conversation interesting, making you happy, or completing a task efficiently.
- **Initiative**: The AI chooses the right moment to take action, like changing topics, asking about your preferences, or providing suggestions.
- **Planning**: The AI must organize its actions and conversation flow strategically to achieve the intended goals.

### 4. **What types of dialogue systems do we discuss?**

We categorize dialogue systems into three main types, because proactivity can look different in each:

- **Open-Domain Dialogue Systems (ODDs):** These are chatbots that talk with users about a wide range of topics (think social chatbots). Here, proactivity might involve bringing up new, relevant topics or showing empathy without being prompted.
- **Task-Oriented Dialogue Systems (TODs):** These systems help users complete specific tasks, like booking tickets. Proactivity could mean suggesting better alternatives or asking clarifying questions before a problem arises.
- **Conversational Information-Seeking Systems (CIS):** These systems, such as conversational search engines or recommendation bots, help you find information. Proactivity may mean suggesting follow-up questions, clarifying vague requests, or proactively surfacing information before you ask.

### 5. **How do we study and evaluate proactivity?**

Evaluating proactive systems is more complex than assessing reactive systems because we must consider not only if the AI responds well, but also if it anticipates user needs appropriately and ethically. It involves psychology and sociology since human-AI interactions are nuanced. We discuss the importance of robust evaluation metrics and the ethical considerations, like ensuring that taking initiative does not harm or annoy the user.

### 6. **What’s new in our survey?**

Unlike previous surveys, which mostly focus on reactive dialogue systems, we:

- Provide a clearer, three-part definition of proactivity.
- Refine the taxonomy of proactive problems and offer concrete examples in each type of system.
- Include discussions on emotional support, system-initiated sub-dialogues, and over-specified queries in information-seeking dialogues.
- Analyze the role of large language models (like GPT-3 and beyond) in enabling proactive behaviors.
- Add a maintained list of up-to-date resources for ongoing research in the field.

### 7. **What are the main challenges and future directions?**

There are several open challenges: balancing the benefits and risks of proactivity (as it could be intrusive), building robust evaluation protocols, and developing technical capabilities to support genuine initiative. We also point towards future trends, like integrating larger language models and exploring more advanced planning and reasoning abilities in dialogue systems 3715097.pdf.

### **In summary:**

- Most current AI dialogue systems only respond to what users say.
- Proactive systems aim to take initiative by anticipating, planning, and guiding conversations.
- We provide an in-depth survey that covers the current state, challenges, evaluation, and future directions for making conversational AI more proactive.
- Our work bridges past and emerging research, focusing on the evolution driven by large language models and ethical design

-------

## DISCO: LLM KNOWLEDGE DISTILLATION FOR EFFICIENT SPARSE RETRIEVAL IN CONVERSATIONAL SEARCH
https://dl.acm.org/doi/10.1145/3726302.3729966

![[slides-2.pdf]]

### 1. **The Problem: Conversational Search is Hard**

- Imagine you’re chatting with a smart assistant, asking follow-up questions—the meaning of your questions often depends on everything you’ve said so far.
- Teaching computers to understand these conversations and find the right answers is tricky because each new question isn’t always clear without the full conversation.

### 2. **How is this usually solved?**

- Traditionally, people have used a two-step approach:
    1. Rewrite each question in the conversation (“rewrite”) so it includes all the context clearly.
    2. Use this rewritten version to search for answers (“retrieve”).
- But this approach is slow and can lose information, because mistakes in rewriting cause mistakes in retrieval.

### 3. **Unified Models Are Better but Have Limitations**

- Recently, smarter “unified” models do both rewriting and retrieval together by learning to make better sense of conversations directly.
- These models train by copying the representation (vector) of the “ideal” rewritten question, usually one written by a human or a very smart language model. The student model tries to match its own representation to this “gold” standard.
- But this matching is too strict, as if there’s only one right way to represent the query, which isn’t always the case. It limits what the model can learn.

### 4. **Our Solution: Relax the Goal, Focus on Scores (“DiSCo”)**

- Our main idea with DiSCo is to change what the model learns. Instead of forcing it to copy the exact representation of human rewrites, we care about matching the similarity scores between queries and documents.
- Why similarity scores? Because in search, what ultimately matters is how well the system can match queries (questions) with relevant documents (answers).
- Think of it as grading the model on whether it picks the right documents, rather than on whether it writes the perfect query sentence.

### 5. **The How: Distilling Scores, Not Just Representations**

- We set up a clever learning process (“distillation”): a strong teacher model rewrites the question and finds matching documents. The teacher’s document similarity scores are our gold standard.
- The student model sees the whole conversation and tries to assign the same similarity scores to each document as the teacher did, even if its internal representations differ.
- Mathematically, we do this by distilling the “score distribution” via Kullback-Leibler divergence (a way to measure the difference between two probability distributions).

### 6. **We Use “Sparse” Models (SPLADE)**

- Our models are based on SPLADE, which is a way of representing information so that only a few features (“words”) are active or important at a time. This makes them faster and gives us more flexibility.

### 7. **Hard Negatives: Making Learning Tougher and Smarter**

- We also take advantage of “hard negatives”: challenging examples where the model has to distinguish between very similar (but incorrect) documents. Our new objective naturally lets us incorporate these.

### 8. **Multiple Teachers and Score Aggregation**

- Instead of just one teacher, we can use several teachers (human, different language models), average their scores, and provide richer training signals. This is easy with our approach because we only care about the similarity scores, not the exact rewrite.

### 9. **Measuring Success: Accuracy & Efficiency**

- We test our method on tough conversational datasets (QReCC, TopiOCQA, TREC CAsT, iKAT) and evaluate both effectiveness (does it find the right answers?) and efficiency (is it fast, or does it require lots of expensive model calls?).
- Our model needs fewer slow LLM rewriting steps at inference time, yet still performs at or above state-of-the-art models.

### **In summary:**  
Older models forced student models to be like their teachers in a single, rigid way. We let students be creative, as long as they get the right answers—matching scores is enough! This makes models both more flexible and more efficient, which is better suited for real-world conversational search tasks

------
## CLARIFYING AMBIGUITIES: ON THE ROLE OF AMBIGUITY TYPES IN PROMPTING METHODS FOR CLARIFICATION GENERATION
https://dl.acm.org/doi/10.1145/3726302.3729922

### 1. The Problem: Ambiguity in Information-Seeking Queries

When people search for information—like typing queries into search engines—their questions are often unclear or ambiguous. This ambiguity makes it difficult for systems (like search engines or chatbots) to provide relevant answers. For example, if someone searches for "mirror effect in small room," the system might not know if they're asking about interior design, the physics of mirrors, or something else entirely.

One solution is to ask the user a clarifying question (CQ), like "Are you looking for tips on decorating small rooms with mirrors?" This helps narrow down what the user really wants.

### 2. Existing Approaches and Their Limitations

Previously, most techniques for generating clarifying questions used large language models (LLMs) and prompts that asked the model to "think out loud" using a technique called Chain of Thought (CoT) prompting. This means the model writes out its reasoning before giving an answer, aiming to generate better, more targeted clarifications.

But: These methods often let the model reason freely, without guiding it to consider the exact type of ambiguity the query contains. Humans, on the other hand, are good at first categorizing what type of confusion is present (e.g., is the query too general? too specific? or missing some context?) and then formulating a question accordingly.

### 3. Our Solution: Integrating Ambiguity Types (ATs) with Chain of Thought

We propose a new method called Ambiguity Type-Chain of Thought (AT-CoT). The core idea is:

- First, classify the kind of ambiguity in the user's query. We've built a taxonomy (list) of possible ambiguity types (ATs), which are like "labels" explaining what aspect of the query is unclear (for example: generalize, specify, etc.).
- Next, have the model reason specifically about these ambiguity types before generating a clarifying question.
- Then, generate clarifying questions tailored to the identified ambiguity.

**Example:**  
If someone asks "mirror effect in small room," our method could reason:

- The query could be more specific (about the type of effect or the science behind it).
- Or, the user may actually want more general advice (like interior design).
- Based on this, our system generates questions like "Do you want to know how mirror placement affects brightness?" or "Are you looking for interior design tips?" 3726302.3729922.pdf.

### 4. How We Test Our Method

To prove our approach is better, we set up several tests:

**A. Clarification Generation (CG):** We use datasets with real examples of ambiguous queries and human-written clarifying questions. We compare our model's generated CQs to those written by humans, using a semantic similarity metric called BERTScore (measures meaning similarity) 3726302.3729922.pdf.

**B. Information Retrieval (IR):** We simulate real conversations using those queries and CQs to see if our clarifications help retrieve more relevant documents from large collections (like web pages).

**C. Combined Task (CG+IR):** We analyze how clarification quality (CG) affects the performance of information retrieval (IR), checking if better clarifications really help get better results.

### 5. Results: Why It Matters

**What we found:**

- Our AT-CoT prompting scheme consistently outperformed standard and previous CoT prompts in generating clarifying questions similar to those written by humans.
- When these clarifications are used in actual search or conversation systems, they help retrieve better, more relevant documents.
- We noticed that the model's performance stays strong over multiple conversation turns (back-and-forth exchanges), making it suitable for both quick queries and longer chat sessions 3726302.3729922.pdf.
- There is a strong positive correlation between the quality of clarification generated and improvement in information retrieval results 3726302.3729922.pdf.

### 6. Key Contributions

- We created a taxonomy of ambiguity types that helps guide language models to generate better clarifying questions.
- We designed the AT-CoT prompting method, integrating ambiguity categorization directly into the model's reasoning process, much like how people naturally clarify unclear questions.
- Experiments showed this method is robust and effective across various tasks and datasets 3726302.3729922.pdf.

### 7. Why This is Useful

In summary, our research helps make automated search and dialogue systems smarter at helping users by:

- Recognizing different sources of ambiguity in queries.
- Reasoning about those ambiguities directly.
- Generating more helpful, targeted questions to clarify user needs.

This bridges the gap between how humans clarify ambiguities and how automated systems handle unclear queries

----------

## BEYOND WHOLE DIALOGUE MODELING: CONTEXTUAL DISENTANGLEMENT FOR CONVERSATIONAL RECOMMENDATION
https://dl.acm.org/doi/10.1145/3726302.3729903

### **1. What's the problem?**

In conversational recommendation systems (CRS), the goal is to help users find what they want (like recommending a movie) based on a dialogue between the user and the system. Earlier methods often focus only on specific entities (like a movie or an actor) mentioned by the user. However, this approach can miss the bigger picture: sometimes, users provide useful background context that isn't tied to an entity—for example, _why_ they're watching (say, "with my girlfriend") or their mood. If we ignore this, we can misunderstand what the user really wants and give poor recommendations.

### **2. Why is context so tricky?**

Conversation context is messy: it mixes information _about entities_ (intentions and interests directly related to specific items) with more general _background information_ (circumstances, mood, people involved, etc.). Past methods treated all context as equally important, which prevents the system from understanding what really matters to the user's intent. For example, if a user says they want to watch a movie with their girlfriend and likes Tom Hanks, previous methods might recommend any Tom Hanks movie—even if the background (like wanting a romantic movie) suggests something else would be more appropriate 3726302.3729903.pdf.

### **3. What's our proposed solution?**

We propose a **disentanglement approach**—basically, we first separate the conversation’s _focus information_ (entity-related, e.g., "Tom Hanks," "comedy") from the _background information_ (non-entity, e.g., "with my girlfriend"), then dynamically balance these two according to context. This allows us to better identify the user's main intent and filter out irrelevant details. For instance, our method might decide “La La Land” is a better suggestion than “Cast Away” for the scenario in the example, since it considers the importance of watching a movie with a significant other 3726302.3729903.pdf.

### **4. How do we implement this separation?**

We introduce two self-supervised methods to do this:

- **Contrastive Disentanglement (CD):** We make the representations of focus and background information as different as possible in the model’s internal "space." We use known entity mentions as "proxies"—so, the model is trained to ensure that focus information is closer to these proxy entities, and background is farther apart. This helps the model learn what text is about the focus and what’s just background 3726302.3729903.pdf.
    
- **Counterfactual Inference Disentanglement (CID):** This borrows a concept from "what-if" reasoning. For each recommendation, we ask: if we removed focus or background information, how would the recommendation change? We then check which type of information (focus or background) explains the user's choice more. This gives the model signals for how to separate out the two types of information 3726302.3729903.pdf.
    

### **5. How do we use the separated information?**

Simply splitting focus and background isn't enough—we need to _combine_ them in a smart way for recommendation. So, we introduce an **adaptive prompt learning module:**

- We build a "prompt pool"—combinations of focus and background information with the overall context.
- A "prompt selector" (essentially a small neural network) then dynamically chooses the right mix (prompt) for each user dialogue, weighting focus or background higher depending on the context 3726302.3729903.pdf.

### **6. Does this really work?**

Yes! We compared our method—called DisenCRS—with versions that only use focus or background, or that combine them using fixed weights. The full adaptive version works best. Using only focus or background loses key insights; fixed weights aren’t flexible enough. Our adaptive module dynamically finds the best combination for each conversation, leading to better recommendations 3726302.3729903.pdf.

We also find that the number of prompt combinations in the “prompt pool” matters. Too few, and the model lacks flexibility; too many, and the model gets confused—so there’s a sweet spot 3726302.3729903.pdf.

### **7. Summary:**

Imagine you tell a friend you want to watch a movie, you liked Tom Hanks’ movies, but also that you want to watch _with your girlfriend_. If your friend only pays attention to the “Tom Hanks” part, you’ll get a movie you might like but maybe not one that fits your romantic mood. Our system first figures out _what_ in your message is about movies and actors, and _what_ is about the situation, then smartly decides which kind of information matters more in picking a suggestion. It learns this by comparing lots of conversations and checking which parts mattered most in people’s actual choices. As a result, our recommendations better fit what you _really_ want

---------
## MSCRS: MULTI-MODAL SEMANTIC GRAPH PROMPT LEARNING FRAMEWORK FOR CONVERSATIONAL RECOMMENDER SYSTEMS
https://dl.acm.org/doi/10.1145/3726302.3730040

### **1. What Problem Are We Solving?**

Imagine you’re chatting with a smart assistant about movies. You might ask for movie recommendations or discuss what you liked about a recent film. The assistant should respond smoothly, understand the context, make good suggestions, and keep the conversation going naturally.

Traditional conversational recommender systems (CRSs) struggle with two main problems:

- **Limited Understanding of Items:** Items (like movies) have many aspects—text descriptions, images, relationships with other movies, etc.—but most models use just one kind of information or combine them too simply.
- **Disjointed Recommendations and Conversations:** Many systems treat recommending items and generating dialogue as separate tasks and rarely integrate the deep, nuanced connections between movie content and user preferences.

### **2. What’s Our Solution? The MSCRS Framework**

We built a new system called **MSCRS** (Multi-modal Semantic Graph Prompt Learning Framework). This is a mouthful, but let’s break it down:

- **Multi-modal**: We use different types of information—text, images, and knowledge graphs (think of these as webs showing how movies and concepts connect).
- **Semantic Graph**: We model relationships among movies and their features as graphs, where nodes are movies/entities and edges show meaningful connections.
- **Prompt Learning**: We design special “prompts” (instructions or contexts) that help a large language model (like GPT or DialogGPT) process and generate recommendations and conversations in a unified way.

### **3. How Does It Work, Step by Step?**

Let’s walk through what happens when a user interacts with MSCRS:

**a) Representing Movie Information in Depth**

- **Text Features**: For each movie, we create rich text descriptions using a large language model (like GPT-4o). These cover themes, emotions, cultural impact, and summary.
- **Image Features**: We collect several still images for each movie from IMDb, then use a vision model (ViT) to extract key visual features.
- **Knowledge Graph Features**: We use a Relational Graph Convolutional Network (R-GCN) to map out how movies and related entities (like actors, genres, etc.) connect.

**b) Building and Fusing Semantic Graphs**

- **Collaborative Semantic Graph**: This captures how movies/entities are mentioned together in conversations—a sign that users connect them in their minds.
- **Textual and Image Semantic Graphs**: We calculate how similar movies are in text and visual space, then keep only the strongest connections (using a method like k-NN to pick the closest friends).
- **Fusion**: All these graphs together create a rich web of relationships—each offers a different view of what makes items similar or relevant.

**c) Using Prompts for Unified Learning**

Instead of separating recommendation and conversation, we use carefully crafted prompts. These prompts provide context that the language model can follow to both make recommendations and carry on conversations, leveraging the fused multi-modal graph representations.

### **4. What Makes This Approach Special?**

- **Joint Learning**: Our method doesn’t separate recommendation and conversation—it uses one mechanism (prompt learning) for both, ensuring they inform each other naturally.
- **Multi-modal, Multi-level Connections**: We don’t just glue together different types of data; we model rich, graph-based relationships at several levels (text, image, co-occurrence).
- **Self-contained and Robust**: By leveraging the strengths of language and vision models and grounding them in robust graph structures, we improve both the quality of recommendations and the coherence of conversations.

### **5. What’s the Proof?**

We tested our system (MSCRS) on two benchmark conversation datasets (ReDial and INSPIRED) and found:

- Our method achieved state-of-the-art performance for both recommending relevant movies (Recall@k, NDCG@k, MRR@k) and generating engaging, coherent responses (measured by BLEU, ROUGE, and human judges).
- Ablation studies showed both the multi-modal semantic graph and the correlation mapping modules were crucial—removing them led to strong drops in quality, which further validates our design choices.
- Careful tuning (like choosing how many connections to keep in each graph and how to blend the text/image information) made a clear difference in real-world performance 3726302.3730040.pdf.

### **6. An Analogy to Summarize**

Think of MSCRS as a movie expert who:

- Reads deeply about every film,
- Looks through a gallery of iconic scenes,
- Understands how movies relate to each other in culture and conversation,
- And is great at giving advice and chatting about movies in a way that naturally fits your interests, all in one unified brain.

By building a rich, multi-modal “mental map” and integrating it fluidly into conversation, our system interacts more like a real, knowledgeable person and less like a blunt algorithm.

That’s the core idea of our paper: _Teach a conversational system to see, read, and infer like a human, making it a better chat partner and a smarter recommender_

---------

## ACTION FIRST: LEVERAGING PREFERENCE-AWARE ACTIONS FOR MORE EFFECTIVE DECISION-MAKING IN INTERACTIVE RECOMMENDER SYSTEMS
https://dl.acm.org/doi/10.1145/3726302.3729885

### What Is This Paper About?

Imagine you’re using an online recommendation system—say, for movies. You have a conversation with it, and you mention that you like “something intense with a psychological twist and action-packed moments.” The goal of this paper is to build a system that can understand your actual desires better and recommend the most relevant items (like movies) to you, even as you change your mind or clarify your preferences in conversation.

Current systems have two big problems:

- Traditional recommendation tools work with structured, fixed attributes (like “genre: action”), but real user preferences are often vague or not exactly matching those.
- Large language models (LLMs) are great at understanding natural language, but they can’t handle huge databases of items all at once because of limitations on how much data (context) they can process.

### What’s the New Solution?

We propose a new interactive recommendation system called “Action-First Interactive Recommendation System (AF-IRS)” that tightly integrates LLMs and external recommenders in a **bidirectional loop** rather than the usual one-way flow.

#### Main Components

Let’s break it down:

#### 1. **Preference Tree Construction**

We use LLMs to build a hierarchical “preference tree.” This means we organize all possible movie attributes (like “genre,” “audience,” “release date”) in levels: broad categories at the top to more specific categories at the bottom. For example:

- Genre
    - Action
        - Superhero
        - Adventure
    - Thriller
    - Mystery

This tree allows the system to understand both general and specific user preferences flexibly, even if the user says something less structured like “movies that feel fresh” 3726302.3729885.pdf.

#### 2. **Session Preference Extraction**

As you chat, the system maps your responses to the nodes of this preference tree. For each turn in the conversation, it picks the most relevant preferences you express and combines them (e.g., “adventure” + “psychological”). This refined preference set then becomes the guide for searching items 3726302.3729885.pdf.

#### 3. **Two-Stage Filtering in External Recommendation Tools**

After extracting your session preferences, these are given to external recommenders, which handle the massive database of items. They filter items in two stages:

- **Preference-based filtering:** Selects items that match your current session preferences.
- **Collaboration-based filtering:** Looks at your historical behaviors (like previous movies you enjoyed) using techniques like cosine similarity on user/item embeddings, to refine the item set further. The resulting list is now much smaller and more likely to fit your needs 3726302.3729885.pdf.

#### 4. **Preference-Aware Refinement**

The LLM takes this narrowed-down list and, using its natural language understanding, re-evaluates how well each item matches your broader, structured preferences, further refining the list 3726302.3729885.pdf.

#### 5. **Decision Stage (Action-Aware Decision Making)**

Now, instead of making recommendations immediately, the system uses another LLM-powered module to decide:

- If it’s confident the items fit your preferences based on the conversation so far, it recommends them.
- If not, it generates a targeted question to clarify your preferences further. This continuous loop ensures high-quality, personalized recommendations and reduces the chances of suggesting irrelevant items 3726302.3729885.pdf.

### How Does This Approach Help?

- **Flexibility:** By using a preference tree and LLMs, the system interprets nuanced, evolving user input, not just rigid categories.
- **Efficiency and Relevance:** By combining the strengths of LLMs (language understanding) with recommenders (large-scale filtering), it quickly hones in on the most relevant items.
- **Interactive Improvement:** If the system is unsure, it doesn’t settle for poor recommendations—it asks you a smart question to get even better input.

### Summary

This paper introduces a new way to make recommendations by putting “actions” (candidate selection) ahead of “decisions” (what to recommend or what to clarify), using the strengths of both LLMs and external recommendation engines. The result is a more conversational, user-centered, and accurate recommendation system that learns and adapts as you talk to it

---------
## BRIDGING THE GAP: FROM AD-HOC TO PROACTIVE SEARCH IN CONVERSATIONS
https://dl.acm.org/doi/10.1145/3726302.3729915

### **1. What’s the main problem?**

When you chat with a search system (like a chatbot or digital assistant), sometimes you don’t ask direct questions, but you mention things or discuss topics. In a normal setting, search systems wait for you to pose a clear query, then try to find an answer ("query–response" paradigm). But often, you might need information you didn’t think to ask directly, or you mention something that could be clarified with just a bit of context.

**Proactive Search in Conversations (PSC)** is a new approach: here, the system tries to anticipate your needs. Instead of waiting for a clear question, it looks at the conversation as it unfolds and finds documents that might help—even if you didn’t ask for them directly. This can either clarify things you talk about (conversation contextualisation) or predict what you might be interested in next (interest anticipation) 3726302.3729915.pdf.

### **2. What’s the challenge?**

Current search systems are trained with short, direct queries—think of the questions you type into Google or a search box. But in conversation, what you say might be longer, less focused, or filled with context and chit-chat. If we feed this conversational text directly into the search engine, especially neural retrievers pre-trained on short queries, performance drops, because the inputs look quite different from what the model learned during training 3726302.3729915.pdf.

Even if we try to fine-tune these models on conversational data, there’s still a mismatch: models expect short queries, but we give them long, messy conversation snippets.

So, **the core issue is a gap between the data the models were trained on, and the new data we want them to handle**.

### **3. What’s our solution?**

We introduce a method called **Conv2Query** to bridge this gap.

Here’s the intuition: **Instead of feeding the whole conversation into the retriever, let’s learn to convert conversation snippets into concise, effective ad-hoc queries**, similar to those the search engines are used to. We do this in several steps:

- **Phase 1: Generate possible queries from documents.**  
    For each document known to be relevant at a conversation turn, we use a special model (Doc2Query) to generate a set of possible questions that people might ask to retrieve this document—imagine, for an article about "Staffordshire oatcake," generating queries like "What is a Staffs oatcake?"
    
- **Phase 2: Filter these queries to match the conversation.**  
    Not every query fits the current conversation. So, we use a filtering step that scores how well each generated query matches both the document and the conversation at hand. We keep the query that scores best—this is now a learning target for our system.
    
- **Phase 3: Train Conv2Query.**  
    We train a model to map conversational context to these filtered, concise queries. The model learns to "translate" chatty conversation into effective search queries.
    
- **Phase 4: Use this at inference time.**  
    When the system is deployed, given a new conversation snippet, it generates a concise query using our trained model. This query is then sent to a retriever (which is much happier now, since it’s seeing familiar style queries again).
    
- **Phase 5 (optional): Fine-tune the retriever.**  
    We can further improve things by fine-tuning the neural retriever with these filtered queries, letting it become even better at matching queries to relevant documents 3726302.3729915.pdf.
    

### **4. Why does this work?**

By converting conversations to effective queries, we:

- Reduce the input mismatch between training (short queries) and test time (long conversations).
- Allow the retriever to use its existing knowledge much more effectively.
- Enable proactive, contextual retrieval of relevant documents in conversational settings.

We show experimentally this process leads to better retrieval quality, especially when our query filtering step considers _both_document relevance and conversational fit. This step is critical: without it, learning is slower and quality is worse 3726302.3729915.pdf.

### **5. How did we evaluate it?**

We compared different settings:

- Feeding conversation directly (no conversion).
- Generating queries, but not filtering carefully.
- Our approach: generate and carefully filter queries.

We measure how often the system retrieves the correct document at the top of the list, using metrics like Precision@1 and MRR@10 3726302.3729915.pdf.

Our approach consistently outperforms baselines, showing the importance of bridging the input gap with our query conversion and filtering.

### **6. In summary**

- PSC aims to proactively retrieve useful information in conversations, without needing explicit queries.
- Existing systems struggle because conversational input is messy compared to what they are trained on.
- Our method, Conv2Query, learns to convert conversations into effective queries, bridging the gap.
- Careful filtering of which queries to use as training targets is key.
- Experiments confirm Conv2Query boosts retrieval effectiveness in conversational settings 3726302.3729915.pdf.

If you had to teach this to a friend: **The cool part is not just matching conversations to documents, but learning to ask the right search question on the user's behalf, so the system can help even when you don’t know what to ask next!**

---------

## SEARCH-BASED INTERACTION FOR CONVERSATION RECOMMENDATION VIA GENERATIVE REWARD MODEL BASED SIMULATED USER
https://dl.acm.org/doi/10.1145/3726302.3730080

### **What’s the Problem?** 
The paper is about making conversational recommender systems (CRSs)—systems that chat with you and recommend things, like movies—work better. The challenge is: CRSs rely on feedback from real users to get better, but collecting that feedback is slow, expensive, and can lack detail. So, how can we create a more effective feedback process to improve recommendations, especially using large language models (LLMs) as the brains of these systems?

### **What’s the Main Idea?** 
We introduce a “simulated user” built from an LLM (a big, powerful AI language model). This simulated user can give feedback to the CRS, just like a real person would, but is always available, consistent, and can provide more detailed and useful feedback. This feedback isn’t just “I like it” or “I don’t;” it can also critique specific elements (like asking for more movies with a certain actor or genre).

### **How Does the Simulated User Work?** 
The simulated user shows two main behaviors:

1. **Attribute-based Critiquing**: If shown recommendations, it can provide natural, specific feedback, e.g., “I’d like more comedies,” or “This movie is too scary for me.”
2. **Generative Item Scoring**: For every recommended item, it decides if it’s a good fit by answering “Accept the item? Yes/No,” and provides a probability score. For instance, for two horror movies recommended to a user who prefers comedy, it might answer “No” with high probability for both.

To teach the LLM how to do this, we create special training data. This data has:

- The conversation so far,
- The list of items recommended with their attributes,
- (Sometimes) The real user’s preferences, to guide the “simulated feedback.”

We then fine-tune the LLM using these examples, so it learns to provide useful critiques and scoring just like a human might in a conversation.

### **How Do We Use the Simulated User?** 
We set up an interaction loop:

- The CRS makes a recommendation based on the conversation.
- The simulated user gives feedback (critiquing and/or item-level acceptance).
- The CRS uses that feedback to refine its recommendations.
- This process repeats for several rounds (think of it like a conversation over several turns).

We model this process like a search problem: each round is a “state,” the CRS generates recommendations (“actions”), and the simulated user provides feedback (“rewards”). We use a search algorithm (beam search) to generate and refine candidate lists of recommendations, always choosing the top ones based on the simulated user’s scoring.

Finally, to pick what to recommend, we rank all possible items from all candidate lists, based on their individual scores (already computed during the feedback steps), and select the best ones for the user.

### **How Did We Test This?** 
We tried this method out on two well-known conversational recommendation datasets: ReDial (lots of movie chat data) and INSPIRED (a smaller version, also movies). We compared our approach to several strong baselines, like other LLM-based recommenders (Llama-3, Phi-4, GPT-4o) and specialized CRS models.

The simulated user’s two feedback styles led to more useful guidance for the CRS, allowing it to make better recommendations across multiple evaluation metrics.

### **In Summary**

- The paper proposes using an LLM-based simulated user to provide nuanced feedback for conversational recommendations.
- This simulated user can critique with detail and score recommendations generatively.
- Training involves synthesizing scenarios for the simulated user to learn from.
- The process is designed as an interactive, search-based loop where the CRS learns to improve its recommendations efficiently.
- Experiments show this leads to better performance than traditional user feedback or other baselines.

If you were to teach this to someone else, think of it as building a really smart “practice user” who helps train recommender robots, making the robots much better before exposing them to real people—and doing it faster, cheaper, and in more detail than relying on human volunteers ever could