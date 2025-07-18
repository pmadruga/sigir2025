#### Paper 1: PR-Attack: Coordinated Prompt-RAG Attacks on Retrieval-Augmented Generation in Large Language Models via Bilevel Optimization
**Authors**: Yang Jiao, Xiaodong Wang, Kai Yang
**Link**: [arXiv:2504.07717](https://arxiv.org/abs/2504.07717)
**Summary**: Proposes a novel optimization-driven attack on RAG systems that injects poisoned texts into knowledge databases while embedding backdoor triggers in prompts. Uses bilevel optimization to achieve high attack success rate with limited poisoned texts and improved stealth compared to existing methods.

**My Notes**: 


#### Paper 2: Reverse-Engineering the Retrieval Process in GenIR Models
**Authors**: Anja Reusch, Yonatan Belinkov
**Link**: [arXiv:2503.19715](https://arxiv.org/abs/2503.19715) | [Code](https://github.com/technion-cs-nlp/re-gen-ir)
**Summary**: Studies internal computations of Generative IR models using mechanistic interpretability. Finds that the decoder is primary component for retrieval, with three stages: priming, bridging (cross-attention), and interaction (MLPs). Query-document interaction only occurs in final stage.

**Questions**:
- Can you elaborate on mechanistic probability?
- They rank their corpus but adding a token per document. Can you elaborate how it's done?
- They say the architecture is the same, they don't change it and keep it in the residual stream. But how?
- They study how each component contributes. But contributes in what, exactly?
- They removed many layers. What happens to the DocID?

```
## The Problem I'm Tackling

Imagine you're building a new type of search engine. Traditional search engines work like this: you type a query, and they look through millions of documents to find matches. But what if we could train a neural network to directly "remember" where every document is and just output the right document ID when given a query? That's Generative Information Retrieval (GenIR).

The problem is: nobody really knows HOW these models work internally. It's like having a magic box that works well, but you have no idea what's happening inside. This is concerning because if we don't understand it, we can't improve it or fix it when it breaks.

## My Mission: Reverse-Engineering GenIR

I set out to open this black box and trace exactly how a query becomes a document ID. Think of it like following a river from its source to the ocean - I want to track how information flows through the model.

## The Architecture: Encoder-Decoder

GenIR uses a transformer encoder-decoder architecture (specifically T5). Here's the simple version:

- **Encoder**: Takes your query ("Who wrote Harry Potter?") and processes it
- **Decoder**: Takes a special start token and outputs a document ID (like "doc_42")

The decoder has three types of components in each layer:

1. **Self-Attention**: Looks at its own processing
2. **Cross-Attention**: Looks at what the encoder produced
3. **MLPs (Multilayer Perceptrons)**: Neural networks that transform information

## Discovery #1: The Encoder Isn't Special

My first shocking finding: I could swap out the encoder with one that had NEVER seen the documents in my database, and retrieval still worked! I even used a completely untrained T5 encoder, and the model could still find documents (though not as well).

This means the encoder's job is simpler than we thought - it just needs to understand the query semantically. The real magic happens in the decoder.

## Discovery #2: The Three-Stage Retrieval Process

By carefully analyzing which components contribute most at each layer, I discovered the retrieval process happens in three distinct stages:

### Stage I: The Priming Stage (Layers 0-6)

This stage is query-agnostic - it doesn't even need to know what you're searching for! The MLPs here do preparatory work:

- They start pushing document IDs toward better rankings
- They set up information that will trigger later components
- Remarkably, I could replace these MLPs with their average output across all queries, and the model still worked

Think of it like warming up an engine - it's necessary, but the same warm-up works for any journey.

### Stage II: The Bridging Stage (Layers 7-17)

This is where cross-attention becomes the star. It:

- Transfers query information from the encoder to the decoder
- Performs a kind of "query expansion" - finding related words and concepts
- Outputs information that looks like regular words, not document IDs

For example, for "Who wrote Harry Potter?", cross-attention might output signals for words like "books," "author," "written," etc.

### Stage III: The Interaction Stage (Layers 18-23)

This is where the magic happens! For the first time, query and document information actually interact:

- MLPs read the query information from cross-attention
- They use this to promote specific document IDs
- This is the ONLY stage that truly adapts during GenIR training

By the final layer, the model has pushed the correct document ID to the top rank.

## Discovery #3: Components Communicate Through Words

Here's a fascinating detail: cross-attention and MLPs don't communicate using document IDs - they talk using regular words from the vocabulary!

When I projected the cross-attention outputs to see what "tokens" they were most similar to, I found regular words related to the query, not document IDs. It's like the components are having a conversation in English about what to retrieve, rather than directly discussing document numbers.

## Discovery #4: Most Components Aren't Essential

Through "activation patching" (selectively disabling components), I found:

- Self-attention can be completely removed with minimal impact
- Only 1/3 of the components are truly necessary for retrieval
- The model has significant redundancy

I could disable 2/3 of the components and still get good retrieval performance!

## The Complete Retrieval Flow

Let me walk you through what happens when you search for "Who wrote Harry Potter?":

1. **Encoder processes the query** - understanding it semantically
2. **Stage I MLPs prepare the decoder** - like setting the stage before a play
3. **Stage II cross-attention reads the query** - extracting concepts like "author," "books," "Harry Potter"
4. **Stage III MLPs receive these concepts** - and use them to activate neurons that promote the J.K. Rowling document ID
5. **Final ranking** - the correct document ID rises to the top

## Why This Matters

Understanding this process reveals several important insights:

1. **Efficiency opportunities**: We can remove 2/3 of components during inference
2. **Training improvements**: We only need to fine-tune Stage III for new document collections
3. **Pre-training leverage**: Stages I and II largely come from pre-training - we're building on existing language understanding
4. **Debugging potential**: We now know where to look when retrieval fails

## The Elegant Simplicity

What strikes me most is how the model repurposes general language understanding for retrieval. The first two stages use mechanisms learned during pre-training on regular text. Only the final stage truly learns "this query means this document."

It's like teaching someone to be a librarian - they already know how to read and understand questions (pre-training), you just need to teach them where specific books are located (GenIR fine-tuning).

## Future Implications

This work opens doors for:

- More efficient GenIR models (removing unnecessary components)
- Better training strategies (focusing on Stage III)
- Hybrid models that combine the best of traditional and generative retrieval
- Understanding why GenIR struggles with large document collections

By reverse-engineering GenIR, we've transformed a black box into a glass box. We can now see the elegant three-stage process by which a simple query transforms into a precise document ID. This understanding is the first step toward building better, more efficient, and more capable retrieval systems.
```

#### Paper 3: CG-RAG: Research Question Answering by Citation Graph Retrieval-Augmented LLMs
**Authors**: Yuntong Hu, Zhihan Lei, Zhongjie Dai, Allen Zhang, Abhinav Angirekula, Zheng Zhang, Liang Zhao
**Link**: [arXiv:2501.15067](https://arxiv.org/abs/2501.15067)
**Summary**: Framework for research QA that leverages citation graph structures. Introduces Lexical-Semantic Graph Retrieval (LeSeGR) that convolves over query-relevant subgraphs. Significantly outperforms standard RAG methods by integrating both lexical/semantic relevance and graph topology.

**My Notes**:
```
Let me explain this paper as if I were the author, using the Feynman technique to break down the complex ideas into simple, understandable concepts.

## What Problem Am I Solving?

Imagine you're a researcher trying to answer a complex scientific question by reading through thousands of research papers. Current AI systems struggle with this because they treat each paper as an isolated document, missing the rich web of connections between papers through citations. It's like trying to understand a conversation by only hearing random sentences without knowing who's talking to whom.

## My Core Insight: The Citation Graph

Think of scientific literature as a social network, but instead of people connecting through friendships, papers connect through citations. When Paper A cites Paper B, it's saying "this work is relevant to mine." These connections form a graph - a web of relationships that contains valuable context.

Here's the key: **relevant information isn't just in individual papers, but in how papers relate to each other**. A paper about "graph representation learning" might not directly mention "node classification," but if it cites papers that do, it could still be highly relevant to your question.

## Breaking Down Papers into Chunks

Papers are complex - the introduction serves a different purpose than the methodology or results sections. So I break each paper into semantic chunks - coherent sections that represent specific aspects. Think of it like breaking a book into chapters, where each chapter can stand somewhat on its own but is also connected to others.

These chunks form two types of connections:

1. **Intra-paper connections**: Links between chunks within the same paper (like how Chapter 2 references Chapter 1)
2. **Inter-paper connections**: Links between chunks across different papers through citations

## The Magic: Lexical-Semantic Graph Retrieval (LeSeGR)

Now here's where it gets interesting. Traditional search methods use either:

- **Sparse retrieval**: Looking for exact keyword matches (like Ctrl+F in a document)
- **Dense retrieval**: Understanding meaning and finding semantically similar content

Current systems try to combine these by running both separately and then merging results. But I do something different - I **entangle** these signals within the graph structure itself.

Think of it like this: Instead of having two separate detectives (one looking for fingerprints, one looking for DNA) who later compare notes, I have one super-detective who considers both types of evidence simultaneously while also understanding the social network of suspects.

## How LeSeGR Works

1. **For each chunk**, I create a representation that combines:
    - Its lexical features (exact words and phrases)
    - Its semantic meaning (what it's actually about)
    - Information from its neighboring chunks in the graph
2. **The entanglement happens through message passing**: Each chunk sends information to its neighbors, weighted by how relevant they are to both the chunk and the query. It's like each chunk asking its neighbors "Hey, do you have anything relevant to add?"
3. **The mathematical magic**: I proved that when there are no graph connections, my method reduces to existing hybrid retrieval methods. This means I'm not replacing what works - I'm extending it to leverage graph structure when it exists.

## The Generation Part: CG-RAG

Once I retrieve the most relevant chunks using LeSeGR, I don't just hand them to a language model. Instead, I:

1. Keep the contextual subgraph around each retrieved chunk
2. Use the language model to summarize the context
3. Combine these summaries with the main chunks to generate the final answer

It's like not just giving someone the key paragraphs from relevant papers, but also providing a summary of the surrounding context to help them understand better.

## Why This Works Better

My experiments show significant improvements across all metrics:

- **For retrieval**: I achieve 96.1% Hit@1 accuracy compared to the next best method's 91.3%
- **For question answering**: Better scores on coherence, consistency, and relevance
- **Efficiency**: Competitive speed while leveraging GPU computation effectively

The key insight is that by integrating lexical and semantic signals within the graph structure during retrieval (not after), I can capture complex relationships that other methods miss.

## Real-World Impact

This isn't just a theoretical improvement. When researchers need to answer questions like "What are the latest advances in semantic segmentation?" or "Do mitochondria play a role in programmed cell death?", my system can navigate the complex web of scientific literature more effectively than ever before.

Think of it as upgrading from a library card catalog (which just lists books) to having a knowledgeable librarian who not only knows where every book is but also understands how all the books relate to each other and can guide you through the connections to find exactly what you need.

## The Bottom Line

By recognizing that scientific knowledge isn't stored in isolation but in an interconnected web, and by designing a retrieval system that naturally works with this structure, I've created a more powerful tool for research question answering. It's not just about finding relevant papers - it's about understanding the conversation happening across the entire scientific community.
```


#### Paper 4: Heterogeneous Graph Embedding Made More Practical
**Authors**: [Information not available]
**Link**: [Not found]
**Summary**: [Limited information available - focuses on practical improvements to heterogeneous graph embedding methods]

**My Notes**:


#### Paper 5: Leveraging Large Language Models for Effective Label-free Node Classification in Text-Attributed Graphs
**Authors**: Taiyan Zhang, Renchi Yang, Jieming Shi, Xiaofeng Zhu, Chuan Xiao, Ying Zhang
**Link**: [arXiv:2412.11983](https://arxiv.org/abs/2412.11983) | [Code](https://github.com/HKBU-LAGAS/Locle)
**Summary**: Introduces Locle, an active self-training framework for cost-effective label-free node classification. Uses GNNs to identify critical samples and combines LLMs/GNNs for label refinement. Achieves 8.08% improvement on DBLP dataset at less than one cent cost.

**My Notes**:
```
Based on the search results, I have found information about the paper "Leveraging Large Language Models for Effective Label-free Node Classification in Text-Attributed Graphs" (Locle). Let me explain this paper using the Feynman technique, as if I were its author.

## The Problem I'm Solving

Imagine you have a huge social network where each person (node) has a profile description (text attributes), and you want to classify them into categories - like "engineers," "artists," "teachers," etc. Traditional Graph Neural Networks (GNNs) are great at this, but they're like students who need tons of labeled examples to learn. Getting these labels is expensive - you'd need humans to manually categorize thousands of profiles!

Meanwhile, Large Language Models (LLMs) like ChatGPT are like brilliant consultants who can look at a profile and immediately guess the category without any training. But they're expensive to consult (API costs) and sometimes make mistakes (noisy labels). Plus, they don't understand the social connections between people.

## My Solution: Locle (Label-free nOde Classification with LLMs cost-Effectively)

I created Locle - think of it as a smart collaboration system between the expensive consultant (LLM) and the eager student (GNN). Instead of asking the consultant about every single person in the network, I strategically pick the most important ones to ask about, then let the student learn from these examples and handle the rest.

## How Locle Works: A Three-Part Symphony

### Part 1: Smart Initial Selection (Active Node Selection)

Instead of randomly picking nodes to ask the LLM about, I use **subspace clustering**. Think of it like this: imagine all the profiles projected into a space where similar people cluster together. I identify the "representative" people from each cluster - like finding the most typical engineer, the most typical artist, etc.

This is smarter than random selection because:

- I get diverse examples across different types
- I avoid asking about very similar profiles multiple times
- I capture the natural groupings in the data

### Part 2: Finding the "Critical" Nodes

After initial training, my system becomes like a detective looking for two types of suspicious cases:

1. **High Entropy Nodes**: The GNN is very uncertain about these - like a profile that could equally be an "engineer" or "artist"
2. **Label Disharmonicity**: Nodes where the GNN's prediction conflicts with their neighbors - imagine someone predicted as "engineer" but all their friends are "artists"

These are the nodes where getting the LLM's opinion would be most valuable!

### Part 3: Label Refinement with Graph Rewiring

Here's where it gets clever. I don't just trust the labels blindly. I:

1. **Combine opinions**: Both the LLM and GNN vote on the label
2. **Consider confidence**: If the LLM is very confident, I trust it more
3. **Fix the graph structure**: Using something called Dirichlet Energy, I rewire connections to reduce noise - like fixing incorrect friend connections that don't make sense

## The Mathematical Magic: Why This Works

The key insight is balancing three forces:

1. **Exploration**: Using LLMs to explore unknown territory (unlabeled nodes)
2. **Exploitation**: Using GNNs to efficiently label similar nodes
3. **Graph Structure**: Leveraging the principle that connected nodes tend to have similar labels

I formulate this as an optimization problem where I'm trying to minimize both:

- The cost of LLM queries (money)
- The classification error (accuracy)

## Real-World Impact

On the DBLP dataset (a network of 14,300 academic papers), Locle achieved:

- **8.08% better accuracy** than the previous best method
- **Under 1 cent total cost** for LLM queries
- Effective use of only a tiny fraction of the data for LLM annotation

## Why This Matters

Traditional approaches either:

- Use LLMs for everything (too expensive)
- Use GNNs with manual labels (too labor-intensive)
- Use LLMs once at the beginning (too rigid, can't fix mistakes)

Locle is like having a smart teaching assistant who:

1. Knows exactly which examples to ask the professor about
2. Learns from those examples to teach other students
3. Comes back with the most confusing cases for clarification
4. Double-checks the work by comparing what different sources say

## The Secret Sauce: Self-Training Loop

The beauty is in the iterative process:

1. Start with smart selection of representative nodes
2. Get LLM labels for these
3. Train GNN on these labels
4. Find nodes where GNN is confused
5. Get LLM's opinion on just these critical nodes
6. Refine and repeat

Each iteration makes the system smarter while keeping costs minimal.

## Technical Innovation: Handling Noise

LLMs aren't perfect - they make mistakes. Traditional methods suffer when LLMs give wrong labels. Locle handles this through:

1. **Confidence scoring**: Asking LLMs how sure they are
2. **Graph structure validation**: Checking if labels make sense given neighbors
3. **Hybrid decision making**: Combining LLM and GNN opinions
4. **Topology refinement**: Actually rewiring the graph to reduce the impact of noisy connections

## Bottom Line

Locle solves a critical problem in the real world: how do we classify millions of nodes in a graph when labeling is expensive? By intelligently combining the complementary strengths of LLMs (zero-shot capability) and GNNs (structural understanding), while actively managing costs and noise, we achieve state-of-the-art performance at a fraction of the cost.

It's like building a highly efficient education system where expensive experts train smart teaching assistants, who then educate the masses, coming back only for the most challenging cases. This creates a scalable solution for graph learning in the era of large language models.
```


#### Paper 6: Enhancing Homophily in Heterogeneous Graph Contrastive Learning via Connection Strength and Multi-view Self-Expression
**Authors**: [Information not available]
**Link**: [Not found]
**Summary**: [Limited information available - addresses homophily enhancement in heterogeneous graphs through contrastive learning]

**My Notes**:

```
## The Problem I'm Solving

Imagine you're trying to understand a social network where people have different roles - some are students, some are professors, some are researchers. This is what we call a "heterogeneous graph" - it has different types of nodes (people) and different types of relationships (edges).

Now, here's the catch: most existing methods only look at who's connected to whom. But what if two researchers working on "Natural Language Processing" have never met or collaborated? They're not connected in the graph, but they clearly have something important in common - their research area!

That's the problem I'm solving: How can we discover and use these hidden semantic relationships based on node attributes (like research interests) to better understand and represent nodes in heterogeneous graphs?

## My Solution: HASA (Heterogeneous graph embedding based on Attribute-guided Semantic Augmentation)

Think of HASA as giving the graph a pair of X-ray glasses that can see invisible connections. Here's how it works in two main stages:

### Stage 1: Attribute-guided Semantic Augmentation

This is where we reveal the hidden connections. I do two clever things:

**1. Finding Similar Nodes Through Attributes**

First, I calculate how similar nodes are based on their attributes using cosine similarity. If two authors both work on "Machine Learning" and "Computer Vision," they'll have high similarity even if they've never collaborated.

Then, I create a fused adjacency matrix that combines:

- Original connections (who actually knows whom)
- Similarity-based connections (who shares similar interests)

The formula is simple: `A' = γA + (1 - γ)S`

Where γ balances between preserving original structure and adding new semantic connections.

**2. Creating Attribute Nodes**

Here's where it gets really interesting. I treat each attribute category as a new type of node! So "Natural Language Processing" becomes a node itself. Any author working on NLP gets connected to this attribute node.

Why is this clever? Because now, two unconnected NLP researchers become 2-hop neighbors through the NLP attribute node. They can exchange information during the message-passing process in the neural network.

### Stage 2: Heterogeneous Node Aggregation

Now I have an augmented graph with:

- Original nodes (authors, papers, etc.)
- New edges based on similarity
- New attribute nodes

I use a Heterogeneous Graph Neural Network (HGNN) to learn representations. The key innovation is using attention mechanisms to weigh the importance of different types of neighbors.

For each node, I aggregate information from:

- Its original neighbors
- Similar nodes (connected through attribute similarity)
- Attribute nodes it's connected to

The attention mechanism learns that, for example, when representing an author, connections to similar authors might be more important than connections to random papers.

## The Mathematical Magic

The representation of node n at layer l is computed as:
```


#### Paper 7: InfoNCE is a Free Lunch for Semantically guided Graph Contrastive Learning
**Authors**: Zixu Wang, Bingbing Xu, Yige Yuan, Huawei Shen, Xueqi Cheng
**Link**: [arXiv:2505.06282](https://arxiv.org/abs/2505.06282) | [Code](https://github.com/Camel-Prince/IFL-GCL)
**Summary**: Treats Graph Contrastive Learning as Positive-Unlabeled learning problem. Proves that InfoNCE representation similarity aligns with probability of positive samples. Achieves up to 9.05% improvement by addressing sampling bias where semantically similar pairs are incorrectly treated as negative.

**My Notes**:
- 

#### Paper 8: Generative Recommender with End-to-End Learnable Item Tokenization
**Authors**: Enze Liu and others (6 authors total)
**Link**: [arXiv:2409.05546](https://arxiv.org/abs/2409.05546) | [Code](https://github.com/BishopLiu/ETEGRec)
**Summary**: ETEGRec unifies item tokenization and generative recommendation in one framework. Uses dual encoder-decoder architecture with recommendation-oriented alignment (sequence-item and preference-semantic). Outperforms traditional sequential recommendation models through end-to-end learning.