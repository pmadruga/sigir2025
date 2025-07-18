
## Overview

| Paper & Link                                                                                                                                                                                       | Problem Addressed & Summary                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A Reproducibility Study of Graph-Based Legal Case Retrieval**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730282)                                                                          | Assesses if the CaseLink method—using graph neural networks for legal case retrieval—is truly reproducible across datasets and model updates.<br>Finds that duplicating published results is hard due to code complexity and model volatility, and that success varies by dataset.<br>Shows that open-source models and richer graph representations can help reproducibility and reliability in legal AI. |
| **ReARTeR: Retrieval-Augmented Reasoning with Trustworthy Process Rewarding**<br>[Link](https://dl.acm.org/doi/pdf/10.1145/3726302.3730102)                                                        | Aims to improve multi-step reasoning in RAG systems by giving feedback (scores and explanations) at each reasoning step, not just the end.<br>Uses balanced data and simulation-based learning to teach models not just "what" is right, but "why." <br>Leads to more interpretable, transparent, and robust complex reasoning for LLM assistants.                                                         |
| **Unveiling Knowledge Utilization Mechanisms in LLM-based Retrieval-Augmented Generation**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=c058f544c737782deacefa532d9add4c) | Explores *how* LLMs combine internal memory and retrieved info in RAG.<br>Breaks down knowledge flow across model layers, showing distinct stages and the special roles of MLP and attention modules.<br>Offers actionable insights for controlling and improving RAG by understanding its info integration.                                                                                               |
| **Robust Fine-Tuning for Retrieval Augmented Generation Against Retrieval Defects**<br>[Link](https://sigir2025.dei.unipd.it/detailed-program/paper?paper=00ec53c4682d36f5c4359f4ae7bd7ba1)        | Focuses on RAG’s weakness when retrieval brings back noise, irrelevance, or misinformation.<br>Proposes a fine-tuning process for LLMs to detect and ignore bad content, maintaining answer quality even with flawed retrieved input.<br>Dramatically improves robustness—especially in practical, error-prone retrieval scenarios.                                                                        |
| **Predicting RAG Performance for Text Completion**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730062)                                                                                       | Investigates if we can forecast RAG’s benefit or harm for a given completion before running the model.<br>Tests classic and novel metrics, finding RAG-specific predictors (that consider both prompt and retrieval) work best.<br>Enables smarter, more efficient use of RAG by skipping it when it’s unlikely to help.                                                                                   |
| **Retrieval Augmented Generation with Collaborative Filtering for Personalized Text Generation**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730075)                                         | Solves the problem of true personalization in RAG by leveraging not just a user’s history, but also those of similar users (neighbors).<br>Uses collaborative filtering to fetch, rank, and LLM-tune relevant docs for each person.<br>Leads to more accurate and tailored generated outputs across benchmarks.                                                                                            |
| **Knowing You Don’t Know: Learning When to Continue Search in Multi-Round RAG Through Self-Practicing**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730018)                                  | Tackles knowing when a multi-step RAG system has enough info to answer, or should keep searching.<br>Presents SIM-RAG: an independent, self-trained Critic judges answer sufficiency at each step using self-generated practice data.<br>Results in more reliable, confident multi-round answering with less supervision.                                                                                  |
| **CIRAG: Retrieval-Augmented Language Model with Collective Intelligence**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3729921)                                                               | Combats RAG hallucination and info overload using a “wisdom of crowds” strategy.<br>Dynamically extracts entities from questions, retrieves per-entity evidence, filters by frequency and semantic relevance, then fuses it.<br>This collective process boosts accuracy and factuality in LLM answers, especially for complex queries.                                                                     |

-------

## A Reproducibility Study of Graph-Based Legal Case Retrieval
https://dl.acm.org/doi/10.1145/3726302.3730282

Imagine you are a lawyer trying to find previous legal cases similar to the one you’re working on. This is called **legal case retrieval**, and it’s crucial for making good legal arguments. Traditionally, computers help with this by comparing the words in case texts using language models (like special algorithms trained on legal documents). But recently, researchers noticed that we can improve this by also looking at how cases relate to each other, not just their words.

###  **CaseLink: A New Approach** 
Recently, a method called **CaseLink** was introduced. Instead of looking at each legal case alone, CaseLink builds a **graph**: think of every case as a point (node), with lines (edges) connecting them when they're related—like when one case references another or shares a legal charge. This graph is then processed by a type of AI called a **graph neural network (GNN)**, which can uncover meaningful connections not obvious from the text alone.

### **Why Our Study?** 
But there’s a problem: when new research like this comes out, other scientists sometimes struggle to get the same results when they try to redo the experiments (that’s called a **reproducibility crisis**). This could be due to missing details, code no longer working, or changes in AI models. Our paper focuses on rigorously testing whether CaseLink's results can be reproduced, and whether its approach really works well on different, newer datasets.

