## Predicting RAG Performance for Text Completion
https://dl.acm.org/doi/10.1145/3726302.3730062

#### What's the Big Question We're Trying to Answer?

When using large language models (LLMs), sometimes we help them by first retrieving relevant information from a big pile of documents before asking the model to generate a completion or an answer. This process is known as Retrieval-Augmented Generation, or **RAG**. The main question our paper addresses is: **Can we predict in advance whether using RAG will actually help the language model perform better for a specific text completion, or if it might hurt or not change the performance at all?**

Why does this matter? Sometimes giving an LLM extra information helps, but at other times it can make things worse by distracting the model or giving it irrelevant data. If we can predict when RAG will help, we can save time, resources, and improve the quality of model outputs.

#### Our Approach, Step-by-Step

##### 1. **Defining Effectiveness**

First, we needed a way to measure how much RAG helps. We do this by comparing the model's probability of generating the correct next word (or token) in two settings:

- With RAG (using a retrieved passage)
- Without RAG (just the original prompt)

For each, we look at the probability the model assigns to the correct next token, and we use something called **perplexity**(basically, how "surprised" the model is by the correct token). Our measure of "gain" is the log difference between these probabilities. So, if using RAG makes the model more confident (less surprised) about the next token, the gain is positive 3726302.3730062.pdf.

##### 2. **Prediction Task**

The main task is: **Can we predict this gain before actually generating the token with the model?** In practice, we don't know the actual next token when we want to make the prediction—so we need to figure out ways to estimate whether using RAG will likely help or not, given only the inputs (the prompt, and retrieved passages).

#### **Prediction Methods**

We experimented with several ways to predict RAG's usefulness, inspired by ideas from information retrieval (search engines) and developed some new methods specifically for RAG:

##### **A. Pre-Retrieval Predictors**

These methods look only at the query (what you're looking for) before any documents are retrieved. For example:

- **SCQ**: Looks at how "important" the words in your query are based on statistics from the whole document collection.
- **IDF**: Checks if the query terms are rare (and thus more likely to be useful when found).
- **VAR**: Measures how much the importance of a query word varies across the collection 3726302.3730062.pdf.

##### **B. Post-Retrieval Predictors**

These look at the set of passages returned by the search system.

- **WIG**: Compares the top retrieved passages' scores to the average score of the whole collection—if the top passages stand out, retrieval is probably good.
- **NQC**: Looks at how much the top retrieval scores vary; more variation may mean better retrieval.
- **REF**: Compares your retrieval results to a "reference" result list using similarity measures.
- **BERT-QPP**: Uses a neural network to model the relationship between the query and retrieved passages, trained to predict effectiveness 3726302.3730062.pdf.

##### **C. RAG-Specific (Novel) Predictors**

Since RAG is special (the retrieved passage is used directly in text generation, not just for searching), we designed predictors that look at the relationship between the retrieved passage and parts of the prompt:

- **PredReranker**: Uses a neural network to judge how well the retrieved passage plus the remaining prompt predict the next token.
- **TripletPred**: Considers multiple combinations of the passage and prompt to make the prediction 3726302.3730062.pdf.

##### **D. Post-Generation Predictors**

Sometimes, you can actually run the LLM with and without RAG, and compare the two resulting probability distributions directly:

- **EntPred**: Measures the difference in uncertainty ("entropy") between RAG and no-RAG distributions.
- **DiverPred**: Measures how much the two distributions differ overall (using KL divergence) 3726302.3730062.pdf.

#### **Integrated Approaches**

We also tried combining several predictors together using a "mixture of experts" system (with machine learning), to see if a combination works better than each predictor by itself 3726302.3730062.pdf.

#### **Experiments & Results**

We ran experiments using large test datasets and popular modern LLMs (like Llama-3 and Falcon2). We measured how well each prediction method's estimates correlated with the actual measured gains of using RAG.

- **Takeaway:** The best predictors were the ones specifically tuned for the RAG setting and looked at the relationship between the passage and the prompt (like PredReranker and TripletPred). Standard search-based predictors and previous neural models for search didn't work as well for text completion with RAG.
- Also, integrating RAG-specific predictions with post-generation (entropy, KL divergence) could further improve performance.
- Efficient prediction is possible: you don't always need to run the LLM to get useful predictions about RAG's effectiveness 3726302.3730062.pdf.

#### **Why This Matters**

- If we can predict when RAG will help, we can use RAG selectively—saving computation when it won't assist, and maximizing performance for users.
- Our work provides a toolkit and framework to measure and predict RAG effectiveness, so future systems can be adaptive and more efficient.

#### **Summary in Plain English**

Think of RAG like helping a student (the LLM) by giving them relevant notes (retrieved passages) before answering a question. Sometimes the notes help, sometimes they distract. Our research is about building a "judge" who can look at the prompt and the candidate notes and decide, ahead of time, "Will these notes actually help the student answer better?" We tried various ways for this judge to make its decision, found some strategies that work well (especially those tailored to RAG's special scenario), and tested everything on real language model setups