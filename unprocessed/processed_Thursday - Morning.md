
# Overview

### 1. What is this workshop about?

This workshop is all about learning how to use big computer programs called Large Language Models (LLMs)—like GPT-4—to help automatically judge and evaluate other computer systems, especially search engines, chatbots, and recommendation systems. As these LLMs get smarter, they can help us figure out how good these other systems are, faster and sometimes better than just relying on people.

**Key points:**

- LLMs can now do things smaller models couldn’t, like understanding complex tasks.
- Researchers want to use LLMs to automatically "evaluate" or judge if search engines or chatbots give good answers.
- The field is new, so there are big questions—like how fair these LLM evaluations are, or when we still need humans to judge, especially if the thing being judged is more about opinion, or if the system is very personalized.


### 2. Why is this important?

- Search engines and chatbots are becoming more personal and can talk to us, not just give us lists.
- It’s hard for people alone to keep up with evaluating whether these systems work well and fairly.
- If we can use LLMs for evaluation, it could make the process faster, but we need to make sure it’s still fair and accurate.


### 3. What will happen at the workshop? (how will it run, simplified)

- **Interactive sessions**: Instead of long lectures, people will sit together in small groups (roundtables) and really talk, share ideas, and discuss problems.
- **Discussing three main topics**:
    1. **Evaluating personalized systems**: How do we judge systems that behave differently for each person, and keep things fair?
    2. **Machine vs. Human judgment**: When can LLMs alone judge (especially on questions of taste or opinion)? When is a human still needed?
    3. **New systems that mix everything**: How do we evaluate systems that aren’t just search engines, but also recommend products or have conversations?
- **Goal**: By talking through these points, the group wants to shape the best ways to judge modern search and chatbot systems.


### 4. Quick Summary

This workshop brings people together to figure out the best ways to use powerful language models to judge how good new, interactive information systems are—by talking, debating, and sharing experiences instead of just listening.

-----
# Presented Papers

## LLM4EVAL: LARGE LANGUAGE MODEL FOR EVALUATION IN IR
https://dl.acm.org/doi/10.1145/3726302.3730367

### **Step 1: Identify the Main Idea**

Our paper presents the third LLM4Eval workshop, which is dedicated to exploring how large language models (LLMs) can be used to evaluate information retrieval (IR) systems. IR systems are those you use every day—think of search engines, recommender systems, and chatbots that help you find the information or products you need.

### **Step 2: Explain the Big Concepts in Simple Terms**

**A) Why Do We Need LLMs for Evaluation?**

Traditionally, we evaluate IR systems by having people (called annotators) judge the relevance of results provided by these systems. But now, with modern systems becoming more complex—incorporating search, recommendations, and even conversations—human-centric evaluation is hard to scale.

LLMs, like ChatGPT or GPT-4, offer a way to automate some of these evaluations. They can simulate how users might judge relevance, coherence, or the helpfulness of a response. That’s promising because it might let us run more evaluations, faster and at less cost.

**B) What Challenges Are We Tackling?**

1. **Personalization:** Modern IR systems adapt to users’ preferences, changing their behavior based on who’s interacting with them. Evaluating whether those personalized systems are actually providing better results is much harder than just checking if a single, generic answer is relevant.
    
2. **Complexity and Interactivity:** Users increasingly interact with systems by searching, asking questions, and refining results across sessions. New systems often combine search, recommendations, and chatbots all at once. Evaluating these multi-component, interactive experiences demands new frameworks.
    
3. **Automated vs. Human Judgment:** LLMs are good at some evaluation tasks but not all. For subjective or nuanced assessments, like how natural a conversation feels, humans are still better. We explore where automation can help and where it can’t.
    

### **Step 3: Use Examples and Analogies**

Imagine you want to know if a smart assistant is truly helpful. If you just look at the final answer it provides, you might miss whether it listened to your preferences, followed the conversation naturally, or provided explanations you could trust. Human judges can pick up on these nuances, but it’s expensive and slow to gather lots of data this way.

What if we could train LLMs to mimic human judgment? We might ask an LLM to role-play as a user and provide feedback. However, we need to check if this “AI judge” sees things the way people do—otherwise, we risk optimizing our IR systems for what LLMs like, not what humans need.

