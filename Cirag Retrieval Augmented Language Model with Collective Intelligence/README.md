## CIRAG: RETRIEVAL-AUGMENTED LANGUAGE MODEL WITH COLLECTIVE INTELLIGENCE
https://dl.acm.org/doi/10.1145/3726302.3729921

### **1. The Problem:**

Large Language Models (LLMs), like GPT, are very good at generating responses to questions. However, sometimes, they make up information ("hallucinate"), especially when the model doesn't know enough or there is uncertainty. To address this, Retrieval-Augmented Generation (RAG) was developed. In RAG, when the model gets a question, it first retrieves relevant facts or documents from an external knowledge base and then uses these to help answer the question. This helps reduce hallucination. But there are still problems:

- If you retrieve too much information, it becomes noisy and can make the answer worse.
- If you retrieve too little, you might miss crucial facts.
- Deciding exactly what to retrieve, filter, and use relies on LLMs, which themselves can be unreliable.

### **2. Key Insight:**

Humans often consult multiple sources or experts and combine their individual perspectives to find good answers—a process known as the "Wisdom of Crowds." We decided to bring this idea into RAG systems for LLMs: instead of treating the question as a single chunk, we break it down and consult "virtual experts" drawn from the entities (like people, organizations, places) found in the question itself.

### **3. Our Solution in Simple Steps:**

Our system is called CIRAG, which stands for Collective Intelligence Retrieval-Augmented Generation. It works in three main phases:

**a) Explicit Query Expanding and Retrieving**

- First, when a question comes in, we use a Named Entity Recognition (NER) model to extract all important entities from the question (for example, if the question is "When did Bill Gates found Microsoft?", entities would be "Bill Gates" and "Microsoft").
- Each extracted entity is treated as an "individual" or an expert with unique background knowledge.
- For each entity, we perform independent retrieval: we search the knowledge base for information specific to each entity.
- Sometimes, retrieval isn't necessary (if the question is easy enough). To decide when to retrieve, we measure how many entities are in the question versus its total length. If the question has a high density of entities (typically harder questions), we trigger retrieval automatically 3726302.3729921.pdf.

**b) Multi-granularity Fusion Reranking**

- Now, we have a large set of retrieved documents (backgrounds). But using everything would be too noisy.
- To filter out subjective or less relevant information, we use two re-ranking strategies:
    - Frequency-based reranking: We check which sentences (pieces of information) appear most often across different retrievals. The more frequent ones get higher priority, as they likely represent a crowd consensus.
    - Semantic-based reranking: We score how semantically relevant each sentence is to the original question, using deep learning models that compare sentence meanings 3726302.3729921.pdf.
- We combine both scores to create a ranked list of top relevant sentences.

**c) Collective Generating**

- Finally, we take the original question plus the top-ranked sentences and feed them into the LLM to generate the final answer. The LLM uses this "crowd wisdom"—the combination of diverse but relevant information—to answer more accurately 3726302.3729921.pdf.

### **4. Why This Works:**

- By breaking questions into their core entities, we ensure diverse perspectives and avoid missing key context.
- Our filtering ensures that only useful, non-redundant knowledge is used, reducing noise.
- Overall, this makes the LLM less likely to hallucinate and more likely to provide correct answers—especially for complex, multi-hop questions (where the answer requires piecing together information from several distinct sources).

### **5. Experiments and Results:**

- We tested CIRAG on challenging question-answering datasets (HotPotQA, 2WikiMultiHopQA).
- We measured both retrieval accuracy (how well the system finds relevant facts) and final answer quality.
- Our approach, inspired by human crowd-sourcing and carefully tuned filtering, improved performance compared to previous RAG methods 3726302.3729921.pdf.

### **Summary in Everyday Terms:**

Imagine you're answering a tough question, so you ask several friends, each an expert on a different topic in the question. You collect all their answers and look for the points they agree on. You also check whose input is most directly related to your original question. You then combine just these best points to craft your final answer. CIRAG does exactly this, but automatically and at scale, to help LLMs generate much better answers with less made-up information.