## A UNIFIED RETRIEVAL FRAMEWORK WITH DOCUMENT RANKING AND EDU FILTERING FOR MULTI-DOCUMENT SUMMARIZATION
https://dl.acm.org/doi/10.1145/3726302.3729884

### **1. What is the problem we're tackling?**

We focus on multi-document summarization (MDS). That means: given several documents all talking about the same topic (like different news articles about the same event), the goal is to create one concise summary covering all the important points.

But there are two big challenges:

- **Input length limits:** Modern summarization models (especially those based on transformers) can only take in a limited number of words/tokens at a time. If you feed in too much, some information gets chopped off.
- **Retrieval reliance:** To get around these limits, most people "retrieve-then-summarize" — i.e., pick out what they hope are the most important parts from all documents (retrieval) and then let the summarizer write the summary. But existing retrieval methods usually depend on _manually written queries_ (like topic statements or search terms) and work with whole sentences or passages, which can mix relevant and irrelevant information together 3726302.3729884.pdf.

### **2. Why is the _query_ part problematic?**

Let's use an analogy: imagine you're trying to quickly find the most useful sentences in a pile of articles. Most systems need you to give them a specific query, like "Rescue operations in the Solomon Islands," which they use to rank/retrieve text. But:

- Writing good queries is hard and labor-intensive, especially since, for MDS, the documents themselves _collectively_ define the topic.
- Plus, if you focus on sentences or passages, you're often dragging in extra, irrelevant stuff that muddies your summary.

### **3. What's our main idea (our solution)?**

Our main innovation is to automate both the _query selection_ and _retrieval granularity_:

- **Automatic query selection:** Instead of having people write queries, our system learns to select the most important queries directly from the documents themselves. The key insight: MDS documents are about the same topic, so it's possible to find their shared focus by analyzing their content, instead of asking for it up front.
- **Finer-grained retrieval with EDUs:** Rather than retrieving whole sentences or paragraphs, which can contain extra fluff, we break down text into Elementary Discourse Units (EDUs). Think of EDUs as the smallest meaningful pieces of a text (like "They have tried to refloat the vessel since Thursday"). They're more atomic than sentences but more meaningful than just words 3726302.3729884.pdf. This lets us filter out irrelevant bits more effectively, packing more important info into the limited context length of the summarizer.

### **4. How does our approach actually work?**

- We use a special parser (DMRST) to segment the text into EDUs.
- Our retrieval framework then scores both documents and the EDUs inside them for importance.
    - For _document ranking_, it decides which documents in the collection are most relevant to the central topic, ranking them accordingly.
    - For _EDU filtering_, it filters out those EDU pieces that are less relevant, so only the most critical info remains.
- Both of these steps are _automatic_ — the model figures out the relevant queries and what to keep (and what to drop) as it processes the data.
- The key is an EM algorithm that lets the system dynamically infer good queries and simultaneously filter irrelevant units.

### **5. How is this better than previous methods?**

- No manual query writing or reliance on dataset-provided queries 3726302.3729884.pdf.
- Less risk of pulling in irrelevant information, because we're working with finer units (EDUs, not just sentences/paragraphs).
- Our approach improves both:
    - **Retrieval quality:** Better alignment with "salient" (i.e., really important) content and less inclusion of non-salient stuff. Metrics like Precision@K and NDCG@K (which measure how well the top-K items match what a human would pick) show we beat strong baselines like BM25 or DYLE 3726302.3729884.pdf.
    - **Final summary quality:** In both automatic and human evaluations, our summaries are more informative and contain less irrelevant information 3726302.3729884.pdf.

### **6. Experiments and Results**

We tested our retrieval+summarization framework on major MDS datasets (news, Wikipedia, scientific papers) and with a range of standard summarization models (BART, PEGASUS, PRIMERA, LLaMA, etc.) 3726302.3729884.pdf. Our method not only leads to better input selection for these models, but also improves their final output summaries, according to standard benchmarks like ROUGE and in human evaluation 3726302.3729884.pdf.

### **7. Why does this matter?**

With ever-growing data and the popularity of large language models, how you select and condense information from multiple sources is crucial. Our work shows that you can get better summaries—not by asking more of humans, but by being smarter about automatic content selection and fine-grained filtering.

### **Summary in a sentence:** 
Our model-agnostic retrieval framework for multi-document summarization replaces manual query needs and coarse-grained selection with automatic, fine-grained EDU-based ranking and filtering, leading to more informative and focused summaries