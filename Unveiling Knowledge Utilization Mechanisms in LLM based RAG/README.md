## Unveiling Knowledge Utilization Mechanisms in LLM-based Retrieval-Augmented Generation
https://sigir2025.dei.unipd.it/detailed-program/paper?paper=c058f544c737782deacefa532d9add4c

Imagine you have a very smart computer program called a large language model (LLM)—like ChatGPT or similar systems—which can answer questions, generate text, and assist with tasks. These LLMs have learned a massive amount while being trained on internet text, but they're not perfect: sometimes, they get facts wrong, especially about recent events or specialized topics. That's because they rely on "parametric knowledge"—information stored in their vast web of learned patterns, but which can go stale or be too general.

To fix this, we use a method called retrieval-augmented generation (RAG). Think of RAG as a way to help these models look up new or specific information from a library (an external knowledge base) in real time, then use that info to answer questions or generate better text. Instead of relying only on memory, the model can supplement itself with fresh material—like a student looking up facts in a textbook during an exam. This approach makes LLMs more reliable, up-to-date, and transparent 3726302.3730112.pdf.

Even though RAG works well, there's still a puzzle: how, exactly, do these LLMs use the retrieved information together with their own memory? What's happening "in their heads" as they combine what they know with what they look up? Most past research just measured whether RAG improved answers, but didn't dive into the mechanics.

Our paper tries to uncover those hidden mechanisms. We studied, in detail, how LLMs process both their internal knowledge and the new, external information they retrieve. We looked from two angles:

1. The "big picture" (macroscopic) view: How does knowledge "flow" through the layers of the model?
2. The "microscopic" view: What are the specific roles of the pieces inside the model – namely, the multi-head attention (MHA) and multi-layer perceptron (MLP) modules – in picking and mixing knowledge sources?

### **1. Big Picture: The Four Stages of Knowledge Streaming**

Imagine RAG as a system with incoming streams of information. Our research found that, as information moves through the layers of an LLM, the model uses both internal and external knowledge in four main stages:

- **Knowledge Refinement:** Early on, the model closely combines the query (the question) with the context (the retrieved info), refining its understanding of what the external text means for the task.
- **Knowledge Elicitation:** The model integrates the external info into its representation of the query—basically, updating what it thinks the user is really asking, in light of what it's found.
- **Knowledge Expression:** In the middle-to-deep layers, the model starts using both its own stored knowledge and the retrieved information to shape its answer.
- **Knowledge Contestation:** Near the end, the model "debates" between internal and external knowledge, deciding how much to use from each source while composing the final output. Sometimes, if there's a mismatch (like a retrieved fact that conflicts with its own memory), this contestation is especially visible 3726302.3730112.pdf.

We measured how "strongly" different types of knowledge were being used by tracking the information flow through the model's layers and across its modules. We even tested what happened when we fed in incorrect (fake) passages to see how the model's processing would change.

### **2. Microscopic View: Role of Modules (MHA and MLP)**

Inside a Transformer (the architecture behind LLMs), there are two main module types:

- **Multi-Head Attention (MHA):** Think of this as the model's way of "paying attention" to different parts of the input—matching up relevant pieces of the query and the passage.
- **Multi-Layer Perceptron (MLP):** These layers do more general processing and transformation of information.

We discovered that both MHA and MLP play distinct and complementary roles in mixing knowledge:

- The MLP module is particularly sensitive to whether the external information is correct. If you swap a genuinely helpful passage for a fake one, the MLP's contribution to using external knowledge drops noticeably.
- The MHA module's behavior remains steadier regardless of whether external information is true or false.
- We could even manipulate the model's reliance on internal vs. external knowledge by "turning off" (deactivating) specific neurons associated with each type—sort of like pausing specific mental processes in the brain 3726302.3730112.pdf.

### **Why does this matter?**

By studying these processes, we provide new tools for building LLM systems where you can better control—or at least understand—how much they trust their own knowledge versus what they find externally. This insight helps debug, interpret, and improve LLM performance for sensitive or specialized applications.

### **Summary**

- Large language models can be improved with retrieval-augmented generation (RAG), which brings in external information.
- We mapped how knowledge "streams" through such models in four stages: refinement, elicitation, expression, and contestation.
- At the micro-level, the MLP module is more responsive to external information's quality than MHA is.
- Our findings help make LLMs more controllable and understandable for advanced AI tasks