### **Step 4: Address Underlying Principles and Open Questions**

- We highlight **four big research priorities**: making sure LLM-based evaluations are valid (actually measuring what matters), reducing random variations from LLM prompts, making results reproducible, and understanding how humans and LLMs interact during evaluation.
    
- As IR systems become more **personalized** and interactive, we need new kinds of tests: not just “Is the answer right?” but “Did the system adapt to this specific user?” and “Were the interactions coherent and helpful?”
    
- There are also **ethical and fairness concerns**—using LLMs as evaluators brings risks of privacy loss or reinforcing biases, especially if the LLMs themselves have limitations.
    

### **Step 5: Summarize the Workshop Format and Goals**

This workshop brings together researchers from search, recommendations, and conversational systems. We encourage active discussions, lightning talks, poster sessions, and roundtables instead of just one-way presentations. Our goal is to foster fresh insights and collaborative approaches for evaluating the IR systems of tomorrow—ensuring that as these systems grow more sophisticated, our methods for judging their effectiveness evolve too 3726302.3730367.pdf.

### **In short** 
This paper outlines the motivation, challenges, and planned activities for a research workshop that focuses on using LLMs for the evaluation of increasingly complex, personalized, and interactive information retrieval systems, highlighting both opportunities and open questions for academia and industry

---------

## The workshop

## Evaluating Causal Explanation in Medical Reports with LLM-Based and Human-Aligned Metrics
https://arxiv.org/abs/2506.18387

### **1. What is the core question?**

We want to know: How well do different automatic tools and methods measure the quality of explanations—especially causal explanations—in medical reports (like those given by AI or computer programs)?

### **2. Why does this matter?**

Doctors rely on not just information in reports (like X-ray findings), but also on the reasoning—the “why” and the “how” certain findings lead to a diagnosis. Many current computer-generated medical reports focus on saying what was found, but not explaining why those findings support a particular diagnosis. For these reports to be genuinely useful in real clinical work, they need to show reasoning, just like a good doctor would.

### **3. How are medical reports usually evaluated?**

Think of automatic evaluation like grammar checkers or plagiarism detectors: they can compare a student’s essay to a reference answer and give a similarity score based on words (like “BLEU,” “ROUGE,” etc.). But medical reasoning goes deeper than just similar words or phrases.

For example, if you write “The man wore a blue shirt” and “The gentleman had a navy shirt on,” they’re similar in meaning but may score low in basic similarity metrics.


### **4. What did we test in this paper?**

We wanted to evaluate AI-generated medical reports—specifically, how well they give _causal_ explanations (the “because” behind the diagnosis). We tested six different evaluation methods:

1. **BERTScore:** Measures how similar the words are using a language model trained on lots of text.
2. **Cosine Similarity:** Turns sentences into points in space (vectors) and measures how close they are.
3. **BioSentVec:** Like BERTScore, but trained on medical text (so it “understands” medical language better).
4. **GPT-White:** A version of GPT (a large language model) that evaluates reports using a structured scoring guide, mostly looking at fluency, clarity, and completeness.
5. **GPT-Black:** Another version of GPT, but focused on the logical structure and making sure the reasoning makes sense and all the steps are clear.
6. **Expert Qualitative Review:** Actual doctors or clinical experts read the reports and judged how complete, logical, and clear they were.

We tested these methods on two kinds of report generations:

- Based on direct observations (like a radiologist reading an X-ray)
- Based on multiple-choice answers (where the AI had to justify the answer)


### **5. What did we find?**

- **GPT-based metrics (GPT-Black and GPT-White) and expert evaluations were the best** at recognizing when reports had strong, logical, and clinically correct explanations.
    - GPT-Black was especially good at picking out which reports had the best logical and causal reasoning (it “understood” the chain of thought required in a real diagnosis).
    - GPT-White did well at evaluating based on structured criteria and was often in agreement with expert reviewers.
- **Basic similarity metrics (BERTScore, Cosine Similarity) were limited.**
    - They often rewarded reports for using the right words or phrases, but couldn’t tell if the reasoning was correct—sometimes a report looked “similar” but wasn’t logically sound.
    - For example, a report might repeat the right terms but fail to explain why those terms matter for the diagnosis.
