# Using Large Language Models to Generate, Validate, and Apply User Intent Taxonomies

## Explaining Our Research Using the Feynman Technique

*As one of the authors of this paper, let me explain our work to you as if you're completely new to the field.*

---

## The Big Picture: What Problem Are We Solving?

Imagine you're running a search engine or a chatbot. Every day, millions of people ask questions or make requests. To build a better system, you need to understand **why** people are asking these questions - what are their underlying intentions or goals?

For example:
- When someone searches "Python tutorial," they want to **learn**
- When someone asks "What's the weather today?" they want **information**
- When someone says "Write me a poem," they want **content creation**

Understanding these **user intents** is crucial because it helps systems provide better, more relevant responses. But here's the challenge: figuring out user intents from raw log data is incredibly difficult and time-consuming.

## The Traditional Approach and Its Problems

Traditionally, researchers have two main approaches:

### 1. Manual Analysis (Qualitative)
- Researchers manually read through thousands of user requests
- They create categories and labels by hand
- **Problem**: This takes months or years and requires expensive human experts

### 2. Machine Learning (Quantitative)
- Train algorithms to automatically classify user requests
- **Problem**: These models are rigid and can't adapt to new types of requests (like AI chat, which didn't exist a few years ago)

## Our Innovation: LLMs as Research Collaborators

We realized that Large Language Models (LLMs) like GPT-4 have an amazing ability: they can understand text, identify patterns, and generate categories from examples. So we asked: "What if we use LLMs to help us create and apply user intent taxonomies?"

But here's the crucial insight: **We can't just trust the LLM blindly**. We need to validate and verify its work with humans.

## Our Three-Phase Methodology

Think of our approach like building a house with a very smart assistant:

### Phase 1: Taxonomy Generation (The LLM Proposes)
1. We give the LLM a bunch of user requests (like showing it 1,000 search queries and chat messages)
2. We ask it: "Based on these examples, what are the main categories of user intentions?"
3. The LLM analyzes the data and proposes categories like:
   - **Information Retrieval**: "Find me the capital of France"
   - **Problem Solving**: "Calculate 15% of 200"
   - **Learning**: "Explain how photosynthesis works"
   - **Content Creation**: "Write a business email"
   - **Leisure**: "Tell me a joke"

### Phase 2: Taxonomy Validation (Humans Verify)
1. We take the LLM's proposed categories and give them to human experts
2. These experts test the categories on real data
3. They identify problems like:
   - Categories that are too vague
   - Missing categories
   - Overlapping definitions
4. We refine the taxonomy based on this feedback

### Phase 3: Taxonomy Application (The LLM Applies)
1. Once validated, we use the LLM to automatically label thousands of user requests
2. We measure how well the LLM agrees with human labelers
3. We use this labeled data to generate insights

## Why This Works: The Best of Both Worlds

Our approach combines:
- **LLM Strengths**: Fast processing, pattern recognition, consistency
- **Human Strengths**: Validation, quality control, domain expertise

## Key Findings That Surprised Us

### 1. LLMs Are More Consistent Than Humans
When we had the same LLM label the same data multiple times, it was incredibly consistent (Fleiss' kappa = 0.85). Humans, on the other hand, often disagreed with each other because they made assumptions about what users *might* want to do beyond what the data actually showed.

### 2. LLMs Are More Objective
Humans tended to "read between the lines" and make assumptions. For example, if someone asked "Does Washington state have income tax?", humans often labeled it as "Learning" (assuming the person was studying tax policy), while the LLM correctly labeled it as "Information Retrieval" (based on what the question actually asked).

### 3. The Method Works Across Different LLMs
We tested our approach with GPT-4, Mistral, and Hermes. All three LLMs generated remarkably similar taxonomies, showing that our method is robust.

## Real-World Application: Search vs. Chat

To demonstrate our method's value, we applied it to a fascinating question: "How do user intents differ between traditional search and AI chat?"

We analyzed 17,987 user requests from Microsoft Bing (both search and chat) and discovered:

- **Information Retrieval** and **Advice-Seeking**: Users split fairly evenly between search and chat
- **Content Creation**, **Learning**, and **Leisure**: Users heavily favor chat (makes sense - you can't ask Google to write you a poem!)

This insight helps system designers understand how to optimize different interfaces for different user goals.

## The Broader Impact

Our methodology doesn't just work for user intents - it can be applied to create taxonomies for any text-based research question. We've essentially created a **scalable framework** for qualitative analysis that:

1. **Reduces time** from months to days
2. **Maintains quality** through human validation
3. **Scales** to large datasets
4. **Adapts** to new domains and contexts

## Technical Validation

We didn't just show that our method works - we proved it scientifically:

- **Inter-coder reliability**: Our LLM achieved 0.72 Cohen's kappa with human experts (considered "substantial agreement")
- **Comprehensiveness**: Our taxonomy covered 99%+ of user requests
- **Consistency**: Multiple runs of the same LLM produced nearly identical results
- **Replicability**: We tested with multiple LLMs and datasets

## Why This Matters for the Future

As AI systems become more prevalent, user behaviors and intents are rapidly evolving. Our method allows researchers to:

- **Quickly adapt** to new interaction patterns
- **Understand emerging user needs** without massive human effort
- **Build better systems** based on actual user intentions
- **Scale research** to match the pace of technological change

## The Human-AI Partnership

Perhaps most importantly, our work demonstrates that LLMs work best as **collaborators**, not replacements. The LLM handles the heavy lifting of processing large datasets and identifying patterns, while humans provide the critical thinking, validation, and domain expertise.

This partnership model points toward a future where AI amplifies human capabilities rather than replacing them - making research faster, more thorough, and more reliable.

## How You Can Use This

We've made our methodology and code available so other researchers can apply it to their own domains. Whether you're studying user behavior, analyzing customer feedback, or researching any text-based phenomenon, our three-phase approach can help you build reliable taxonomies quickly and effectively.

The key is remembering that the LLM is your research assistant, not your replacement. Use it to generate ideas and process data, but always validate the results with human expertise.

---

*This research represents a new paradigm in computational social science - one where AI tools help us understand human behavior more effectively than ever before.*

## Authors
Chirag Shah¹, Ryen W. White², Reid Andersen², Georg Buscher², Scott Counts², Sarkar Snigdha Sarathi Das³, Ali Montazer⁴, Sathish Manivannan², Jennifer Neville², Xiaochuan Ni², Nagu Rangan², Tara Safavi², Siddharth Suri², Mengting Wan², Leijie Wang¹, Longqi Yang²

¹University of Washington, ²Microsoft, ³Pennsylvania State University, ⁴University of Massachusetts Amherst

---

*For more details, see our full paper: "Using Large Language Models to Generate, Validate, and Apply User Intent Taxonomies" published at SIGIR 2025.*