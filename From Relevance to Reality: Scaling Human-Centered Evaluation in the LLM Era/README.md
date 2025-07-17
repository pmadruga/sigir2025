# From Relevance to Reality: Scaling Human-Centered Evaluation in the LLM Era

**Keynote Speaker:** Chirag Shah  
**Conference:** SIGIR 2025  

---

## Explain this keynote to me in depth using the Feynman technique, as if you were its author

Hey there! I'm Chirag Shah, and I gave this keynote at SIGIR 2025. Let me explain what I talked about in simple terms, as if we're having a conversation over coffee.

## The Core Problem: LLMs Are Like Brilliant Dreamers

You know how Large Language Models (LLMs) like ChatGPT can do amazing things? They can write code, answer questions, help with creative tasks. But here's the thing - as Andrej Karpathy brilliantly put it: **"An LLM is 100% dreaming and has the hallucination problem. A search engine is 0% dreaming and has the creativity problem."**

Think of it this way: An LLM is like a incredibly talented artist who can paint beautiful pictures, but sometimes they paint unicorns when you asked for horses. A search engine is like a librarian who will always show you exactly what's in the books, but can't help you imagine new ideas.

## What We Really Want

We want that creativity that LLMs bring! But we also need:
- **Reliability**: Can we trust what it tells us?
- **Trustworthiness**: How do we know it's not making things up?

The big question I posed is: **How do we turn engineering into science?**

## From Prompt Engineering to Prompt Science

Right now, most people treat prompting like cooking without a recipe - they just throw ingredients together and hope for the best. This is what I call "prompt engineering" - it's ad-hoc, inconsistent, and unreliable.

But what if we could make it more scientific? What if we could apply the same level of scrutiny we apply to any scientific instrument?

### The Solution: Treat It Like Qualitative Research

I proposed we should approach prompt engineering like qualitative coding in social sciences. Instead of randomly trying different prompts, we should:

1. **Systematically analyze** what works and what doesn't
2. **Create structured frameworks** for evaluation
3. **Apply rigorous testing** methodologies
4. **Document and replicate** our findings

## Case Study 1: Search vs. Chat - Understanding User Intent

Let me give you a concrete example. We wanted to understand how people use search engines differently from chat interfaces.

### The Traditional Approach (Bad)
Most researchers would just guess what people want or use their intuition. That's like trying to understand a foreign culture by watching movies about it.

### Our Scientific Approach (Good)
We used LLMs to help us create a systematic taxonomy of user intents:

1. **Generated comprehensive categories** using LLMs
2. **Validated these categories** with real user data
3. **Applied rigorous evaluation criteria**:
   - Comprehensiveness (did we cover everything?)
   - Consistency (do the categories make sense together?)
   - Clarity (can others understand and use them?)
   - Accuracy (do they match real user behavior?)
   - Conciseness (are they practical to use?)

### The Results
We analyzed 1,956 search queries and 15,031 chat requests, and found people have five main intents:
- Ask for advice/recommendation
- Create something
- Information retrieval
- Learn about topics
- Leisure activities

This wasn't just guesswork - it was scientifically validated!

## Case Study 2: Auditing LLMs - The Multiprobe Approach

Here's another example. Everyone talks about "evaluating" LLMs, but most evaluation is like testing a car by only driving it in your driveway.

### The Problem with Current Benchmarks
Most people use simple benchmarks and assume they're good enough. But here's the thing - **data contamination happens**. It's like studying for a test when you already know the exact questions that will be asked.

### Our Solution: Multiprobe Auditing
We created a tool called AuditLLM that works like a thorough medical checkup:

1. **Multiple perspectives**: Instead of one test, we use many different ways to probe the same knowledge
2. **Diverse categories**: We tested across 38 different domains (health, law, finance, politics, etc.)
3. **Systematic analysis**: We used 817 questions from TruthfulQA to really stress-test the models

### What We Found
Different models (like Falcon and Llama 2) performed very differently across categories. Some were good at factual questions but terrible at reasoning. Others were creative but unreliable.

## The Key Lessons

Through this research, I learned several crucial things:

### 1. "Trust, but Verify" (Ronald Reagan was right!)
Just because an LLM gives you an answer doesn't mean it's correct. We need verification systems.

### 2. Judge the Judge First
Before we let LLMs evaluate things for us, we need to evaluate the LLMs themselves. It's like making sure your thermometer is accurate before using it to measure temperature.

### 3. Humans Must Stay in the Loop
We need human oversight, accountability, and trustworthiness built into these systems.

### 4. Question Your Benchmarks
Don't just accept that a benchmark is good because everyone uses it. Ask: Is this really testing what I think it's testing?

## The Journey: From Pilot to Autopilot

I ended my talk with a progression that explains where we are and where we're going:

1. **Pilot**: Right now, humans are flying the plane with LLMs as basic instruments
2. **Copilot**: We want LLMs to be helpful assistants that can handle routine tasks
3. **Autopilot**: Eventually, we want systems that can operate independently but safely

But here's the crucial part: To get from Pilot to Autopilot, we need two things:
- **SCALE**: Systems that can handle massive amounts of data and users
- **TRUST**: Reliable, verifiable, and accountable systems

And to get TRUST, we absolutely need **VERIFICATION**.

## Why This Matters for SIGIR

As information retrieval researchers, we're uniquely positioned to solve these problems. We've always cared about:
- **Relevance**: Finding the right information
- **Evaluation**: Measuring how well systems work
- **Human-centered design**: Building systems that actually help people

Now we need to apply these same principles to LLMs. We need to move from just making systems that work sometimes to making systems that work reliably, transparently, and trustworthily.

## My Call to Action

I'm not saying LLMs are bad - they're incredibly powerful tools. But we need to treat them like the powerful tools they are, with appropriate safeguards and scientific rigor.

The future of AI depends on us moving from ad-hoc prompt engineering to systematic prompt science. We need to scale human-centered evaluation to match the scale of these systems.

That's how we'll get from relevance to reality - by building systems that don't just find information, but that we can actually trust to help us make decisions in the real world.

---

*This keynote challenged the SIGIR community to think beyond traditional information retrieval and embrace the responsibility of making AI systems more trustworthy, reliable, and human-centered.*