- **BioSentVec helped a bit with medical language**, but its scores were generally clustered closely, so it wasn’t as good at telling the best from the worst explanations.


### **6. Does how we combine the scores matter?**

Yes! If you prioritize the metrics that judge reasoning and explanation (like GPT-Black), the top models are those that give the best causal explanations. If you treat all metrics equally, models that are simply good at copying surface similarity can get ranked higher, which isn’t what we want in a clinical setting.


### **7. What are the take-home lessons and future directions?**

- To judge how good an AI-generated medical report is, _especially_ for anything that involves reasoning or explanation, you should rely on metrics designed for that task (like well-structured GPT evaluations and expert human review).
- Metrics that just look at word similarity aren’t enough for medicine, because “close enough” isn’t good enough for diagnoses and patient safety.
- Evaluation methods need to keep evolving to handle more complex cases—like explanations that require remembering events over time, considering multiple possible diagnoses, or integrating information from different parts of the report.
- In the future, mixing expert feedback, improved AI evaluators, and domain-specific tools (like knowledge graphs for medical logic) could make assessments even more reliable and meaningful.


### **Summary in simple terms:**  
Just checking for similar words isn’t enough to measure how good an AI is at explaining things in medical reports. The best evaluation methods act more like experts: they look for clear, logical reasoning and complete explanations. That’s crucial if we want AI to support doctors safely and effectively in real-world medicine

------

## Deeper than the pool are language models really suited for completion of unlabeled query document judgement

### **High-Level Summary**

Traditionally, evaluating how well information retrieval systems (like search engines) work has relied on humans judging which items (like documents or images) best match a given query. This is expensive, slow, and, as these "human labels" become the gold standard, it also brings in bias and subjectivity.

Recently, with the rise of large language models (LLMs) and vision-language models (VLMs), researchers wonder: can we use these AI systems instead of humans to judge relevance? This would make evaluation cheaper and quicker, but it might introduce new issues.

Our paper explores:

- How reliable these LLMs and VLMs are at acting as judges,
- How their judgments compare to humans,
- How different types of queries (concrete/descriptive vs. abstract/conceptual) and types of input (text, image, or both) affect this reliability.

Let’s break each part down further.

### **1. Why Do We Need Good Evaluation?**

Suppose you build a search engine for images. After a user enters "cats playing piano," your system needs to rank a database of images based on how relevant they are to that query. But how do you know if your system’s ranking is actually good?

For that, you need a set of example queries and images, where for each, someone has already labeled which images are good matches. This “ground truth” is usually built by human workers, but it’s costly, slow, and—because humans are inconsistent—sometimes noisy or even inaccurate LLM4Eval_SIGIR_2025.pdf.

To speed up, some have started using LLMs, which can “simulate” human judgment by reading a query and an item (like an image caption) and deciding on relevance. This process is called “LLM as a Judge.” Some people think it's time to replace humans with LLMs altogether, but others point out problems, especially when LLMs are asked to patch incomplete human annotations or their own output gets used as the new gold standard LLM4Eval_SIGIR_2025.pdf.


### **2. What’s New in This Paper?**

To understand the limits of human and AI judgment, we focus on a specific dataset called conQA. This is a testbed for text-image search in which someone enters a query and the system needs to find the right image(s).

But there’s a twist: conQA includes both:

- **Descriptive queries** (“people chopping vegetables”) — which refer to observable, concrete details.
- **Conceptual queries** (“working class life”) — which are much more abstract and not tied to specific objects.

Previous work has shown that conceptual queries are much harder for both machines and, sometimes, humans to judge LLM4Eval_SIGIR_2025.pdf.

To evaluate how good LLMs/VLMs are, we:

- Re-annotate (i.e., relabel) parts of the conQA dataset with clearer scales of relevance and stronger validation (to minimize human disagreement).
- Compare several models, both closed-source (like GPT-4) and open-source (like Gemma-3-27b-it), on their ability to judge relevance for both types of queries and for different input modalities (text captions, images, or both).

### **3. Key Findings**

**A. LLM/VLM Judgment Quality Varies by Task and Input Type**

