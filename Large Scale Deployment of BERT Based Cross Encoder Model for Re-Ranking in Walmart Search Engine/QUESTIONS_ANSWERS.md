# QUESTIONS_ANSWERS.md
## Large Scale Deployment of BERT Based Cross Encoder Model for Re-Ranking in Walmart Search Engine

### Question 1: How do they rank and how do they classify?

**As the paper author explaining this to you:**

Let me break down our ranking and classification approach in simple terms.

**The Classification Challenge:**
Originally, we had a 3-class problem - imagine rating movie reviews as "terrible," "okay," or "excellent." But in search, this becomes "irrelevant," "good," or "excellent" for query-item pairs. The problem with this approach is that it's too rigid for real-world search scenarios.

**Our Solution - Binary with Soft Labels:**
We reformulated this as a binary classification problem but with soft labels. Think of it like a dimmer switch instead of a traditional on/off switch:
- Instead of hard categories (0, 1), we use soft labels (0, 0.5, 1)
- This allows for nuanced understanding - something can be "somewhat relevant" (0.5) rather than just "relevant" or "irrelevant"

**How the Ranking Works:**
1. **Cross-encoder scores**: Our BERT model produces a single relevance score between 0 and 1 for each query-item pair
2. **Downstream integration**: These scores feed into a larger ranking model that considers multiple signals
3. **Final ranking**: The ranking model combines our relevance scores with other factors like popularity, price, availability, etc.

It's like having a skilled wine sommelier (our cross-encoder) taste each wine and rate it, then a restaurant manager (ranking model) considers both the sommelier's rating and practical factors like price and availability to create the final wine list.

### Question 2: Do they mix the query with items' metadata to build the cross encoder?

**Yes, absolutely!** This is actually one of our key innovations.

**The Input Structure:**
Our cross-encoder takes a carefully structured input that looks like this:
```
[CLS] query [SEP] item_title [SEP] product_type [SEP] brand [SEP] color [SEP] gender [SEP]
```

**What Each Component Means:**
- **[CLS]**: The classification token that BERT uses to make the final decision
- **query**: The customer's search terms (e.g., "red Nike running shoes")
- **[SEP]**: Separator tokens that help BERT understand where each piece of information begins and ends
- **item_title**: The product's name (e.g., "Nike Air Max 270 Running Shoe")
- **product_type**: Category information (e.g., "Athletic Footwear")
- **brand**: The manufacturer (e.g., "Nike")
- **color**: Product color (e.g., "Red")
- **gender**: Target demographic (e.g., "Men's")

**Why This Mixing is Powerful:**
Traditional search systems might look at query and title separately, but our cross-encoder reads everything together like a human would. It can understand that when someone searches for "red Nike shoes," they want items that are:
- Actually red (color matches)
- Made by Nike (brand matches)
- Are shoes (product type matches)
- Have a relevant title

**Teacher vs Student Model Difference:**
Our teacher model (the large 7B parameter model) also includes product description, but we excluded this from the student model for latency reasons - description text is long and would slow down real-time serving.

### Question 3: Do they use MLM on the query or on the items' property?

**Great question! Let me clarify the role of MLM (Masked Language Modeling) in our system:**

**MLM in Pre-training vs Fine-tuning:**
- **Pre-training phase**: Yes, our base BERT model was pre-trained using MLM on large text corpora, which gave it general language understanding
- **Fine-tuning phase**: No, we don't use MLM during our specific training for search relevance

**What We Do Instead:**
During fine-tuning, we focus entirely on **relevance prediction**. Think of it like this:
- Pre-training with MLM is like teaching someone to read and understand language in general
- Fine-tuning for relevance is like teaching that person to be a search expert who can judge if a product matches what a customer is looking for

**Our Training Process:**
1. **Knowledge Distillation**: We use a large teacher model (7B parameters) to create training labels
2. **Pairwise Learning**: We train the model to understand that for a given query, some items are more relevant than others
3. **Binary Classification**: The final layer learns to output a relevance score between 0 and 1

**Why Not MLM During Fine-tuning?**
MLM would be like asking our model to guess missing words in product descriptions, but that's not what we need for search. We need it to understand relevance relationships between queries and products.

### Question 4: What is the Query-Item Key value store, meaning what is the Query and the Item?

**Let me explain our caching and storage strategy:**

**The Concept (though not explicitly named "Query-Item Key Value Store"):**
While we don't use exactly this terminology, we do have a similar concept for optimization. Think of it as a smart memory system that remembers previous decisions.

**What We Actually Implement:**
1. **Query Signals**: We precompute scores for frequent query-item pairs
2. **Caching System**: We store feature scores to avoid real-time computation for popular searches
3. **Feature Store**: We maintain computed features for items that can be reused across queries

**The Keys and Values:**
- **Key**: A combination of query text and item identifier (e.g., "red Nike shoes" + "item_12345")
- **Value**: The precomputed relevance score or intermediate features

**Why This Matters:**
Imagine you're a cashier at a busy coffee shop. Instead of calculating the price of a "large latte with extra shot" every time, you memorize the common orders. Similarly, for popular queries like "iPhone case" or "Nike shoes," we store the results so we don't have to recompute them every time.

**Benefits:**
- **Faster response times**: No need to run the full model for cached results
- **Reduced computational cost**: Especially important for high-traffic queries
- **Better user experience**: Instant results for popular searches

### Question 5: What are the Product Tokens?

**Great question! Let me explain our tokenization strategy:**

**Product Tokens in Our Context:**
While we don't explicitly define "Product Tokens" as a special category, based on our implementation, these would refer to:

**1. Separator Tokens:**
- **[SEP] tokens**: These separate different product attributes in our input
- They help BERT understand where one piece of information ends and another begins
- Think of them as punctuation marks in a sentence

**2. Attribute Tokens:**
Each product attribute gets tokenized separately:
- **Title tokens**: "Nike Air Max 270 Running Shoe" becomes multiple tokens
- **Brand tokens**: "Nike" becomes one or more tokens
- **Color tokens**: "Red" becomes tokens
- **Type tokens**: "Athletic Footwear" becomes tokens
- **Gender tokens**: "Men's" becomes tokens

**3. Special Classification Token:**
- **[CLS] token**: This is where BERT concentrates all the information to make the final relevance decision
- It's like the "judge" that considers all the evidence (query + product attributes)

**How They Work Together:**
Imagine our input as a structured sentence:
```
[CLS] "red Nike shoes" [SEP] "Nike Air Max 270" [SEP] "Athletic Footwear" [SEP] "Nike" [SEP] "Red" [SEP] "Men's" [SEP]
```

Each part gets broken down into smaller tokens that BERT can understand, and the [CLS] token learns to combine all this information into a single relevance score.

**Why This Structure Works:**
- **Structured understanding**: BERT knows which information is the query vs. product attributes
- **Attribute importance**: The model learns which attributes matter most for different types of queries
- **Cross-attention**: BERT can compare query terms directly with specific product attributes

This tokenization strategy allows our model to be much more precise than traditional search systems that might just look at keywords in isolation.

---

*This document was created using the Feynman technique to explain complex technical concepts in simple, accessible terms, as if the paper's authors were directly answering your questions.*