### **Our Research Steps**

1. **Reproduce CaseLink’s Original Results**  
    We tried to get the same results as the original CaseLink paper by repeating their experiments on datasets from two years of a legal competition (COLIEE 2022 and 2023). We ran into several hurdles, like issues with code spread across multiple repositories and out-of-date AI models. Even after sorting these out, our results were quite different from the original numbers—even though we followed the setup as closely as possible.
    
2. **Test on New Data**  
    We also tested the method on an even newer dataset (COLIEE 2024) to see if its performance holds up over time. We found that while CaseLink did better than on the previous year's data, it still didn’t match its performance from two years ago. This suggests the method isn’t consistently great—its success seems to depend on the dataset.
    
3. **Try Better Graph Representations**  
    The original method treated every node and edge type in the graph the same (homogeneous). We experimented with a richer graph structure (heterogeneous), where edges and nodes could represent different things (like cases vs. legal charges, different types of relationships). We wanted to see if this led to better performance.
    
4. **Swap Closed AI Models for Open Ones**  
    The original method used a commercial AI model (GPT-3.5) that is accessed through a company and can change or disappear anytime. For reproducibility, we swapped it for an open model (Llama-3.1), which anyone can use freely, to see how that affected results and if the system becomes more robust in the long run.
    

### **What Did We Learn?**

- **Reproducibility is Hard:** Even when following instructions and having access to code, it’s challenging to exactly reproduce others’ results, especially when commercial tools (like GPT-3.5) change or are discontinued.
- **Generalizability is Limited:** Performance can change a lot depending on the dataset and details of the experimental setup.
- **Open and Richer Methods Help:** Using open AI models and more detailed graph representations can aid in reproducibility and might, in some cases, improve performance.

### **Why does this matter?** 
For researchers and practitioners in the legal field, this work:

- Raises awareness that published AI results are not always easy to repeat or trust.
- Shares all our code and setups to make it easier for others to build on our findings.
- Suggests directions for future work: focusing on reproducible methods and richer representations of legal data.

### **In Short:**  
We tested a promising new AI method for finding related legal cases, found it’s not as reproducible or consistently strong as originally claimed, and explored ways to improve both its reliability and transparency for the legal and research communities

--------------

## ReARTeR: Retrieval-Augmented Reasoning with Trustworthy Process Rewarding
https://dl.acm.org/doi/pdf/10.1145/3726302.3730102

### **1. What Problem Are We Solving?**

Imagine you have a very smart assistant (a Large Language Model, or LLM) that tries to answer tricky questions by reading many documents (this is called Retrieval-Augmented Generation, or RAG). When the questions are complex, the assistant doesn't just give a one-shot answer but tries to "think" in steps, breaking the problem down and reasoning step by step. This is like solving a mystery by asking smaller related questions and using clues from different sources.

However, even with these fancy assistants, several problems pop up:

- The assistant might make mistakes but not explain why, giving only a simple score for each reasoning step.
- Sometimes it gets better at evaluating steps near the end of its reasoning but struggles with the early steps (a problem we call "early-step bias").
- The data used to train these evaluators is sometimes unbalanced, so the model might struggle to identify bad reasoning steps, especially in hard problems.
- There’s not enough smart feedback during training—so even if we use powerful machines, they’re not learning to explain or optimize their reasoning process properly.

### **2. The Core Idea (Our Solution):**

We designed a "framework" called ReARTeR ("Retrieval-Augmented Reasoning through Trustworthy Process Rewarding") which aims to make these assistants better at complex, step-by-step reasoning. Here’s how:

- We give feedback to the assistant at every step, not just at the end.
- We provide not only a score (like "this is good" or "this is bad") for each step, but also a natural language explanation, so we can see why a particular step might be wrong or need refinement.
- We improve how we collect and balance the training data, so our evaluator learns more robustly and fairly.
- We use smarter, simulation-based techniques to reduce early-step bias—so the assistant learns to judge its first steps better, not just the last ones.

### **3. The Main Pieces of the System:**

Let’s break it into ingredients like a recipe:

- **Process Reward Model (PRM):** This acts like a teacher who scores each step of your reasoning path. If the step takes you closer to the correct answer, you get a higher score.
- **Process Explanation Model (PEM):** This is the teacher’s note in plain language, saying why a step was good or bad—like, “You misinterpreted the question here!”
- **Data Collection and Training:** We don’t just collect random examples. We use smarter strategies like Monte Carlo Tree Search (think of simulating different outcomes in a game to see which moves are good or bad) and align our explanations (PEM) and scoring (PRM) so they reinforce each other.
- **Temporal Difference (TD) Lookahead:** Instead of scoring a step based only on what happens immediately after, we simulate a few steps ahead to see if this early decision might pay off down the line. It’s like playing chess and not just thinking about your next move, but the several moves that follow.

