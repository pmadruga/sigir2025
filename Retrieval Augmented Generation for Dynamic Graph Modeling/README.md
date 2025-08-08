## RETRIEVAL AUGMENTED GENERATION FOR DYNAMIC GRAPH MODELING
https://dl.acm.org/doi/10.1145/3726302.3729958

**What is the problem we want to solve?**

Dynamic graphs are networks—think of social networks, citation networks, or interaction logs—where the relationships between elements (nodes) change over time. A big challenge is predicting what connections or events will happen next based on what has occurred previously. Traditional methods either take "snapshots" at intervals and look at how the graph changes from one snapshot to the next, or they try to model the timing of every single interaction.

Most existing methods only look at a node's local history to predict its future, which limits their ability to capture bigger patterns or adapt to new, changing behaviors in the graph.

**Our core idea: Retrieval-Augmented Generation for Dynamic Graphs (RAG4DyG)**

The main innovation in RAG4DyG is to enrich the information we use for prediction by fetching (retrieving) relevant "demonstrations" (examples of past node sequences and their outcomes) from a pool of previous samples. We don't just use a node's own past—we retrieve and combine useful patterns from the broader graph history, focusing on cases similar to our prediction target, both in content and time.

Let's break down the main components:

### 1. Sequence Modeling of Dynamic Graphs

We first represent a dynamic graph as sequences: for any target node, we create a chronological list of its past interactions (who it interacted with, and when). This sequence is the "query." The goal is to predict that node's next set of interactions (the "output sequence") 3726302.3729958.pdf.

### 2. Time- and Context-Aware Retriever

To enhance predictions, we build a retrieval system that, given a query sequence (the history of a target node), can find K most relevant demonstrations (other histories and their next steps) from a database. This system works in two smart ways:

- **Time-aware retrieval:** We prefer demonstrations whose events happened close to the query's time, using an exponential decay function: the further back (or forward) in time, the less important a demonstration is. This helps ensure that the retrieved examples are temporally relevant 3726302.3729958.pdf.
    
- **Context-aware retrieval:** We use contrastive learning to find demonstrations whose structure (sequence of interactions) is most similar to the query, regardless of timing. We also use data augmentations (masking and cropping) when training the retriever to help it focus on robust, intrinsic patterns and ignore noise or irrelevant details 3726302.3729958.pdf.
    

The training of this retriever involves two losses: one encouraging temporal proximity, the other encouraging contextual similarity. During inference (prediction), we use it to rank the candidate demonstrations for each query.

### 3. Graph Fusion-based Generator

Once we've retrieved several relevant demonstrations, we need to combine their information for use in prediction. Instead of just concatenating long sequences (which can be unwieldy and cause the model to lose focus), we fuse these demonstrations into a "summary graph" 3726302.3729958.pdf.

- All tokens (special markers, nodes, times) from the retrieved demonstrations become nodes in this summary graph.
- Edges capture how these tokens are related in their respective demonstrations.
- We then use a Graph Neural Network (GNN) to process this summary graph, extracting a rich, structured representation that carries both context and structural knowledge from the demonstrations.
- This fused graph representation is combined (prepended) to the original query sequence and passed into a sequence generation model (a Transformer), which then predicts the target node's future interactions 3726302.3729958.pdf.

### 4. Training and Inference

- During training: We freeze most model parts, except those responsible for graph fusion and output.
- During testing: For each new query, we first retrieve relevant demonstrations, build and fuse the summary graph, combine it with the query, and finally predict what happens next using the trained model 3726302.3729958.pdf.

### 5. Why is this better?

- **Broader Context:** We can go beyond just a node's own history and leverage similar cases from the entire dataset.
- **Temporal Adaptation:** By factoring in time proximity, we adapt to trends or distribution shifts in the data.
- **Structural Understanding:** The fused graph makes it easier to identify higher-level patterns and relationships.

Experiments on various datasets (social networks, email logs, etc.) show that RAG4DyG outperforms previous models, especially in adapting to new or evolving patterns. This makes predictions about future events in dynamic graphs more accurate and robust 3726302.3729958.pdf.

### **Summary:** 
Imagine you're trying to predict what will happen to someone in a complex, changing network—like who they'll email next, based on their previous emails. Instead of just looking at their own email history, you also look for other people who had similar patterns in the past, especially if those patterns happened at around the same time. You then summarize what happened in those similar situations, blend this summary with your original person's history, and make your prediction.

By doing this smart retrieval and combination, you get a much more flexible and powerful prediction system—one that learns not just from the local past, but from the broad, dynamic tapestry of the whole network's history