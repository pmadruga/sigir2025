## RETRIEVAL AUGMENTED GENERATION WITH COLLABORATIVE FILTERING FOR PERSONALIZED TEXT GENERATION
https://dl.acm.org/doi/10.1145/3726302.3730075

### **The Big Picture**

Imagine you want AI to generate text—movie recommendations, news headlines, or scientific paper titles—that feels personal, like it understands your unique tastes and interests. Traditionally, we do this by looking at your past choices, and then have the AI generate something new using only that information. This approach works, but it misses a big opportunity: learning from people who are similar to you.

### **Key Problem**

Here's the issue we tackle: How can we help AI generate more personalized outputs not just by using your own history, but also by leveraging the experiences and behaviors of other users with similar interests? This is similar to how Netflix recommends movies—you get suggestions based not just on your own viewing history, but also on what "users like you" have liked. In AI text generation, this is less explored.

### **Our Approach: CFRAG**

To address this, we introduce a method called CFRAG—Collaborative Filtering for Retrieval-Augmented Generation. Think of CFRAG as a three-step teamwork process:

1. **Find People Like You:** We first find users with interests similar to yours using a technique called contrastive learning. This is like creating a digital fingerprint for each user's history, and then matching these fingerprints to find your "neighbors."
    
2. **Fetch the Right Information:** Once we know who's similar to you, we grab not just your past documents, but also relevant ones from your neighbors. We use advanced search models (retrievers) for this. But we fine-tune them using feedback from large language models (LLMs), so they fetch documents that actually help generate better personalized text, not just those that are similar on the surface.
    
3. **Sort What Matters Most:** With all these fetched documents, we need to decide which are most useful for the AI to use right now. That's where the reranking model comes in. It looks at the set of candidate documents and picks out those that will most likely help the language model generate the best output for your current request, again using your preferences and the preferences of your similar users.
    

### **Why Is This Better?**

Compared to existing methods, our approach:

- **Brings in diverse knowledge**: By considering similar users, AI has a richer palette of information to draw from. Sometimes your own history isn't enough; learning from like-minded users fills in the gaps.
- **Targets personalization**: Instead of just picking documents that are semantically close to your query, our models, with LLM feedback, prioritize those that truly matter for generating personalized output.
- **Fine-tunes with feedback**: We let the LLM "grade" which retrieved documents actually helped its response, and use that feedback to tune both the retriever and reranker—so the whole system gets smarter over time at finding helpful stuff.

### **How We Do This (In a Bit More Detail)**

- **Contrastive Learning for User Similarity**: To figure out which users are similar, we take each user's history, make a couple of "views" of it (e.g., cropping part of it, masking out pieces), and train a model so that different views of the same person look similar, and views from different people look different to the model. This forms a useful way to find "people like you."
- **Retriever and Reranker Tuning**: Normally, search models just care about semantic similarity. But for true personalization, we let the LLM tell us, after generating text, which documents it found most helpful, and use this signal to adjust how we look for and prioritize documents next time.
- **User History and Collaborative Filtering**: By experimenting with how many "neighbor" users to consider and how many documents to fetch from each, we found that a balance is key—too few and you don't benefit from collaboration; too many and you dilute your personal preferences.

### **Results and Evidence**

In real-world tests (on six datasets in the LaMP benchmark), CFRAG outperforms existing methods. Even just randomly picking from user histories is better than using no history at all, but our collaborative method outshines both—demonstrating how powerful it is to learn from similar users instead of going it alone.

### **Ablation Studies (What Happens If We Remove Pieces?)**

- If we stop retrieving from similar users and use only a person's own history, results drop—showing collaboration is crucial.
- If we use just plain search models, rather than ones fine-tuned with LLM feedback for personalization, quality suffers.
- If we don't rerank documents based on user preferences, results are also worse.

### **Summary**

In simple terms: Personalized text generation works best when your AI teammate doesn't just know you, but also knows who you're similar to. CFRAG is a way to let your AI learn from both you and your digital neighbors, leading to richer, more accurate, and more personally tailored results. We show that tailoring both the search for information and how it's ranked—using feedback from the powerful AI model itself—makes everything work even better