### **4. How Does ReARTeR Work in Practice?**

- During **training**, we simulate different ways to reason through a question. At every step, we check: Did this step help or hurt? We record the scores, explanations, and refine our models.
- If a step is improved after receiving an explanation, we treat this as a positive example, and if not, as negative. This "off-policy" preference learning helps us make the explanations and scores match up—an explanation that leads to better reasoning gets reinforced.
- During **real use (test time)**, when the assistant faces a new question, it uses the PRM to pick the next best reasoning step and the PEM to generate an explanation. If the reasoning process gets stuck or falters, the explanation guides it to refine its approach.

### **5. Why Is This Better?**

- Previous systems either didn’t explain their decisions ("You’re wrong!" but not "Here’s why") or only provided end-result evaluations.
- By integrating explanations and scores, and optimizing both training and inference (test-time), our system can correct itself more effectively, especially on difficult, multi-step reasoning problems.
- We specifically tackle the challenges of bias—balancing the training examples, fixing misalignment between score and explanation, and handling the tough early steps in a complex problem.

### **6. What Did We Find?**

- Our experiments on established multi-step reasoning tests showed that ReARTeR makes the assistant smarter: it not only reasons better, but also gives more helpful feedback at each step.
- The improvements show up both when training the system and when it runs on new, unseen problems.

### **Summary in Simple Terms:**

We teach smart assistants to think through tough questions, giving them both scores and explanations at every step, and train them in smarter ways. Like a math teacher who not only tells you if your solution is right but also explains where you messed up and helps you fix it, our system makes the assistant better and more trustworthy at step-by-step problem-solving and explaining its reasoning. This means fewer mistakes, more transparent answers, and smarter helpers for complex tasks

--------------

## Unveiling Knowledge Utilization Mechanisms in LLM-based Retrieval-Augmented Generation
https://sigir2025.dei.unipd.it/detailed-program/paper?paper=c058f544c737782deacefa532d9add4c

Imagine you have a very smart computer program called a large language model (LLM)—like ChatGPT or similar systems—which can answer questions, generate text, and assist with tasks. These LLMs have learned a massive amount while being trained on internet text, but they're not perfect: sometimes, they get facts wrong, especially about recent events or specialized topics. That's because they rely on “parametric knowledge”—information stored in their vast web of learned patterns, but which can go stale or be too general.

To fix this, we use a method called retrieval-augmented generation (RAG). Think of RAG as a way to help these models look up new or specific information from a library (an external knowledge base) in real time, then use that info to answer questions or generate better text. Instead of relying only on memory, the model can supplement itself with fresh material—like a student looking up facts in a textbook during an exam. This approach makes LLMs more reliable, up-to-date, and transparent 3726302.3730112.pdf.

Even though RAG works well, there’s still a puzzle: how, exactly, do these LLMs use the retrieved information together with their own memory? What’s happening “in their heads” as they combine what they know with what they look up? Most past research just measured whether RAG improved answers, but didn’t dive into the mechanics.

Our paper tries to uncover those hidden mechanisms. We studied, in detail, how LLMs process both their internal knowledge and the new, external information they retrieve. We looked from two angles:

1. The “big picture” (macroscopic) view: How does knowledge “flow” through the layers of the model?
2. The “microscopic” view: What are the specific roles of the pieces inside the model – namely, the multi-head attention (MHA) and multi-layer perceptron (MLP) modules – in picking and mixing knowledge sources?

### **1. Big Picture: The Four Stages of Knowledge Streaming**

Imagine RAG as a system with incoming streams of information. Our research found that, as information moves through the layers of an LLM, the model uses both internal and external knowledge in four main stages:

- **Knowledge Refinement:** Early on, the model closely combines the query (the question) with the context (the retrieved info), refining its understanding of what the external text means for the task.
- **Knowledge Elicitation:** The model integrates the external info into its representation of the query—basically, updating what it thinks the user is really asking, in light of what it’s found.
- **Knowledge Expression:** In the middle-to-deep layers, the model starts using both its own stored knowledge and the retrieved information to shape its answer.
- **Knowledge Contestation:** Near the end, the model “debates” between internal and external knowledge, deciding how much to use from each source while composing the final output. Sometimes, if there’s a mismatch (like a retrieved fact that conflicts with its own memory), this contestation is especially visible 3726302.3730112.pdf.

We measured how “strongly” different types of knowledge were being used by tracking the information flow through the model’s layers and across its modules. We even tested what happened when we fed in incorrect (fake) passages to see how the model’s processing would change.

