# A Reproducibility Study of Graph-Based Legal Case Retrieval

**Authors:** Gregor Donabauer and Udo Kruschwitz  
**Institution:** University of Essex

## Feynman Technique Explanation: Understanding This Paper In Depth

As the authors of this paper, let me explain our work to you as if you were completely new to this field, using simple concepts and building up to the technical details.

### What Problem Are We Solving?

Imagine you're a lawyer working on a case. You have a specific legal situation - let's say someone broke into a house and stole valuable items. You need to find similar cases from the past to understand how courts have handled similar situations. The problem is, there are **thousands** of legal cases, and reading through them all would take forever.

This is where our system comes in. We're building a **smart search engine for legal cases** that can automatically find cases similar to yours. But here's the catch - we're not just looking for cases that use the same words. We want to find cases that are **legally similar** even if they use different language.

### The Big Idea: Legal Cases as a Network

Think of legal cases and charges (like "theft" or "breaking and entering") as people in a **social network**. Just like people are connected through friendships, legal cases are connected through relationships:

- **Case-to-case connections**: When one case cites another, or when they involve similar facts
- **Charge-to-charge connections**: When certain crimes often happen together (like theft and burglary)
- **Case-to-charge connections**: When a specific case involves certain types of legal violations

This creates a massive **graph** or network where each dot (node) is either a case or a charge, and the lines (edges) show how they're related.

### Why Graphs Matter for Legal Search

Traditional search engines work like this: you type "theft case" and they find documents containing those words. But legal reasoning is more complex. A case about "larceny" might be highly relevant to your "theft" case, even though they use different words.

Our graph-based approach is smarter because it understands these legal relationships. It knows that:
- Cases that cite each other are probably similar
- Charges that appear together often are related
- Cases involving similar charges might be relevant to each other

### The Technical Architecture: How We Built It

Our system has three main stages, like a factory assembly line:

#### Stage 1: PromptCase - Making Sense of Legal Text
Raw legal documents are massive and complex. We use AI (specifically GPT-3.5-Turbo) to process each case and create three versions:
1. **Original full text**: The complete case
2. **50-word summary**: Key facts extracted by AI
3. **Legal issues**: The core legal questions the case addresses

Think of this like having a legal clerk read each case and create a brief summary with the most important parts.

#### Stage 2: CaseGNN - Building the Smart Network
This is where the magic happens. We use something called **Graph Attention Networks** (GAT) to create our smart network.

Imagine each case and charge as a person in a conversation. The Graph Attention Network is like a skilled moderator who:
- Listens to what each person (node) is saying
- Pays attention to who they're connected to
- Figures out which connections are most important
- Helps each person learn from their neighbors

Mathematically, we represent this as:
```
Graph G = (V, E) where:
- V = all nodes (cases + charges)
- E = all edges (relationships between them)
```

#### Stage 3: CaseLink - Connecting Everything Together
This stage builds the actual connections in our network using three different methods:

1. **BM25 scores**: Traditional text matching (like Google search) to find cases with similar words
2. **Cosine similarity**: Mathematical way to measure how similar two charges are
3. **Direct text matching**: Finding explicit connections between cases and charges

### The Learning Process: Teaching the System What "Similar" Means

We train our system using something called **contrastive learning**. Think of it like teaching a child to recognize dogs:

- Show them a picture of a Golden Retriever and say "this is a dog"
- Show them a picture of a Poodle and say "this is also a dog" 
- Show them a picture of a cat and say "this is NOT a dog"

Our system learns similarly:
- Given a query case, it learns to identify truly similar cases (positive examples)
- It also learns to distinguish them from irrelevant cases (negative examples)

The mathematical formula for this is:
```
L_contrastive = -log(exp(sim(query, positive_case)/τ) / (Σ exp(sim(query, negative_case)/τ)))
```

This might look complex, but it's just a mathematical way of saying: "Make the similarity score between the query and relevant cases high, and the similarity score between the query and irrelevant cases low."

### The Reproducibility Challenge: Why We Did This Study

Here's where our story gets interesting. There was an existing system called CaseLink that claimed to achieve certain performance levels. As researchers, we believe in **scientific reproducibility** - if someone publishes a method, other researchers should be able to recreate their results.