- On **descriptive (concrete) queries** and with **image input**, LLMs like GPT-4o can align extremely well with the human “consensus,” sometimes even matching or surpassing the agreement you’d expect from a single human annotator versus the average human label LLM4Eval_SIGIR_2025.pdf.
- On **conceptual (abstract) queries**, performance drops dramatically—sometimes by up to four times—showing the major difficulty that even state-of-the-art models face with abstraction or high-level concepts compared to concrete details LLM4Eval_SIGIR_2025.pdf.

**B. Input Modality Matters**

- Using _only images_ as input yields much better agreement with human ratings than using captions alone.
- Combining images and captions doesn’t always help; sometimes, it introduces conflicting signals and reduces agreement, especially for models that aren’t robust to such “noise” LLM4Eval_SIGIR_2025.pdf.
- Using images is more computationally costly (time and tokens) than processing text captions.

**C. Annotation Quality Issues**

- The original conQA dataset had noisy labels (“Unsure” options, contradictory votes by different people).
- By re-labeling with a clearer, forced-choice four-point relevance scale and filtering low-quality labels, we improved the quality (agreement and interpretability) of relevance judgments LLM4Eval_SIGIR_2025.pdf.

**D. Trade-offs and Cautions**

- Solely relying on LLMs/VLMs for annotation can introduce systematic bias; depending on what model is used, entire system rankings can be unfairly boosted or penalized.
- Mixing human and LLM labels can result in lower agreement with the “true” ranking than just using LLMs or humans alone.
- Some researchers warn that if we use LLMs to create the gold standard, we might trap ourselves—future systems are measured against the average of past LLM predictions, stifling progress and innovation LLM4Eval_SIGIR_2025.pdf.

**E. Recommendations**

- Always validate model-generated judgments against task-specific human assessments before deploying automated pipelines.
- Beware of the “abstraction gap”—models (and humans!) struggle more with queries requiring imaginative links or conceptual understanding than with concrete, descriptive information.


### **4. Implications**

- For practical evaluation, LLMs (especially with well-designed prompts and careful modality selection) can be a cost-effective alternative to human annotators—_but only in some cases_ (especially descriptive queries).
- Conceptual or abstract search remains a challenge for both AI and human annotators—future work may benefit from integrating knowledge graphs or symbolic reasoning to supplement pure pattern recognition models.
- The community needs to exercise caution before fully replacing human evaluators, especially to avoid echo chambers or “self-imposed ceilings” on progress LLM4Eval_SIGIR_2025.pdf.

### **5. Final Thoughts**

The move to AI-driven evaluation has big promise—significant speed and cost gains—but isn’t free of pitfalls. What matters is _not_whether LLMs can replace humans everywhere, but under what conditions, for which kinds of queries, and with what types of inputs do these models align best with the nuanced, sometimes messy judgments real humans provide.

We hope our work helps clarify best practices and the current limits, encouraging a nuanced adoption of LLMs/VLMs as judges in IR evaluation, rather than a blanket replacement of human annotation

------

## LLM-based relevance assessment still can't replace human relevance assessment

### **What's the fundamental question here?**

We’re asking: Can large language models (LLMs) — specifically tools like ChatGPT or specialized systems like Umbrela — fully replace human judges in deciding whether search results are relevant to a user's query? Some recent studies, especially by Upadhyay et al., claim that the answer is "yes" — that LLM-based judgments can stand in for human ones in information retrieval tasks, like those in the TREC community.

**Let’s break it down even further:**

### 1. Background — Why Do We Care?

When you use a search engine, the goal is to get results that are most useful to you. To improve search engines, researchers run experiments: a set of queries and a set of documents, and humans judge which documents are relevant to which queries. These human judgments are the "gold standard" against which we evaluate search systems.

LLMs are now very good at understanding language. Some people suggest we can use LLMs — instead of humans — to judge whether search results make sense and match the user's needs.

### 2. What Did Recent Work Claim?

A recent study by Upadhyay et al. compared LLM-based assessments (automated) to traditional human assessments (manual) with data from a 2024 TREC competition. They found a strong correlation (agreement) between LLM and human judgments. They went so far as to say that LLM-based assessments can "replace" humans for these tasks, potentially saving time and resources.