### **2. Microscopic View: Role of Modules (MHA and MLP)**

Inside a Transformer (the architecture behind LLMs), there are two main module types:

- **Multi-Head Attention (MHA):** Think of this as the model’s way of “paying attention” to different parts of the input—matching up relevant pieces of the query and the passage.
- **Multi-Layer Perceptron (MLP):** These layers do more general processing and transformation of information.

We discovered that both MHA and MLP play distinct and complementary roles in mixing knowledge:

- The MLP module is particularly sensitive to whether the external information is correct. If you swap a genuinely helpful passage for a fake one, the MLP’s contribution to using external knowledge drops noticeably.
- The MHA module’s behavior remains steadier regardless of whether external information is true or false.
- We could even manipulate the model’s reliance on internal vs. external knowledge by “turning off” (deactivating) specific neurons associated with each type—sort of like pausing specific mental processes in the brain 3726302.3730112.pdf.

### **Why does this matter?**

By studying these processes, we provide new tools for building LLM systems where you can better control—or at least understand—how much they trust their own knowledge versus what they find externally. This insight helps debug, interpret, and improve LLM performance for sensitive or specialized applications.

### **Summary**

- Large language models can be improved with retrieval-augmented generation (RAG), which brings in external information.
- We mapped how knowledge “streams” through such models in four stages: refinement, elicitation, expression, and contestation.
- At the micro-level, the MLP module is more responsive to external information's quality than MHA is.
- Our findings help make LLMs more controllable and understandable for advanced AI tasks

-------------
## ROBUST FINE-TUNING FOR RETRIEVAL AUGMENTED GENERATION AGAINST RETRIEVAL DEFECTS
https://sigir2025.dei.unipd.it/detailed-program/paper?paper=00ec53c4682d36f5c4359f4ae7bd7ba1

#### **Purpose:**

Our paper addresses a big challenge faced by Retrieval-Augmented Generation (RAG) systems, which combine large language models (LLMs) with external document retrieval to answer questions. In practice, the documents retrieved aren't always perfect—they might be only loosely related, outright wrong, or even misleading. These problems seriously reduce the reliability of RAG systems. Our core goal is to make RAG systems more robust, so they keep working well even when the retrieved information is noisy or flawed.

#### **Background—How RAG Works:**

In a standard RAG system:

1. There’s a “retriever,” which searches a big collection of documents and finds the ones most relevant to a user’s question.
2. There’s a “generator” (the LLM), which uses the question plus those retrieved documents to generate an answer.

The problem is, the quality of the generated answer depends heavily on the quality of the documents returned by the retriever. If those documents are bad—irrelevant, noisy, or false—the answer will likely be bad too.

#### **Retrieval Defects—What Goes Wrong:**

We classify bad retrieved documents (“retrieval defects”) into three main types:

- **Noisy documents:** These are related to the topic but don't answer the specific question.
- **Irrelevant documents:** These don’t relate to the question at all—imagine asking about Pink Floyd and getting info about Nirvana.
- **Counterfactual documents:** These contain outright false or misleading information—like saying a Pink Floyd song appears on the wrong album.

Our experiments show that even a small fraction of these defective documents in the input can make RAG systems much less accurate—sometimes dropping performance by over 60% depending on the type of defect and severity 3726302.3730078.pdf.

#### **Our Solution—Robust Fine-Tuning (RbFT):**

Instead of only making the retriever better (which is hard and not always possible), we focus on making the LLM itself smarter and more resistant to bad input. We train (fine-tune) the LLM with specialised tasks so it can:

1. **Detect which documents are helpful and which are defective** (Defect Detection Task).
2. **Extract and use only the useful information** from all input, ignoring bad info (Utility Extraction Task).

This way, even if its input contains bad or noisy text, the LLM can spot the problems and generate the right answer anyway.

#### **Implementation—How We Train the System:**

- We use two strong LLMs (Llama and Qwen) and fine-tune them on two tasks:
    - **Defect Detection:** The LLM gets a list of documents and identifies which are helpful, which are noisy, irrelevant, or contain falsehoods.
    - **Utility Extraction:** The LLM answers questions using retrieved documents that may include some defective ones, and it’s rewarded for producing correct answers despite that.
- During training, we deliberately introduce bad documents with varying probabilities (from none to all), so the model experiences a wide range of real-world scenarios.
- We use established datasets (Natural Questions, HotpotQA, TriviaQA) and compare our method to strong existing baselines 3726302.3730078.pdf.

#### **Results—Does It Work?**

Yes, and very well:

