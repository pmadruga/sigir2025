## MAAQR: AN LLM-BASED MULTI-AGENT FRAMEWORK FOR ADAPTIVE QUERY REWRITING IN ALIPAY SEARCH
https://dl.acm.org/doi/10.1145/3726302.3731950

### **What Problem Are We Solving?** 
When people search for things on e-commerce platforms like Alipay, they often use words and phrases that don't exactly match the words used by the sellers or the apps. For example, a user might type "pay bills" but the mini-app is labeled as "utility payments." This mismatch is called a vocabulary or lexical gap and can lead to bad search results—users might not find what they need, or they see mostly irrelevant items. To fix this, search systems rewrite or expand user queries to better match what's actually in the system.

### **Traditional Methods and Their Limits** 
Old-school methods add synonyms or related terms to a query, often based on things like click logs, simplified rules, or dictionaries. These help, but they don't deeply understand what users or items really mean, and they don't adjust quickly to new apps, new products, or changing user needs.

### **LLMs and Why We Use Them** 
Large Language Models (LLMs), like GPT-4, are exceptional at understanding and generating language. Using them, we can build systems that "rewrite" queries in smarter ways, making user queries align better with item descriptions. But, off-the-shelf LLMs might not know enough about Alipay's mini-apps or may not keep up with the latest trends and new vocabulary that arise on a platform. They also struggle with changes in user behavior and app content.

### **Our Solution: The MAAQR Framework** 
We designed a system called MAAQR (Multi-Agent Adaptive Query Rewriting) to overcome these challenges. Here's how it works, step-by-step:

1. **Knowledge-Enhanced Fine-Tuning:**  
    We "teach" an LLM more about Alipay mini-apps by generating lots of synthetic data—pairs of queries and the relevant mini-app keywords. This fine-tuning helps the model connect common search phrases to the words used by actual apps, improving its domain knowledge.
    
    - **Data Synthesis:** We use another LLM (like GPT-4) to generate many pseudo-queries associated with actual mini-app keywords.
    - **Supervised Fine-Tuning:** We train our main model on these pairs. It learns not just to predict keywords from queries (keyword-prediction), but also to rewrite queries as a human would (query-rewriting). We combine both tasks during training to make the model better all around.
2. **Multi-Agent Collaborative Rewriting:**  
    Instead of depending on a single approach, we use several "agents" (think of them as specialized mini-experts) with different strengths:
    
    - **RSQR (Relevance-Steered Query Rewrite):** Focuses on making queries more textually similar to the way people usually search in Alipay.
    - **ISQR (Intent-Steered Query Rewrite):** Focuses on capturing the intended task—rewriting the query so that the search system can match it with a mini-app that fulfills the user's intent, even if the words are quite different from the original query.
    - **KAQA (Keyword-Aware Query Adaptation):** Adjusts queries so that they align with the latest, professional keywords that describe mini-app functionalities. It uses feedback from RSQR and ISQR—to make sure rewrites match real, up-to-date mini-app content.
    - **QDUB (Query Decisions Driven by User Behavior):** This agent looks at how users interact with search results (for example, which queries lead to more clicks or purchases) and picks the most effective rewritten query for each case, maximizing practical business values.

Think of these agents like a group of chefs: each specializes in one cuisine, and the head chef (QDUB) tastes the results and chooses the best dish for the customer, considering both taste (relevance) and popularity (business impact).

### **How Does This Work in Practice?**

- The knowledge-enhanced LLM generates several possible rewrites for each user query.
- Each agent offers its perspective (textual similarity, intent match, keyword adaptation).
- The system uses data about what works best with real users (clicks, transactions) to pick the most impactful rewrite.
- This multi-agent approach keeps the query rewriting adaptive (it changes as new keywords are added, new apps are introduced, and user behavior shifts).

### **Experimental Results** 
We tested this system with real user queries—especially those that were long, tricky, or previously led to poor results. Compared to industrial baselines and other LLM rewriting methods, our MAAQR system:

- Brought back more relevant mini-apps for each search (higher recall).
- Improved the percentage of good search results.
- Led to higher click-through rates (people interacted with results more), more transactions, and more payment volume.
- Significantly reduced the number of searches that returned zero results.

Importantly, these improvements were achieved with minimal added system delay.

### **Key Takeaways:**

- Searches often fail because users and apps use different words.
- We train a smart language model to understand these differences using lots of (even synthetic) data.
- Rather than using one model, we use several specialized agents, each with its own way of improving search rewrites.
- We let real user behavior guide which rewritten query is best.
- This flexible, adaptive multi-agent system helps users find what they want faster and helps the business too.