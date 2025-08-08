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