When we tried to reproduce the original CaseLink results, we found **significant performance drops**:
- On the COLIEE 2022 dataset: 5.4 to 7.2 percentage points worse
- On the COLIEE 2023 dataset: 3.8 to 11.7 percentage points worse

This was concerning! It suggested that either:
1. The original paper had methodological issues
2. There were implementation details we were missing
3. The datasets or evaluation methods had changed

### Our Key Discovery: Open-Source Models Can Beat Commercial Ones

During our reproduction study, we made an unexpected discovery. The original CaseLink system used GPT-3.5-Turbo (a commercial model from OpenAI) for text processing. We experimented with using **Llama-3.1-8B**, an open-source alternative.

Surprisingly, the open-source model consistently **outperformed** the commercial one! This is significant because:
- Open-source models are free to use
- They can be customized for specific domains
- They don't require API calls to external services
- They can be run locally for privacy

### Technical Deep Dive: The Mathematics Behind the Magic

Let me explain the core mathematical concepts that make our system work:

#### Graph Attention Networks (GAT)
Each node in our network has an **embedding** - a numerical representation of its meaning. The GAT updates these embeddings by having each node "attend" to its neighbors:

```
attention_weight = softmax(LeakyReLU(W * [node_embedding || neighbor_embedding]))
new_embedding = σ(Σ attention_weight * neighbor_embedding)
```

This is like each case "listening" to similar cases and updating its understanding based on what it learns.

#### Contrastive Learning Details
Our contrastive loss function has two parts:

1. **Main Loss**: Brings similar cases closer together and pushes dissimilar cases apart
2. **Regularization**: Prevents the model from overfitting to the training data

```
Total_Loss = L_contrastive + λ × L_regularization
```

Where λ is a parameter that balances the two components.

#### Similarity Scoring
When you query the system with a case, it computes a **relevance score** for every other case in the database:

```
Relevance_Score = cosine_similarity(query_embedding, candidate_embedding)
```

The cases with the highest scores are returned as the most relevant matches.

### Why This Matters: Real-World Impact

Our work has several important implications:

1. **For Legal Professionals**: More accurate case retrieval means lawyers can find relevant precedents faster, leading to better legal arguments and outcomes.

2. **For AI Researchers**: Our reproducibility study highlights the importance of open science and the surprising effectiveness of open-source models.

3. **For System Builders**: We provide a blueprint for building graph-based retrieval systems that can be applied to other domains beyond law.

4. **For the Scientific Community**: We demonstrate both the challenges and importance of reproducibility in AI research.

### What We Learned About Graphs vs. Traditional Methods

One surprising finding was that **homogeneous graphs** (treating all nodes the same way) often performed better than **heterogeneous graphs** (treating cases and charges differently). This suggests that the relationships between entities might be more important than the entities themselves.

We also found that **multi-relational edges** (having different types of connections) helped the system understand the nuanced relationships in legal networks.

### The Future: Where This Research is Heading

Our work opens several exciting research directions:

1. **Better Graph Construction**: How can we automatically discover more meaningful relationships between legal cases?

2. **Dynamic Graphs**: Legal precedents change over time - how can we build systems that adapt to evolving legal landscapes?

3. **Explainable Recommendations**: Lawyers need to understand why certain cases are recommended - how can we make our system more interpretable?

4. **Cross-Jurisdictional Search**: How can we extend this approach to find relevant cases across different legal systems?

### Conclusion: Building Better Legal AI Through Rigorous Science

As the authors of this paper, we're proud to contribute to both the practical challenge of legal case retrieval and the broader scientific goal of reproducible research. Our work shows that:

- Graph-based approaches can significantly improve legal case retrieval
- Open-source models can outperform commercial alternatives
- Reproducibility studies are crucial for advancing the field
- Simple approaches (like homogeneous graphs) sometimes work better than complex ones

Most importantly, we've provided a complete, reproducible system that other researchers can build upon. The code, datasets, and detailed methodology are all available, ensuring that future researchers can validate, extend, and improve upon our work.

This is how science should work - through open collaboration, rigorous validation, and incremental improvement. We hope our contribution helps move the field forward while maintaining the highest standards of scientific integrity.

---

*This README was written using the Feynman technique to explain complex technical concepts in accessible terms, as if the authors were personally teaching you about their research.*