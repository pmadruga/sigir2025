## ACTION FIRST: LEVERAGING PREFERENCE-AWARE ACTIONS FOR MORE EFFECTIVE DECISION-MAKING IN INTERACTIVE RECOMMENDER SYSTEMS
https://dl.acm.org/doi/10.1145/3726302.3729885

### What Is This Paper About?

Imagine you're using an online recommendation system—say, for movies. You have a conversation with it, and you mention that you like "something intense with a psychological twist and action-packed moments." The goal of this paper is to build a system that can understand your actual desires better and recommend the most relevant items (like movies) to you, even as you change your mind or clarify your preferences in conversation.

Current systems have two big problems:

- Traditional recommendation tools work with structured, fixed attributes (like "genre: action"), but real user preferences are often vague or not exactly matching those.
- Large language models (LLMs) are great at understanding natural language, but they can't handle huge databases of items all at once because of limitations on how much data (context) they can process.

### What's the New Solution?

We propose a new interactive recommendation system called "Action-First Interactive Recommendation System (AF-IRS)" that tightly integrates LLMs and external recommenders in a **bidirectional loop** rather than the usual one-way flow.

#### Main Components

Let's break it down:

#### 1. **Preference Tree Construction**

We use LLMs to build a hierarchical "preference tree." This means we organize all possible movie attributes (like "genre," "audience," "release date") in levels: broad categories at the top to more specific categories at the bottom. For example:

- Genre
    - Action
        - Superhero
        - Adventure
    - Thriller
    - Mystery

This tree allows the system to understand both general and specific user preferences flexibly, even if the user says something less structured like "movies that feel fresh" 3726302.3729885.pdf.

#### 2. **Session Preference Extraction**

As you chat, the system maps your responses to the nodes of this preference tree. For each turn in the conversation, it picks the most relevant preferences you express and combines them (e.g., "adventure" + "psychological"). This refined preference set then becomes the guide for searching items 3726302.3729885.pdf.

#### 3. **Two-Stage Filtering in External Recommendation Tools**

After extracting your session preferences, these are given to external recommenders, which handle the massive database of items. They filter items in two stages:

- **Preference-based filtering:** Selects items that match your current session preferences.
- **Collaboration-based filtering:** Looks at your historical behaviors (like previous movies you enjoyed) using techniques like cosine similarity on user/item embeddings, to refine the item set further. The resulting list is now much smaller and more likely to fit your needs 3726302.3729885.pdf.

#### 4. **Preference-Aware Refinement**

The LLM takes this narrowed-down list and, using its natural language understanding, re-evaluates how well each item matches your broader, structured preferences, further refining the list 3726302.3729885.pdf.

#### 5. **Decision Stage (Action-Aware Decision Making)**

Now, instead of making recommendations immediately, the system uses another LLM-powered module to decide:

- If it's confident the items fit your preferences based on the conversation so far, it recommends them.
- If not, it generates a targeted question to clarify your preferences further. This continuous loop ensures high-quality, personalized recommendations and reduces the chances of suggesting irrelevant items 3726302.3729885.pdf.

### How Does This Approach Help?

- **Flexibility:** By using a preference tree and LLMs, the system interprets nuanced, evolving user input, not just rigid categories.
- **Efficiency and Relevance:** By combining the strengths of LLMs (language understanding) with recommenders (large-scale filtering), it quickly hones in on the most relevant items.
- **Interactive Improvement:** If the system is unsure, it doesn't settle for poor recommendations—it asks you a smart question to get even better input.

### Summary

This paper introduces a new way to make recommendations by putting "actions" (candidate selection) ahead of "decisions" (what to recommend or what to clarify), using the strengths of both LLMs and external recommendation engines. The result is a more conversational, user-centered, and accurate recommendation system that learns and adapts as you talk to it