- **Clean Setting:** Even when all retrieved documents are good, our method (RbFT) can slightly _improve_ over standard RAG.
- **Normal/Hard Settings:** When some or all input documents are defective, RbFT greatly outperforms all other methods, showing much higher accuracy and stability—for example, up to 37% better exact match scores than the next best approach in the hardest scenarios 3726302.3730078.pdf.

#### **Key Takeaways and Analogy**

Think of vanilla RAG like a student who copies from whatever sources the library gives them—if the library gives junk, the answers are junk. RbFT is like teaching the student to spot bad sources, ignore them, and rely on their own reasoning and cross-referencing skills, so even if half the library is wrong, the student still gets the answer right.

#### **Conclusion**

RAG systems are only as strong as their weakest link. By focusing on making the LLM resilient to poor retrieved input, not just trusting the retriever, we build RAG systems that perform reliably—even when, inevitably, retrieval goes wrong. This is a step towards making LLM-powered applications more robust and trustworthy in the real world

------------
## Predicting RAG Performance for Text Completion
https://dl.acm.org/doi/10.1145/3726302.3730062

#### What’s the Big Question We’re Trying to Answer?

When using large language models (LLMs), sometimes we help them by first retrieving relevant information from a big pile of documents before asking the model to generate a completion or an answer. This process is known as Retrieval-Augmented Generation, or **RAG**. The main question our paper addresses is: **Can we predict in advance whether using RAG will actually help the language model perform better for a specific text completion, or if it might hurt or not change the performance at all?**

Why does this matter? Sometimes giving an LLM extra information helps, but at other times it can make things worse by distracting the model or giving it irrelevant data. If we can predict when RAG will help, we can save time, resources, and improve the quality of model outputs.

#### Our Approach, Step-by-Step

##### 1. **Defining Effectiveness**

First, we needed a way to measure how much RAG helps. We do this by comparing the model’s probability of generating the correct next word (or token) in two settings:

- With RAG (using a retrieved passage)
- Without RAG (just the original prompt)

For each, we look at the probability the model assigns to the correct next token, and we use something called **perplexity**(basically, how "surprised" the model is by the correct token). Our measure of "gain" is the log difference between these probabilities. So, if using RAG makes the model more confident (less surprised) about the next token, the gain is positive 3726302.3730062.pdf.

##### 2. **Prediction Task**

The main task is: **Can we predict this gain before actually generating the token with the model?** In practice, we don’t know the actual next token when we want to make the prediction—so we need to figure out ways to estimate whether using RAG will likely help or not, given only the inputs (the prompt, and retrieved passages).

#### **Prediction Methods**

We experimented with several ways to predict RAG’s usefulness, inspired by ideas from information retrieval (search engines) and developed some new methods specifically for RAG:

##### **A. Pre-Retrieval Predictors**

These methods look only at the query (what you’re looking for) before any documents are retrieved. For example:

- **SCQ**: Looks at how "important" the words in your query are based on statistics from the whole document collection.
- **IDF**: Checks if the query terms are rare (and thus more likely to be useful when found).
- **VAR**: Measures how much the importance of a query word varies across the collection 3726302.3730062.pdf.

##### **B. Post-Retrieval Predictors**

These look at the set of passages returned by the search system.

- **WIG**: Compares the top retrieved passages’ scores to the average score of the whole collection—if the top passages stand out, retrieval is probably good.
- **NQC**: Looks at how much the top retrieval scores vary; more variation may mean better retrieval.
- **REF**: Compares your retrieval results to a "reference" result list using similarity measures.
- **BERT-QPP**: Uses a neural network to model the relationship between the query and retrieved passages, trained to predict effectiveness 3726302.3730062.pdf.

##### **C. RAG-Specific (Novel) Predictors**

Since RAG is special (the retrieved passage is used directly in text generation, not just for searching), we designed predictors that look at the relationship between the retrieved passage and parts of the prompt:

- **PredReranker**: Uses a neural network to judge how well the retrieved passage plus the remaining prompt predict the next token.
- **TripletPred**: Considers multiple combinations of the passage and prompt to make the prediction 3726302.3730062.pdf.

##### **D. Post-Generation Predictors**

Sometimes, you can actually run the LLM with and without RAG, and compare the two resulting probability distributions directly:

- **EntPred**: Measures the difference in uncertainty ("entropy") between RAG and no-RAG distributions.
- **DiverPred**: Measures how much the two distributions differ overall (using KL divergence) 3726302.3730062.pdf.

#### **Integrated Approaches**

We also tried combining several predictors together using a "mixture of experts" system (with machine learning), to see if a combination works better than each predictor by itself 3726302.3730062.pdf.

#### **Experiments & Results**

We ran experiments using large test datasets and popular modern LLMs (like Llama-3 and Falcon2). We measured how well each prediction method’s estimates correlated with the actual measured gains of using RAG.

