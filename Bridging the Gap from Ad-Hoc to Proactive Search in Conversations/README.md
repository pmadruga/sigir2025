## BRIDGING THE GAP: FROM AD-HOC TO PROACTIVE SEARCH IN CONVERSATIONS
https://dl.acm.org/doi/10.1145/3726302.3729915

### **1. What's the main problem?**

When you chat with a search system (like a chatbot or digital assistant), sometimes you don't ask direct questions, but you mention things or discuss topics. In a normal setting, search systems wait for you to pose a clear query, then try to find an answer ("query–response" paradigm). But often, you might need information you didn't think to ask directly, or you mention something that could be clarified with just a bit of context.

**Proactive Search in Conversations (PSC)** is a new approach: here, the system tries to anticipate your needs. Instead of waiting for a clear question, it looks at the conversation as it unfolds and finds documents that might help—even if you didn't ask for them directly. This can either clarify things you talk about (conversation contextualisation) or predict what you might be interested in next (interest anticipation) 3726302.3729915.pdf.

### **2. What's the challenge?**

Current search systems are trained with short, direct queries—think of the questions you type into Google or a search box. But in conversation, what you say might be longer, less focused, or filled with context and chit-chat. If we feed this conversational text directly into the search engine, especially neural retrievers pre-trained on short queries, performance drops, because the inputs look quite different from what the model learned during training 3726302.3729915.pdf.

Even if we try to fine-tune these models on conversational data, there's still a mismatch: models expect short queries, but we give them long, messy conversation snippets.

So, **the core issue is a gap between the data the models were trained on, and the new data we want them to handle**.

### **3. What's our solution?**

We introduce a method called **Conv2Query** to bridge this gap.

Here's the intuition: **Instead of feeding the whole conversation into the retriever, let's learn to convert conversation snippets into concise, effective ad-hoc queries**, similar to those the search engines are used to. We do this in several steps:

- **Phase 1: Generate possible queries from documents.**  
    For each document known to be relevant at a conversation turn, we use a special model (Doc2Query) to generate a set of possible questions that people might ask to retrieve this document—imagine, for an article about "Staffordshire oatcake," generating queries like "What is a Staffs oatcake?"
    
- **Phase 2: Filter these queries to match the conversation.**  
    Not every query fits the current conversation. So, we use a filtering step that scores how well each generated query matches both the document and the conversation at hand. We keep the query that scores best—this is now a learning target for our system.
    
- **Phase 3: Train Conv2Query.**  
    We train a model to map conversational context to these filtered, concise queries. The model learns to "translate" chatty conversation into effective search queries.
    
- **Phase 4: Use this at inference time.**  
    When the system is deployed, given a new conversation snippet, it generates a concise query using our trained model. This query is then sent to a retriever (which is much happier now, since it's seeing familiar style queries again).
    
- **Phase 5 (optional): Fine-tune the retriever.**  
    We can further improve things by fine-tuning the neural retriever with these filtered queries, letting it become even better at matching queries to relevant documents 3726302.3729915.pdf.
    

### **4. Why does this work?**

By converting conversations to effective queries, we:

- Reduce the input mismatch between training (short queries) and test time (long conversations).
- Allow the retriever to use its existing knowledge much more effectively.
- Enable proactive, contextual retrieval of relevant documents in conversational settings.

We show experimentally this process leads to better retrieval quality, especially when our query filtering step considers _both_document relevance and conversational fit. This step is critical: without it, learning is slower and quality is worse 3726302.3729915.pdf.

### **5. How did we evaluate it?**

We compared different settings:

- Feeding conversation directly (no conversion).
- Generating queries, but not filtering carefully.
- Our approach: generate and carefully filter queries.

We measure how often the system retrieves the correct document at the top of the list, using metrics like Precision@1 and MRR@10 3726302.3729915.pdf.

Our approach consistently outperforms baselines, showing the importance of bridging the input gap with our query conversion and filtering.

### **6. In summary**

- PSC aims to proactively retrieve useful information in conversations, without needing explicit queries.
- Existing systems struggle because conversational input is messy compared to what they are trained on.
- Our method, Conv2Query, learns to convert conversations into effective queries, bridging the gap.
- Careful filtering of which queries to use as training targets is key.
- Experiments confirm Conv2Query boosts retrieval effectiveness in conversational settings 3726302.3729915.pdf.

If you had to teach this to a friend: **The cool part is not just matching conversations to documents, but learning to ask the right search question on the user's behalf, so the system can help even when you don't know what to ask next!**