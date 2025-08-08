## INQUIRY ASSISTANT USING LLM-GENERATED KNOWLEDGE GRAPHS
https://dl.acm.org/doi/10.1145/3726302.3731956

### **1. What Problem Are We Solving?**

Companies get lots of customer questions about their services—think hotel bookings. Traditionally, humans respond to these questions, often by email. This is slow, expensive, and can leave customers unhappy if they wait too long for answers. We want to automate this with AI so that customers get quicker, more accurate help, while reducing costs for businesses.

### **2. Why Isn't Simple Automation Enough?**

Basic chatbots use pre-set answers or templates, but real customer questions are often vague or incomplete. For example: "I'm getting an error when trying to change my booking." The AI needs to ask for more specifics to help, not just spit out a generic reply. That's why current automated systems can't handle real-life complexity well.

### **3. What Is Our Solution?**

We propose a new way: use Large Language Models (LLMs, like advanced AI chatbots) to read through unstructured help pages (the kind of FAQs or support articles companies already have), and automatically build a "knowledge graph" from them.

A knowledge graph is a smart map of topics, problems, possible solutions, and the conditions for each solution to apply. With this, the AI can better understand what the customer is asking, figure out if it has enough info, and, if not, ask clarifying questions—just like a good human agent.

### **4. How Does Our System Work?**

- **Knowledge Graph Generation:** The AI reads each help page and recognizes key "problems" (like "Change reservation"), "resolutions" (like "Contact support if you booked by phone"), and "conditions" (like "if you're a logged-in user"). It also notes how topics relate—some are sub-topics, others link to additional help pages.
    
- **Dialogue Manager:** When a user asks something, the AI uses the knowledge graph to figure out what the issue might be and checks if it has a known solution. If not enough information is provided, it asks the user targeted questions to fill in the gaps. If a solution is found, it gives a concise, relevant answer. If not, it can escalate to a human or give a general fallback response.
    

### **5. How Did We Test It?**

We compared our new AI assistant (Graph-Agent) to a standard approach called Retrieval-Augmented Generation (RAG-Agent). The RAG model finds relevant help pages and tries to generate an answer directly from those pages, but doesn't use a structured knowledge graph.

To see which worked better, we simulated conversations with both AIs on real customer inquiry data from a hotel service:

- Some inquiries could be fully resolved with info from help pages ("resolvable" inquiries).
- Others required escalation, like needing booking info only a human can access ("escalation-required" inquiries).

We measured if the responses were "correct," "partial," or "incorrect," and also looked at things like whether the AI asked clarifying questions, how concise the answers were, and if there were any mistakes.

### **6. What Did We Find?**

- Our Graph-Agent was more accurate than RAG-Agent at solving inquiries that could be answered from help pages, and was less likely to provide incorrect or contradictory responses ("hallucinations").
- It asked clarifying questions much more often, leading to better, more natural conversations.
- When both approaches couldn't fully help (for escalation-required cases), our system was better at recognizing when it needed to escalate or provide a useful fallback, instead of making things up.
- However, sometimes our system missed important details if help pages didn't put them close to the problem description—something we aim to fix in future work.

### **7. Conclusions and The Path Forward**

We showed it is possible to automatically turn existing help documents into a knowledge graph, and then use that structure for more intelligent, human-like customer support chatbots. This system can save costs, improve answer quality, and handle complex, vague customer messages better than current retrieval-based bots.

In the future, we plan to adapt our system to more diverse help page formats, ensure we capture all critical info, and try this approach in other industries beyond hotels.

### **Why Is This Important?**

Better automation here means faster, more natural help for customers and lower costs for businesses—all powered by smarter AI that really understands the structure of knowledge and the subtleties of dialogue, rather than just copying and pasting text from help pages