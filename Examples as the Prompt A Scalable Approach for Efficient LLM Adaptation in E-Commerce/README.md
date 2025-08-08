## EXAMPLES AS THE PROMPT: A SCALABLE APPROACH FOR EFFICIENT LLM ADAPTATION IN E-COMMERCE
https://dl.acm.org/doi/10.1145/3726302.3731941

### **Step 1: High-Level Overview – What Problem Are We Solving?** 
In e-commerce, companies use Large Language Models (LLMs), like ChatGPT, to perform many tasks—such as understanding what users search for, making recommendations, or helping with customer support. Traditionally, fine-tuning an LLM for each new task takes a lot of time and computational resources. Instead, we can "prompt" these models with carefully written instructions and examples, saving effort and resources.

However, there are problems:

- Designing and maintaining prompts is time-consuming and often needs experts.
- Prompts need frequent updates as business needs change.
- It's challenging to select unbiased and representative examples for prompts.

### **Step 2: The Key Idea – What Is Our Solution?** 
We introduce a new framework called Examples as the Prompt (EaP). Instead of relying on humans to design the best prompts and pick examples, we let the system automatically select representative examples from real labeled data to use in the prompt. The idea is to maximize the model's few-shot learning ability—its capability to learn a task just from seeing a few examples.

Further, we introduce EaPlite, a version that removes natural language instructions from the prompt entirely and only uses labeled examples, making the model run much faster.

### **Step 3: Diving Deeper – How Does EaP Work?** 
Imagine you want the LLM to classify search queries into categories like "Product Search," "Category Search," or "Non-Shopping Query." Instead of crafting a prompt with handpicked example queries, EaP automatically selects the most useful examples from a large pool of labeled data.

EaP selects two kinds of examples:

- **Global Examples**: These represent the general distribution of all possible queries. We select these using methods like random selection or clustering so that we cover different types of queries broadly.
- **Local Examples**: These are chosen dynamically based on which ones are most similar to the actual input query the model is handling at the moment. We use mathematical techniques (such as cosine similarity on embeddings) to find the closest matches in the dataset.

By combining global and local examples, EaP ensures the prompt both covers the task broadly and adapts to specific cases.

### **Step 4: What About Performance?** 
We tested EaP on four real-world e-commerce tasks:

1. **Navigation**: Classify search intent as navigation or shopping.
2. **Order**: Is the query about a previous order?
3. **Deal**: Is the query about looking for a deal?
4. **Question2Query (Q2Q)**: Transform question-style queries into shoppable keywords.

In all these cases, EaP matched or beat the performance of carefully engineered prompts made by experts. Notably, for nuanced tasks like navigation intent, automatically chosen examples worked better because it's hard to describe in words precisely what counts as a navigation query.

### **Step 5: Why Does This Matter?**

- **Automation**: No need for manual curation of prompts or examples.
- **Adaptability**: Easy to update as business data or needs evolve.
- **Efficiency**: EaPlite (using only labeled examples) cut LLM inference time by up to 70% without reducing accuracy.
- **Business Impact**: When used in Amazon's data-labeling pipeline, this approach led to a measurable, though small, revenue improvement.

### **Step 6: Are There Any Special Insights?**

- Balancing the mix of global and local examples is important for best results.
- Even without lengthy natural language instructions, an LLM can learn from just a well-chosen set of examples.
- Managing prompt length is crucial, as longer prompts can slow down the LLM and make deployment impractical.

### **Conclusion—In Simple Words** 
Traditional prompting for LLMs in e-commerce is like constantly tweaking and rewriting instructions for a student. Our approach, EaP, is like giving the student lots of smartly chosen example problems instead—letting the system pick which examples to show. This makes the student (the LLM) learn the task faster, adapt to new problems, and work more efficiently—saving time, money, and expert effort. EaPlite speeds things up even more by skipping instructions and relying only on examples, with no loss in performance.

In sum, "Examples as the Prompt" is a smarter, faster, and more flexible way to get LLMs to do what you want in e-commerce—with less work and better results