- **Takeaway:** The best predictors were the ones specifically tuned for the RAG setting and looked at the relationship between the passage and the prompt (like PredReranker and TripletPred). Standard search-based predictors and previous neural models for search didn’t work as well for text completion with RAG.
- Also, integrating RAG-specific predictions with post-generation (entropy, KL divergence) could further improve performance.
- Efficient prediction is possible: you don’t always need to run the LLM to get useful predictions about RAG’s effectiveness 3726302.3730062.pdf.

#### **Why This Matters**

- If we can predict when RAG will help, we can use RAG selectively—saving computation when it won’t assist, and maximizing performance for users.
- Our work provides a toolkit and framework to measure and predict RAG effectiveness, so future systems can be adaptive and more efficient.

#### **Summary in Plain English**

Think of RAG like helping a student (the LLM) by giving them relevant notes (retrieved passages) before answering a question. Sometimes the notes help, sometimes they distract. Our research is about building a "judge" who can look at the prompt and the candidate notes and decide, ahead of time, “Will these notes actually help the student answer better?” We tried various ways for this judge to make its decision, found some strategies that work well (especially those tailored to RAG’s special scenario), and tested everything on real language model setups

------------

## RETRIEVAL AUGMENTED GENERATION WITH COLLABORATIVE FILTERING FOR PERSONALIZED TEXT GENERATION
https://dl.acm.org/doi/10.1145/3726302.3730075

### **The Big Picture**

Imagine you want AI to generate text—movie recommendations, news headlines, or scientific paper titles—that feels personal, like it understands your unique tastes and interests. Traditionally, we do this by looking at your past choices, and then have the AI generate something new using only that information. This approach works, but it misses a big opportunity: learning from people who are similar to you.

### **Key Problem**

Here’s the issue we tackle: How can we help AI generate more personalized outputs not just by using your own history, but also by leveraging the experiences and behaviors of other users with similar interests? This is similar to how Netflix recommends movies—you get suggestions based not just on your own viewing history, but also on what “users like you” have liked. In AI text generation, this is less explored.

### **Our Approach: CFRAG**

To address this, we introduce a method called CFRAG—Collaborative Filtering for Retrieval-Augmented Generation. Think of CFRAG as a three-step teamwork process:

1. **Find People Like You:** We first find users with interests similar to yours using a technique called contrastive learning. This is like creating a digital fingerprint for each user’s history, and then matching these fingerprints to find your “neighbors.”
    
2. **Fetch the Right Information:** Once we know who’s similar to you, we grab not just your past documents, but also relevant ones from your neighbors. We use advanced search models (retrievers) for this. But we fine-tune them using feedback from large language models (LLMs), so they fetch documents that actually help generate better personalized text, not just those that are similar on the surface.
    
3. **Sort What Matters Most:** With all these fetched documents, we need to decide which are most useful for the AI to use right now. That’s where the reranking model comes in. It looks at the set of candidate documents and picks out those that will most likely help the language model generate the best output for your current request, again using your preferences and the preferences of your similar users.
    

### **Why Is This Better?**

Compared to existing methods, our approach:

- **Brings in diverse knowledge**: By considering similar users, AI has a richer palette of information to draw from. Sometimes your own history isn’t enough; learning from like-minded users fills in the gaps.
- **Targets personalization**: Instead of just picking documents that are semantically close to your query, our models, with LLM feedback, prioritize those that truly matter for generating personalized output.
- **Fine-tunes with feedback**: We let the LLM “grade” which retrieved documents actually helped its response, and use that feedback to tune both the retriever and reranker—so the whole system gets smarter over time at finding helpful stuff.

### **How We Do This (In a Bit More Detail)**

- **Contrastive Learning for User Similarity**: To figure out which users are similar, we take each user’s history, make a couple of “views” of it (e.g., cropping part of it, masking out pieces), and train a model so that different views of the same person look similar, and views from different people look different to the model. This forms a useful way to find “people like you.”
- **Retriever and Reranker Tuning**: Normally, search models just care about semantic similarity. But for true personalization, we let the LLM tell us, after generating text, which documents it found most helpful, and use this signal to adjust how we look for and prioritize documents next time.
- **User History and Collaborative Filtering**: By experimenting with how many “neighbor” users to consider and how many documents to fetch from each, we found that a balance is key—too few and you don’t benefit from collaboration; too many and you dilute your personal preferences.

### **Results and Evidence**

In real-world tests (on six datasets in the LaMP benchmark), CFRAG outperforms existing methods. Even just randomly picking from user histories is better than using no history at all, but our collaborative method outshines both—demonstrating how powerful it is to learn from similar users instead of going it alone.

### **Ablation Studies (What Happens If We Remove Pieces?)**