### 3. Why Are We Skeptical?

First, while the numbers look good on average, they can be misleading. If you only look at general agreement (using something called Kendall’s tau, a measure of correlation), you might miss where LLMs make big mistakes — especially among the top-performing systems, where precise distinction really matters. For instance, some systems do well with LLM assessors but poorly with humans, and vice versa; this disagreement is critical if you’re trying to pick the best systems.

Second, we demonstrated through experiments that it’s possible to game the LLM-based evaluation. If you know how LLM assessors make decisions, you can design a system that scores highly according to the LLM — even if humans would not find its outputs useful. For example, we submitted runs where we used the same LLM used for judging as a part of the retrieval system itself. The circularity resulted in a dramatic inflation of scores — the LLM "loved" its own thinking, but humans didn’t agree.

If researchers were to accept LLM-based assessments as the gold standard, you could end up with systems that optimize for what the LLM wants, not for what real users want. Over time, this could lead to an ever-growing disconnect between system evaluation and human needs.

### 4. What are the Deep Theoretical Issues?

- **Circularity/Narcissism**: If LLMs create the responses, and another LLM (or the same) grades those responses, it becomes a feedback loop. LLMs might favor or "recognize" their own work, a phenomenon called narcissism, leading to over-optimistic evaluation scores.
- **Bias**: Recent work shows LLM-based judges tend to overrate LLM-based retrieval systems, compared to human judges [3, 8, 9]. Human judgment reflects real preferences; LLMs can have systematic biases or be tricked with clever prompt attacks 2412.17156v2.pdf.
- **Gold Standard Requirement**: The whole idea of a gold standard in evaluation comes from having human judgments. LLM assessments, no matter how good, can only ever be predictions — not the ground truth.

### 5. Practical Analysis & Reproduction

We re-analyzed the data from Upadhyay et al. By removing the worst-performing systems and looking only at strong ones, we found the correlation drops, and disagreements between LLM and human rankings become more pronounced. This matters a lot in real-world development, because those small differences are what researchers care about most.

### 6. Empirical Demonstrations

- **Deliberate Subversion**: When systems start to optimize for LLM-based scoring, it becomes easy to "cheat" the metric, sometimes without even realizing it.
- **Simulation of Circularity**: Our experiments showed that if everyone adopted an LLM-based re-ranker, and evaluations were also performed using that same LLM, leaderboards became unreliable — good performance was often an artifact of circularity, not genuine progress.

### 7. Conclusions

LLMs are impressive and useful tools, and LLM-based judgments can be a helpful component in relevance assessment. But replacing humans entirely is risky and fundamentally flawed — human judgments are essential, especially as evaluation tasks evolve and researchers continually innovate.

If the field moves uncritically toward automated LLM-based evaluation, there's a real danger: advances may no longer reflect real improvements for users, but instead just better "tricks" to score well with an LLM grader. We need to proceed with caution.

### **Key Takeaway:**  
While LLMs help speed up and standardize some evaluation tasks, human judgment remains irreplaceable as the gold standard, particularly when the field is innovating and improving. Automatic LLM assessment is not ready — and may never be fully ready — to stand alone as a substitute for human judgment in information retrieval evaluation

-------

## CCRS: A Zero-Shot LLM-as-a-Judge Framework for Comprehensive RAG Evaluation
https://arxiv.org/abs/2506.20128

### **What is being studied?** Retrieval-Augmented Generation (RAG) systems, such as those used in chatbots or question answering, combine two main parts:

1. A retriever that fetches relevant documents or passages (think: searching for articles or facts).
2. A generator (an LLM, like GPT) that writes responses based on this context.

The main challenge: How do we fairly evaluate if RAG systems are actually good at providing accurate, comprehensive, relevant, and well-written answers? Traditional metrics (like BLEU or ROUGE) compare generated text to a reference, but they don’t tell us if the answer is truly grounded in retrieved evidence, complete, or factually correct.

**Why is this important?** In domains like medicine or law, inaccurate or ungrounded responses can have serious consequences. It’s not enough for a system to sound good—the answer must be factually correct, based on reliable context, and cover the necessary information.


