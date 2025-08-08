## KNOWING YOU DON`T KNOW: LEARNING WHEN TO CONTINUE SEARCH IN MULTI-ROUND RAG THROUGH SELF-PRACTICING
https://dl.acm.org/doi/10.1145/3726302.3730018

### **1. What problem are we solving?**

Imagine you're using a smart assistant (like an AI) to answer tough questions that require more than one Google search. These systems, called Retrieval Augmented Generation (RAG), combine large language models (LLMs, like GPT-4) with search engines—they "retrieve" information, then "generate" answers.

Now, the tricky part is when a single search isn't enough. Sometimes, the AI needs multiple rounds: search, think, ask again, search more, and only then answer. The real problem is knowing: When does the AI have enough information to answer confidently? Or should it keep searching? Humans naturally know when they "don't know enough"—but current AI is bad at this. Existing AIs often stop too early, give answers with missing facts, or waste time searching long after they have what they need.

### **2. How does the paper address this with SIM-RAG?**

We introduce a framework called SIM-RAG (Self-Practicing Inner Monologue RAG). The idea is to give the system a new "self-awareness"—like an internal monitor—that checks each time: "Do I have enough info for a good answer yet?" If yes, it answers. If not, it searches more.

SIM-RAG has three components:

- **Reasoner:** The LLM that tries to answer the question using whatever info it's got so far.
- **Retriever:** An external search engine or database the system can ask for more documents (like performing a Google search).
- **Critic:** A smaller, separate model—like a judge—that inspects the Reasoner's current answer and the supporting evidence, and decides if there's enough to proceed or if more searching is needed.

### **3. How does SIM-RAG work step by step?**

Let's walk through an example round:

1. **Question & Initial Context:** The user asks a question—no context yet.
2. **Answer Generation:** The Reasoner tries to answer with what knowledge it has. It also explains its reasoning (this is called generating a "rationale").
3. **Sufficiency Inspection:** The Critic examines the answer, the rationale, the original question, and any previously found documents.
    - If the answer is well-supported, it ends the process and returns the answer.
    - If not, we continue.
4. **Information Retrieval:** The Reasoner creates a search query (based on what seems missing) and asks the Retriever for more documents.
5. **Loop:** The new information is added to the context and we go back to step 2. The cycle repeats until the Critic is satisfied, or a set maximum number of rounds is reached.

This mimics how a human might approach answering a tough question, searching and thinking iteratively, and always checking if they've got enough to respond.

### **4. How do we train this system (the tricky part!)?**

A big challenge is training the Critic—how does it learn to judge if an answer is "sufficient"?

Most past work relied on humans to label each reasoning step ("Is this answer good? Is there enough information?"). That is expensive and slow.

Our solution: **Self-Practicing.** Instead of humans, we have the whole RAG system practice on standard question-answer datasets. In training, it tries to answer each question:

- If its generated answer matches the ground-truth answer, we log this as a "sufficient" episode.
- If not, we log it as "insufficient," along with what it tried and what documents it had. At each step, we record the question, the documents retrieved so far, the attempted answer, and the rationale.

This way, the system generates lots of training data for itself—learning both what "enough evidence" looks like and what "not enough" looks like, as judged against known answers. The Critic then trains to classify these situations as acceptable or not.

### **5. Why is this important or novel?**

- **No expensive human mid-step labels:** We create all necessary training data by self-practice, saving time and resources.
- **More reliable multi-round RAG:** The Critic stops the Reasoner from guessing prematurely or searching endlessly.
- **Lightweight and modular:** The Critic is small and can be plugged into any RAG system.
- **Works across tasks:** Experiments show improved performance with both small and large models, especially on complex, multi-step problems.

### **6. Experiments and findings**

We tested SIM-RAG on benchmark question-answer datasets, comparing to standard RAG and to alternatives where the main model tries to "self-criticize." The results:

- SIM-RAG consistently outperforms regular RAG—especially on hard tasks needing multiple retrievals—and does so even when using a lightweight Critic.
- Using the same general-purpose LLM as both Reasoner and Critic sounds good, but in practice, an independent Critic is better, especially for tough, multi-hop reasoning where self-critique models struggle.

Confusion matrices show the Critic is especially good at rejecting insufficient answers, leading to higher reliability.

### **7. Quick analogy**

Think of a student (Reasoner) tackling research projects with a research assistant (Retriever) and a strict advisor (Critic). The advisor checks every draft. If the student's draft is missing evidence, the advisor sends them back to the library. Only when the advisor is convinced does the answer get submitted. This system prevents poor work or endless searching.

### **In summary:**  
SIM-RAG teaches AI assistants to "know when they don't know"—and to search systematically until they do. It does this using a simple, modular Critic trained through the system's own practice sessions, all without relying on expensive human supervision. This approach brings us closer to reliable, efficient AI that can handle deep, multi-step research tasks—much like a cautious but resourceful human researcher would