- If we stop retrieving from similar users and use only a person’s own history, results drop—showing collaboration is crucial.
- If we use just plain search models, rather than ones fine-tuned with LLM feedback for personalization, quality suffers.
- If we don’t rerank documents based on user preferences, results are also worse.

### **Summary**

In simple terms: Personalized text generation works best when your AI teammate doesn’t just know you, but also knows who you’re similar to. CFRAG is a way to let your AI learn from both you and your digital neighbors, leading to richer, more accurate, and more personally tailored results. We show that tailoring both the search for information and how it’s ranked—using feedback from the powerful AI model itself—makes everything work even better

-------

## KNOWING YOU DON`T KNOW: LEARNING WHEN TO CONTINUE SEARCH IN MULTI-ROUND RAG THROUGH SELF-PRACTICING
https://dl.acm.org/doi/10.1145/3726302.3730018

### **1. What problem are we solving?**

Imagine you’re using a smart assistant (like an AI) to answer tough questions that require more than one Google search. These systems, called Retrieval Augmented Generation (RAG), combine large language models (LLMs, like GPT-4) with search engines—they “retrieve” information, then “generate” answers.

Now, the tricky part is when a single search isn’t enough. Sometimes, the AI needs multiple rounds: search, think, ask again, search more, and only then answer. The real problem is knowing: When does the AI have enough information to answer confidently? Or should it keep searching? Humans naturally know when they “don’t know enough”—but current AI is bad at this. Existing AIs often stop too early, give answers with missing facts, or waste time searching long after they have what they need.

### **2. How does the paper address this with SIM-RAG?**

We introduce a framework called SIM-RAG (Self-Practicing Inner Monologue RAG). The idea is to give the system a new “self-awareness”—like an internal monitor—that checks each time: “Do I have enough info for a good answer yet?” If yes, it answers. If not, it searches more.

SIM-RAG has three components:

- **Reasoner:** The LLM that tries to answer the question using whatever info it’s got so far.
- **Retriever:** An external search engine or database the system can ask for more documents (like performing a Google search).
- **Critic:** A smaller, separate model—like a judge—that inspects the Reasoner’s current answer and the supporting evidence, and decides if there’s enough to proceed or if more searching is needed.

### **3. How does SIM-RAG work step by step?**

Let’s walk through an example round:

1. **Question & Initial Context:** The user asks a question—no context yet.
2. **Answer Generation:** The Reasoner tries to answer with what knowledge it has. It also explains its reasoning (this is called generating a “rationale”).
3. **Sufficiency Inspection:** The Critic examines the answer, the rationale, the original question, and any previously found documents.
    - If the answer is well-supported, it ends the process and returns the answer.
    - If not, we continue.
4. **Information Retrieval:** The Reasoner creates a search query (based on what seems missing) and asks the Retriever for more documents.
5. **Loop:** The new information is added to the context and we go back to step 2. The cycle repeats until the Critic is satisfied, or a set maximum number of rounds is reached.

This mimics how a human might approach answering a tough question, searching and thinking iteratively, and always checking if they've got enough to respond.

### **4. How do we train this system (the tricky part!)?**

A big challenge is training the Critic—how does it learn to judge if an answer is “sufficient”?

Most past work relied on humans to label each reasoning step (“Is this answer good? Is there enough information?”). That is expensive and slow.

Our solution: **Self-Practicing.** Instead of humans, we have the whole RAG system practice on standard question-answer datasets. In training, it tries to answer each question:

- If its generated answer matches the ground-truth answer, we log this as a “sufficient” episode.
- If not, we log it as “insufficient,” along with what it tried and what documents it had. At each step, we record the question, the documents retrieved so far, the attempted answer, and the rationale.

This way, the system generates lots of training data for itself—learning both what “enough evidence” looks like and what “not enough” looks like, as judged against known answers. The Critic then trains to classify these situations as acceptable or not.

### **5. Why is this important or novel?**

- **No expensive human mid-step labels:** We create all necessary training data by self-practice, saving time and resources.
- **More reliable multi-round RAG:** The Critic stops the Reasoner from guessing prematurely or searching endlessly.
- **Lightweight and modular:** The Critic is small and can be plugged into any RAG system.
- **Works across tasks:** Experiments show improved performance with both small and large models, especially on complex, multi-step problems.

### **6. Experiments and findings**

We tested SIM-RAG on benchmark question-answer datasets, comparing to standard RAG and to alternatives where the main model tries to “self-criticize.” The results:

- SIM-RAG consistently outperforms regular RAG—especially on hard tasks needing multiple retrievals—and does so even when using a lightweight Critic.
- Using the same general-purpose LLM as both Reasoner and Critic sounds good, but in practice, an independent Critic is better, especially for tough, multi-hop reasoning where self-critique models struggle.

