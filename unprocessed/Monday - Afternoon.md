
## Overview

| Paper & Link | Problem Addressed & Summary |
|---|---|
| **RESPONSE QUALITY ASSESSMENT FOR RETRIEVAL-AUGMENTED GENERATION VIA CONDITIONAL CONFORMAL FACTUALITY**<br>[Link](https://dl.acm.org/doi/10.1145/3726302.3730244) | Tackles the need for measurable factual reliability in RAG systems, where LLMs sometimes produce unsupported "hallucinations" even with retrieved evidence.<br>Proposes Conformal-RAG: breaks model answers into factual sub-claims, scores them for support from retrieved documents, and uses conformal prediction to set thresholds that guarantee factuality at chosen error rates, both globally and by topic.<br>This approach provides statistical guarantees on factuality for individual claims in generated answers, making RAG outputs more trustworthy and transparent for open-ended tasks. |
| **LANGUAGE MODEL ALIGNMENT FOR CONVERSATIONAL SHOPPING AT AMAZON**<br>[Link](https://doi.org/10.1145/3726302.3731955) | Addresses the challenges in delivering dynamic, personalized conversational shopping experiences at scale (e.g., Amazon Rufus).<br>Describes Amazon’s LLM fine-tuning journey: leveraging innovative training data, advanced alignment strategies, and multi-turn dialogue capabilities to support product recommendations, clarifications, and global customer needs.<br>Highlights real-world advances in conversational AI for shopping, detailing system improvements, deployment lessons, and impact on personalized product discovery. |

## RESPONSE QUALITY ASSESSMENT FOR RETRIEVAL-AUGMENTED GENERATION VIA CONDITIONAL CONFORMAL FACTUALITY
https://dl.acm.org/doi/10.1145/3726302.3730244

### **Background and Motivation**

Language models (like GPT-4) are great at generating text, but sometimes they make things up (“hallucinate”), especially in open-ended tasks like answering questions with long, complex answers. Even when they use Retrieval-Augmented Generation (RAG)—which means fetching relevant documents to inform their answers—they can still be unreliable. Users (and developers) want concrete guarantees about how often these models will produce factual, grounded responses.

### **Our Goal**

We want a system that can provide statistical guarantees: for example, “at least 95% of the model’s answers (or facts within answers) will be correct, based on the evidence retrieved.” Not just hoping for this; we want to actually measure and enforce it, so users can trust the model's outputs.

### **Key Tools**

1. **Retrieval-Augmented Generation (RAG):** The model first fetches documents relevant to the question, then generates its answer based on both the question and the retrieved information. Think of it as a supercharged open-book test.
2. **Conformal Prediction (CP):** A statistical technique that, given an error tolerance (say 5%), can filter or set thresholds so that, with high probability, mistakes won’t exceed that rate. It’s a way of providing coverage guarantees.
3. **LLM Sub-claim Decomposition:** We break generated answers down into bite-sized factual claims, so we can assess and filter them individually.

### **How the Method Works (Step by Step)**

1. **Break Answers Into Sub-claims:** When the model answers a question, we use another model to split this answer into discrete claims. This makes checking factuality easier.
    
2. **Score Each Claim:** For every claim, calculate how well it’s supported by the retrieved documents. We use cosine similarity (measure of similarity between text representations) between:
    
    - The claim and each document,
    - The question and the same document, and then multiply these to get a “relevance score” for each claim.
3. **Calibrate What Counts as Factual:** On a set of calibration data (where we have correct answers), we use an LLM as an annotator: for each claim, it checks if it’s factually supported by the ground truth and the retrieved documents.
    
4. **Set a Threshold With Conformal Prediction:** Using the calibration set, we compute for each claim the smallest possible relevance score such that, if we kept only claims above this, all of them would be factual. We then set a global threshold (or group-specific thresholds, explained later) so that, with high probability, the claims we keep in future outputs exceed our factuality guarantee.
    
5. **Deployment (Inference):** For new data, we generate answers, decompose into claims, score each claim, and then keep only those claims whose scores exceed our calibrated threshold. If removing claims breaks the grammatical structure, we rephrase or merge what's left so the output is still a coherent answer.
    

### **Two Modes: Marginal and Conditional Conformal Factuality**

- **Marginal**: The threshold is globally set; our guarantee applies universally to all data.
- **Conditional**: We set different thresholds by group (maybe based on topic, category, or difficulty), to achieve guarantees within each group. This addresses fairness: instead of over- or under-representing errors for certain topics, each gets the same guarantee.

### **Limitations and Tradeoffs**

- Setting very strict thresholds can mean throwing away a lot of claims, leading to incomplete answers.
- Calibrating per group (conditional) is fairer but more complex and sometimes impractical as it needs group-specific thresholds and more computation.
- If the LLM annotator or the retrieval step is flawed, it can affect both performance and guarantees.

### **What’s New or Different in Our Method**

- We use conformal prediction not just to filter entire answers, but to filter sub-claims within long answers.
- We leverage retrieved-document similarity for scoring, not just the model’s own confidences.
- The system is compatible with RAG, giving users trustworthy answers with statistical guarantees, even for open-ended, multi-claim responses.

### **In Summary**

Our framework—Conformal-RAG—lets RAG models generate answers where every included fact has a statistical guarantee of being grounded in evidence, with tunable error rates. By smartly breaking down, scoring, and filtering the model’s outputs, we make factual grounding measurable and reliable for complex text generation tasks

------

## LANGUAGE MODEL ALIGNMENT FOR CONVERSATIONAL SHOPPING AT AMAZON
https://doi.org/10.1145/3726302.3731955

![[slides.pptx]]

### Abstract
The rapid growth of online shopping stores, such as Amazon, has led to services reaching billions of people worldwide. With global retail sales exceeding $6 trillion in 2024, customer expectations for personalized and seamless shopping experiences have heightened. Traditional online shopping experiences, such as search and navigation systems, often fall short in addressing complex shopping journeys. Conversational shopping (such as Amazon Rufus) offers a transformative approach by enabling dynamic, multi-turn dialogues that closely resemble human interactions. This allows customers to explore product options, seek clarifications, and receive personalized recommendations, thereby enhancing product discovery and informed decision-making. In this paper, we share our year-long journey of using language models for conversational shopping at Amazon and introduce how we use LLM fine-tuning techniques to enhance LLMs for a conversational shopping experience like Amazon Rufus. We also introduce innovative strategies for training data collection and demonstrate real-world applications, including product recommendations, clarification mechanisms, and internationalization for global customers.

