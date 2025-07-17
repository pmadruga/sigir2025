# AuditLLM: A Tool for Auditing Large Language Models Using Multiprobe Approach

*Explaining this paper in depth using the Feynman technique, as if I were one of the authors*

## What Problem Are We Solving?

Imagine you're a teacher grading a student's work. You ask the same question in different ways to see if the student truly understands the concept or is just memorizing answers. If the student gives completely different answers to essentially the same question, you'd be concerned about their understanding, right?

This is exactly what we're doing with Large Language Models (LLMs) like GPT, Claude, or Llama. As these AI systems become integral to critical applications in healthcare, education, legal services, and finance, we need to ensure they're reliable and consistent. The problem is that LLMs sometimes give inconsistent answers when you ask the same question in different ways - and this inconsistency can be a red flag for bigger issues like bias, hallucinations, or unreliability.

## The Core Insight: Consistency as a Reliability Measure

Here's our fundamental premise: **A robust, reliable LLM should give semantically similar responses to different phrasings of the same question.** If an AI system truly "understands" a concept, it shouldn't matter whether you ask "How many neurons are in the human brain?" or "What's the total number of neurons found in a human brain?" - the core answer should be consistent.

When we see inconsistency, it often signals:
- **Bias**: The model might respond differently based on how a question is framed
- **Hallucination**: The model might be making up information rather than drawing from reliable knowledge
- **Lack of robustness**: The model might not truly understand the underlying concept

## Our Solution: AuditLLM

We created AuditLLM - a systematic auditing tool that reveals these inconsistencies using what we call a "multiprobe approach." Think of it as an automated way to ask the same question multiple times in different ways, then analyze whether the AI gives consistent answers.

### The Two-LLM Architecture

Our system uses two LLMs working together:

1. **LLM1 (The Question Generator)**: This LLM takes your original question and creates 5 different versions of it. These "probes" are diverse yet relevant - they ask the same thing but from different angles or with different phrasing.

2. **LLM2 (The Tested Model)**: This is the LLM we're actually auditing. It answers all the generated probes, and we analyze its responses for consistency.

### How We Generate Good Probes

The key to effective auditing is generating high-quality probes. We developed a structured prompt template with two critical criteria:

**Relevance**: Each probe must be relevant to the original question and should ideally have a similar correct answer.

**Diversity**: Each probe should sound like it's being asked by different people or from different perspectives, avoiding near-duplicate questions.

For example, if you ask "How many neurons are in the human brain?", our system might generate:
- "What's the total number of neurons found in a human brain?"
- "Can you tell me the neuron count in an average human brain?"
- "How many nerve cells does the human brain contain?"
- "What's the estimated number of neurons in human brain tissue?"
- "How many individual neurons make up the human brain?"

## Two Modes of Operation

### Live Mode: Real-Time Auditing

This is like having a conversation with the AI while simultaneously checking its consistency. Here's how it works:

1. **Select an LLM**: Choose which model you want to audit from our supported list (Llama 2-7B, Falcon, Zephyr 7B, Vicuna, Alpaca)
2. **Input your question**: Ask anything you want to test
3. **Generate probes**: Our system creates 5 different versions of your question
4. **Select probes**: You can choose which probes to use for testing
5. **Analyze responses**: The system generates responses and highlights semantic similarities with a 60% threshold

The interface shows you exactly which parts of the responses are similar and which are different, giving you immediate insight into the model's consistency.

### Batch Mode: Comprehensive Assessment

This is for researchers or organizations that need to evaluate LLMs systematically across many questions. The process is:

1. **Upload questions**: Provide an Excel file with multiple questions
2. **Generate probes**: The system creates probes for each question
3. **Customize criteria**: You can adjust how much you want to emphasize relevance vs. diversity
4. **Analyze at scale**: The system processes everything and provides downloadable results

## The Technical Details

### Measuring Semantic Similarity

We use BERTScore via the sentence-transformer variant of MPNet (all-mpnet-base-v2) with cosine similarity to determine how semantically similar responses are. This isn't just looking for identical words - it's analyzing meaning.

### The Evaluation Framework

In our batch mode evaluation, we create a fascinating visualization that shows:
- **X-axis**: How similar the generated probes are to the original question
- **Y-axis**: How similar the LLM's responses are to each other

In an ideal world, as probe similarity increases, response similarity should also increase proportionally (a 45-degree slope). Deviations from this pattern reveal inconsistencies:
- **Higher slope**: The model is overly consistent even when probes are diverse (might indicate shallow understanding)
- **Lower slope**: The model gives divergent answers even to similar probes (inconsistency issues)

## Why This Matters

### For Researchers
- **Systematic evaluation**: Compare different LLMs on the same consistency metrics
- **Bias detection**: Identify when models respond differently to similar questions
- **Robustness assessment**: Understand how reliable a model is across different phrasings

### For Practitioners
- **Quality assurance**: Ensure your deployed LLM behaves consistently
- **Risk assessment**: Identify potential issues before they affect real applications
- **Model selection**: Choose the most reliable LLM for your specific use case

## Real-World Validation

We tested our approach using the TruthfulQA dataset, which contains questions designed to test whether models give truthful answers. Our results show clear patterns:
- Some models maintain consistency even with diverse probes
- Others show significant inconsistency, suggesting reliability issues
- The visualization makes it easy to compare different models' robustness

## Limitations and Future Work

We're transparent about current limitations:

1. **Text-only auditing**: Currently focused on textual responses only
2. **Limited model support**: We support six open-source models but not all available LLMs
3. **Performance considerations**: Loading large models can be time-intensive
4. **Response variability**: Models may give different answers even to identical questions due to randomness
5. **Dependency on LangChain**: Updates to the library may require tool updates

### Future Enhancements

We're continuously improving AuditLLM:
- Adding support for more LLMs
- Implementing persona-based probe generation
- Developing additional inconsistency assessment methods
- Expanding beyond text to multimodal auditing

## The Broader Impact

AuditLLM represents a step toward more responsible AI deployment. By making LLM auditing accessible and systematic, we're helping ensure that these powerful tools are reliable when used in critical applications.

The tool is democratizing LLM auditing - you don't need to be a machine learning expert to evaluate whether an AI system is behaving consistently. This is crucial as LLMs become more prevalent in decision-making systems.

## Getting Started

AuditLLM is available as a free, open-source tool on HuggingFace. You can:
- Try the live mode for quick consistency checks
- Use batch mode for comprehensive evaluations
- Access the source code to understand and extend the methodology

## Technical Implementation

The tool is built using:
- **Gradio**: For the user interface
- **Mistral 7B**: As LLM1 for probe generation (temperature 0.0)
- **Various models**: As LLM2 for testing (temperature 0.5, max_length 512)
- **BERTScore**: For semantic similarity measurement
- **LangChain**: For LLM integration

## Conclusion

AuditLLM isn't just a tool - it's a methodology for responsible AI evaluation. By focusing on consistency as a key reliability indicator, we're providing researchers and practitioners with a practical way to assess LLM robustness.

The inconsistencies we detect often serve as early warning signs for more serious issues like bias and hallucination. By catching these problems early, we can work toward more trustworthy AI systems that perform reliably across different phrasings and contexts.

This work contributes to the broader goal of making AI systems more transparent, reliable, and trustworthy - essential qualities as these technologies become increasingly integrated into critical aspects of our lives.

---

*This work was supported by the Bill and Melinda Gates Foundation. For more details, see our paper: "AuditLLM: A Tool for Auditing Large Language Models Using Multiprobe Approach" and try the tool at https://huggingface.co/spaces/Amirizaniani/AuditLLM*