Confusion matrices show the Critic is especially good at rejecting insufficient answers, leading to higher reliability.

### **7. Quick analogy**

Think of a student (Reasoner) tackling research projects with a research assistant (Retriever) and a strict advisor (Critic). The advisor checks every draft. If the student’s draft is missing evidence, the advisor sends them back to the library. Only when the advisor is convinced does the answer get submitted. This system prevents poor work or endless searching.

### **In summary:**  
SIM-RAG teaches AI assistants to “know when they don’t know”—and to search systematically until they do. It does this using a simple, modular Critic trained through the system’s own practice sessions, all without relying on expensive human supervision. This approach brings us closer to reliable, efficient AI that can handle deep, multi-step research tasks—much like a cautious but resourceful human researcher would

-------

## CIRAG: RETRIEVAL-AUGMENTED LANGUAGE MODEL WITH COLLECTIVE INTELLIGENCE
https://dl.acm.org/doi/10.1145/3726302.3729921

### **1. The Problem:**

Large Language Models (LLMs), like GPT, are very good at generating responses to questions. However, sometimes, they make up information (“hallucinate”), especially when the model doesn’t know enough or there is uncertainty. To address this, Retrieval-Augmented Generation (RAG) was developed. In RAG, when the model gets a question, it first retrieves relevant facts or documents from an external knowledge base and then uses these to help answer the question. This helps reduce hallucination. But there are still problems:

- If you retrieve too much information, it becomes noisy and can make the answer worse.
- If you retrieve too little, you might miss crucial facts.
- Deciding exactly what to retrieve, filter, and use relies on LLMs, which themselves can be unreliable.

### **2. Key Insight:**

Humans often consult multiple sources or experts and combine their individual perspectives to find good answers—a process known as the “Wisdom of Crowds.” We decided to bring this idea into RAG systems for LLMs: instead of treating the question as a single chunk, we break it down and consult “virtual experts” drawn from the entities (like people, organizations, places) found in the question itself.

### **3. Our Solution in Simple Steps:**

Our system is called CIRAG, which stands for Collective Intelligence Retrieval-Augmented Generation. It works in three main phases:

**a) Explicit Query Expanding and Retrieving**

- First, when a question comes in, we use a Named Entity Recognition (NER) model to extract all important entities from the question (for example, if the question is “When did Bill Gates found Microsoft?”, entities would be “Bill Gates” and “Microsoft”).
- Each extracted entity is treated as an “individual” or an expert with unique background knowledge.
- For each entity, we perform independent retrieval: we search the knowledge base for information specific to each entity.
- Sometimes, retrieval isn’t necessary (if the question is easy enough). To decide when to retrieve, we measure how many entities are in the question versus its total length. If the question has a high density of entities (typically harder questions), we trigger retrieval automatically 3726302.3729921.pdf.

**b) Multi-granularity Fusion Reranking**

- Now, we have a large set of retrieved documents (backgrounds). But using everything would be too noisy.
- To filter out subjective or less relevant information, we use two re-ranking strategies:
    - Frequency-based reranking: We check which sentences (pieces of information) appear most often across different retrievals. The more frequent ones get higher priority, as they likely represent a crowd consensus.
    - Semantic-based reranking: We score how semantically relevant each sentence is to the original question, using deep learning models that compare sentence meanings 3726302.3729921.pdf.
- We combine both scores to create a ranked list of top relevant sentences.

**c) Collective Generating**

- Finally, we take the original question plus the top-ranked sentences and feed them into the LLM to generate the final answer. The LLM uses this “crowd wisdom”—the combination of diverse but relevant information—to answer more accurately 3726302.3729921.pdf.

### **4. Why This Works:**

- By breaking questions into their core entities, we ensure diverse perspectives and avoid missing key context.
- Our filtering ensures that only useful, non-redundant knowledge is used, reducing noise.
- Overall, this makes the LLM less likely to hallucinate and more likely to provide correct answers—especially for complex, multi-hop questions (where the answer requires piecing together information from several distinct sources).

### **5. Experiments and Results:**

- We tested CIRAG on challenging question-answering datasets (HotPotQA, 2WikiMultiHopQA).
- We measured both retrieval accuracy (how well the system finds relevant facts) and final answer quality.
- Our approach, inspired by human crowd-sourcing and carefully tuned filtering, improved performance compared to previous RAG methods 3726302.3729921.pdf.

### **Summary in Everyday Terms:**

Imagine you’re answering a tough question, so you ask several friends, each an expert on a different topic in the question. You collect all their answers and look for the points they agree on. You also check whose input is most directly related to your original question. You then combine just these best points to craft your final answer. CIRAG does exactly this, but automatically and at scale, to help LLMs generate much better answers with less made-up information.