### **What’s wrong with existing evaluation methods?**

- **Traditional metrics** (BLEU, ROUGE, BERTScore): Good for text similarity, not for factual accuracy. They can’t penalize answers that are fluent but wrong, or reward those that are factually correct but phrased differently.
- **Specialized RAG evaluation frameworks** (like RAGAS, RAGChecker, CRUD-RAG, ARES): They offer improved analyses but are often complex, slow, or require lots of extra setup (such as extracting individual claims, running multiple entailment checks, or requiring large training datasets for specialized judges) 2506.20128v1.pdf.

So, although powerful, these tools are hard to use for rapid development or large-scale evaluation.


### **What does this paper propose?**

We introduce **CCRS (Contextual Coherence and Relevance Score)**: a new, efficient framework that uses a powerful LLM (as a “judge”) to directly score responses across multiple important dimensions, in a zero-shot, end-to-end way.

### **How does it work?**

- No need for extra claim extraction, fine-tuned judges, or complex pipelines.
- The LLM judge scores each response based on:
    - Contextual Coherence (CC): Is the answer well-structured and logically coherent?
    - Question Relevance (QR): Is the answer relevant to the query?
    - Information Recall (IR): How much information did the answer recall from the references?
    - Answer Correctness (AC): Is the answer factually correct, compared to ground truth?
    - Information Density (ID): Is the answer concise and free of unnecessary information?

### **Why is this better?**

- **Comprehensive**: Each key aspect of answer quality is covered.
- **Efficient**: 5x faster than some claim-based methods. No need for claim extraction or entailment steps.
- **Correlates well with expert judgment**: There’s strong evidence (e.g., strong link between AC and IR) that these metrics meaningfully capture what experts want to measure 2506.20128v1.pdf.


### **What did we do in practice?**

We benchmarked six different RAG system variants (combinations of retrievers and generators) using the challenging BioASQ biomedical QA dataset. This dataset makes it easy to see differences between top-performing systems because it’s difficult and nuanced.

### **Main findings:**

1. **LLM Reader Dominates:** The choice of generator LLM has the biggest impact on end quality. Mistral-7B, for instance, greatly outperformed Llama-3 models across all core metrics—showing that picking a good generator is vital.
2. **Retriever Choice Matters, but Less:** Using a neural retriever (E5) brought notable gains in relevance and recall for the Llama models, but these didn't automatically translate into more correct answers. Having more relevant documents isn’t enough; the generator must “understand” and use them correctly.
3. **Size isn't everything:** Smaller models like Llama3.2-3B did better in some aspects (relevance, coherence), possibly due to higher-quality training data, but the larger Llama3-8B recalled facts more accurately.

Importantly, we saw that **answer correctness** and **information recall** are often weaker points, especially in biomedical settings—meaning current models still struggle to be both complete and factually accurate.


### **How does CCRS stack up against existing methods?**

- CCRS offers comparable or better discriminative power compared to frameworks like RAGChecker or RAGAS, as it effectively captures differences in key quality dimensions.
- It does this with much lower computational cost and complexity, making it practical for ongoing system development and comparison 2506.20128v1.pdf.


### **Limits and next steps:**

- Some dimensions, like question relevance, show “ceiling effects” (most systems score high, less useful for distinguishing between “good” systems).
- Overall answer correctness scores remain low—highlighting the need for ongoing work in both model improvement and metric calibration.


### **Take-home summary:**  
RAG systems are only as good as the weakest link between what gets retrieved and how well the model uses it to generate a faithful answer. Traditional evaluation methods miss a lot of what matters. The CCRS framework lets us judge multiple dimensions of RAG quality quickly and reliably using a capable LLM as an evaluator, without cumbersome setups. This helps researchers and engineers meaningfully benchmark, compare, and improve these systems, especially in tough, high-stakes domains like biomedicine

-------

## LLM-Driven Usefulness Labeling for IR Evaluation
https://arxiv.org/abs/2503.08965

### **1. What problem does the paper address?**

