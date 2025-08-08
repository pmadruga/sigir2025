## DISCO: LLM KNOWLEDGE DISTILLATION FOR EFFICIENT SPARSE RETRIEVAL IN CONVERSATIONAL SEARCH
https://dl.acm.org/doi/10.1145/3726302.3729966

![[slides-2.pdf]]

### 1. **The Problem: Conversational Search is Hard**

- Imagine you're chatting with a smart assistant, asking follow-up questions—the meaning of your questions often depends on everything you've said so far.
- Teaching computers to understand these conversations and find the right answers is tricky because each new question isn't always clear without the full conversation.

### 2. **How is this usually solved?**

- Traditionally, people have used a two-step approach:
    1. Rewrite each question in the conversation ("rewrite") so it includes all the context clearly.
    2. Use this rewritten version to search for answers ("retrieve").
- But this approach is slow and can lose information, because mistakes in rewriting cause mistakes in retrieval.

### 3. **Unified Models Are Better but Have Limitations**

- Recently, smarter "unified" models do both rewriting and retrieval together by learning to make better sense of conversations directly.
- These models train by copying the representation (vector) of the "ideal" rewritten question, usually one written by a human or a very smart language model. The student model tries to match its own representation to this "gold" standard.
- But this matching is too strict, as if there's only one right way to represent the query, which isn't always the case. It limits what the model can learn.

### 4. **Our Solution: Relax the Goal, Focus on Scores ("DiSCo")**

- Our main idea with DiSCo is to change what the model learns. Instead of forcing it to copy the exact representation of human rewrites, we care about matching the similarity scores between queries and documents.
- Why similarity scores? Because in search, what ultimately matters is how well the system can match queries (questions) with relevant documents (answers).
- Think of it as grading the model on whether it picks the right documents, rather than on whether it writes the perfect query sentence.

### 5. **The How: Distilling Scores, Not Just Representations**

- We set up a clever learning process ("distillation"): a strong teacher model rewrites the question and finds matching documents. The teacher's document similarity scores are our gold standard.
- The student model sees the whole conversation and tries to assign the same similarity scores to each document as the teacher did, even if its internal representations differ.
- Mathematically, we do this by distilling the "score distribution" via Kullback-Leibler divergence (a way to measure the difference between two probability distributions).

### 6. **We Use "Sparse" Models (SPLADE)**

- Our models are based on SPLADE, which is a way of representing information so that only a few features ("words") are active or important at a time. This makes them faster and gives us more flexibility.

### 7. **Hard Negatives: Making Learning Tougher and Smarter**

- We also take advantage of "hard negatives": challenging examples where the model has to distinguish between very similar (but incorrect) documents. Our new objective naturally lets us incorporate these.

### 8. **Multiple Teachers and Score Aggregation**

- Instead of just one teacher, we can use several teachers (human, different language models), average their scores, and provide richer training signals. This is easy with our approach because we only care about the similarity scores, not the exact rewrite.

### 9. **Measuring Success: Accuracy & Efficiency**

- We test our method on tough conversational datasets (QReCC, TopiOCQA, TREC CAsT, iKAT) and evaluate both effectiveness (does it find the right answers?) and efficiency (is it fast, or does it require lots of expensive model calls?).
- Our model needs fewer slow LLM rewriting steps at inference time, yet still performs at or above state-of-the-art models.

### **In summary:**  
Older models forced student models to be like their teachers in a single, rigid way. We let students be creative, as long as they get the right answers—matching scores is enough! This makes models both more flexible and more efficient, which is better suited for real-world conversational search tasks