When people use search engines, the goal is not just to find relevant documents, but to find ones that are truly useful for their specific needs and tasks. Traditionally, most search systems were evaluated using relevance: does this web page match the query? But that ignores whether the information actually helps the user achieve their goal. For example, two documents might both be relevant, but only one actually answers the user’s question in a way that satisfies their needs. So, usefulness is a richer, more user-centric measure than raw relevance. However, manually assigning usefulness scores (having humans label if a document is truly useful for a task) is costly and slow.

### **2. What is the innovation or main idea?**

We wanted to see if large language models (LLMs)—like GPT-4 or Llama—could automatically generate usefulness labels for documents in search tasks, in place of manual human judgment. While LLMs are now often being used to assess relevance, there has been little exploration into their use for usefulness, which requires understanding task context, user needs, and satisfaction.

### **3. How did we test this idea?**

We ran experiments using six popular pre-trained LLMs (including versions of GPT and Llama, plus DeepSeek-R1) on two real datasets of search behavior:

- **THUIR-KDD'19:** Contains search tasks with human-annotated satisfaction, usefulness, and relevance labels.
- **QRef:** Focuses on shorter, open-ended search sessions, also with human usefulness labels.

The LLMs were presented with batches of data representing user clicks, queries, satisfaction levels, behavioral metrics (like dwell time), and for some tests, the context of the full session. We asked them (in zero-shot setting; i.e., no extra LLM training, just a well-designed prompt) to assign usefulness labels to each clicked document.

### **4. What experiments did we run?**

We evaluated LLM judgments against ground truth (human labels) using Spearman’s rank correlation, which measures how well two ranking lists agree.

We tried several analyses:

- **Baseline data:** LLM makes judgments without session context.
- **Session data:** LLM gets the full context of the search session.

We also did an **ablation study**: giving LLMs just certain types of features (relevance, satisfaction, user behavior, etc.) to see which aspects most help the LLM assess usefulness.

### **5. What did we find?**

- **LLMs can assign usefulness labels with moderate accuracy.** Their judgments had a moderate correlation with human labels. Larger LLMs (like Llama 3.3 70B and GPT-4omini) outperformed smaller ones.
- **Context matters:** LLMs did better when given the context of the whole search session rather than isolated clicks, especially on shorter sessions (like in QRef).
- **Key features:** Both document relevance and user satisfaction are important. Providing both helps LLMs judge usefulness better. If only satisfaction or user behavior is provided, performance drops.
- **Challenges with divergent cases:** When a document is high in relevance but low in usefulness (or vice versa), LLMs often struggle. This may be because LLMs generalize that relevance means usefulness, but that's not always the case.
- **Cost and efficiency:** Using every possible input feature is expensive for LLMs due to input (token) size limits. Our ablation study helps identify what features are most critical for efficient, reliable labeling.

### **6. Why does this matter?**

Automating usefulness labeling with LLMs could save a lot of time and cost for evaluating and improving search engines. Importantly, this could lead us to build search systems that better serve real user goals, not just return superficially relevant but ultimately unhelpful documents.

### **In summary:**  
The paper shows that LLMs, with the right input features and context, can provide usefulness labels at a level that moderately matches human judgment. These automated metrics can help us advance more user-centric evaluation of search systems beyond traditional relevance—that is, we can get closer to knowing not just if a document fits the query, but if it actually helps the user accomplish what they set out to do

-----

## Towards Fair Rankings: Leveraging LLMs for Gender Bias Detection and Measurement
https://arxiv.org/abs/2506.22372

### 1. **What Problem Are We Trying to Solve?**

In many applications that use AI or machine learning, systems are trained to process text and make decisions, like ranking documents when you do a search. Unfortunately, these systems can show bias—specifically, _gender bias_, where results favor one gender (like male) over another (like female) or do not treat both genders equally.

Detecting and measuring gender bias in systems that rank information is tricky, especially as these systems get more sophisticated. Traditional methods often miss more subtle or complex forms of gender bias, especially in long or nuanced pieces of text.

### 2. **Why Do Existing Solutions Fall Short?**

Most current measures for gender bias in texts rely on simply counting gender-related words. For example, if a passage has more “he, his, man” words, it might be tagged as male-biased. But language can be more complicated:

- Sometimes, a passage might mention both male and female terms, but its focus or bias is still on one gender.
- Complex phrases (like “her son” or “his mother”) can confuse simple methods, which might break such phrases into just individual words and miss the bigger context.
- There are also cases where stereotypical associations show up, and basic counting doesn’t capture the issue.

So these simple approaches miss more complex scenarios and thus fail to properly detect deeper or disguised biases 2506.22372v1.pdf.

### 3. **What Is Our Main Idea?**

Our idea is to use _Large Language Models_ (LLMs), like ChatGPT or open-source counterparts, as sophisticated bias detectors. These models have a deeper understanding of language beyond just word counts. We:

1. **Prompt the LLMs** with specific instructions to classify text as:
    
    - **Neutral** (no clear gender focus),
    - **Male** (biased towards male),
    - **Female** (biased towards female).
2. **Use these labels** (male, female, neutral) to:
    
    - Measure the presence of gender bias in individual documents.
    - Evaluate the overall fairness of ranking systems (e.g., does a search engine systematically show documents biased toward one gender?).
3. **Propose a new metric called CWEx** that quantifies how fairly a ranking system exposes content from all three categories (male, female, neutral).
    

### 4. **How Do We Do This?**

#### **A. Human Guidelines**

We start by setting clear guidelines (provided to human annotators and mirrored by LLMs) on how to judge whether a document is male, female, or neutral. The key rules are:

- **Male**: Document is explicitly about or refers more to males (or uses more male-related words and not balanced).
- **Female**: Same as above but for females.
- **Neutral**: The document is not about a specific gender, or it mentions both equally 2506.22372v1.pdf.

Importantly, just using stereotypical-gender-associated words (like “nurse” or “jewelry”) isn’t enough, unless the context is clearly about a specific gender.

#### **B. Bias Detection Using LLMs**

We tested various prompting strategies:

- **Zero-shot**: Give the LLM simple instructions and have it make decisions from scratch.
- **One-shot / Few-shot**: Give examples to guide its decisions (e.g., show what a “neutral” document looks like).
- **Chain of Thoughts**: Ask the model to explain its reasoning step by step.

We compare how well LLMs’ judgments match human annotators on a sample of documents.

#### **C. Measuring and Evaluating Bias in Rankings**

Once each document is labeled (male, female, neutral), we study the behavior of ranking systems. We look at, for a given list of ranked results:

- Are male, female, and neutral documents presented equally in the top results?
- Does the system consistently favor documents that are about one gender?

CWEx is our metric that records, at each position in a ranking list, the proportion of exposure for each category and compares it to a desired target (e.g., equal exposure for all).


### 5. **Experimental Setup and Findings**

We:

- Annotated a new dataset, **MSMGenderBias**, with human and LLM labels for gender bias.
- Ran experiments with several LLMs (both open and closed source), using our prompts and evaluation criteria.
- Compared LLM outputs with human judges and simple word-counting approaches, especially on cases where documents are more nuanced or mixed.
- Validated that LLMs (especially with guided prompting) match human judgments much more closely than term-counting metrics, and can spot bias in trickier cases 2506.22372v1.pdf.


### 6. **Why Is This Important?**

By using LLMs as sophisticated detectors, we can:

- Spot deeper biases in text or systems that simple methods miss.
- Provide a more accurate, nuanced measurement for real-world systems.
- Enable developers to better audit and mitigate bias in ranking models.
- Generalize the same approach beyond gender, to race, age, or other protected attributes.


### 7. **Limitations**

LLMs can reproduce stereotypes present in their training data, so while they outperform simplistic approaches, they’re not perfect. Our methods depend on the LLMs’ own (possibly biased) understanding unless closely calibrated with human feedback.

### 8. **Summary**

- _Old methods_ miss subtle or complex gender biases in ranked results.
- _We use LLMs_ (with careful prompting) to classify documents as male, female, or neutral, capturing more nuance.
- _Our metric_ (CWEx) offers a way to precisely measure fairness in how ranking systems expose users to gendered content.
- _Results show_ LLM-based methods align closely with human judgment—and can improve fairness auditing for AI systems 2506.22372v1.pdf.

If you want to know more details on the technical implementation, prompting strategies, or evaluation metrics, let me know!

-------

