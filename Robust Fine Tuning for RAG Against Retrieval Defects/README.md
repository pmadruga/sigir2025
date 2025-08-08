## ROBUST FINE-TUNING FOR RETRIEVAL AUGMENTED GENERATION AGAINST RETRIEVAL DEFECTS
https://sigir2025.dei.unipd.it/detailed-program/paper?paper=00ec53c4682d36f5c4359f4ae7bd7ba1

#### **Purpose:**

Our paper addresses a big challenge faced by Retrieval-Augmented Generation (RAG) systems, which combine large language models (LLMs) with external document retrieval to answer questions. In practice, the documents retrieved aren't always perfect—they might be only loosely related, outright wrong, or even misleading. These problems seriously reduce the reliability of RAG systems. Our core goal is to make RAG systems more robust, so they keep working well even when the retrieved information is noisy or flawed.

#### **Background—How RAG Works:**

In a standard RAG system:

1. There's a "retriever," which searches a big collection of documents and finds the ones most relevant to a user's question.
2. There's a "generator" (the LLM), which uses the question plus those retrieved documents to generate an answer.

The problem is, the quality of the generated answer depends heavily on the quality of the documents returned by the retriever. If those documents are bad—irrelevant, noisy, or false—the answer will likely be bad too.

#### **Retrieval Defects—What Goes Wrong:**

We classify bad retrieved documents ("retrieval defects") into three main types:

- **Noisy documents:** These are related to the topic but don't answer the specific question.
- **Irrelevant documents:** These don't relate to the question at all—imagine asking about Pink Floyd and getting info about Nirvana.
- **Counterfactual documents:** These contain outright false or misleading information—like saying a Pink Floyd song appears on the wrong album.

Our experiments show that even a small fraction of these defective documents in the input can make RAG systems much less accurate—sometimes dropping performance by over 60% depending on the type of defect and severity 3726302.3730078.pdf.

#### **Our Solution—Robust Fine-Tuning (RbFT):**

Instead of only making the retriever better (which is hard and not always possible), we focus on making the LLM itself smarter and more resistant to bad input. We train (fine-tune) the LLM with specialised tasks so it can:

1. **Detect which documents are helpful and which are defective** (Defect Detection Task).
2. **Extract and use only the useful information** from all input, ignoring bad info (Utility Extraction Task).

This way, even if its input contains bad or noisy text, the LLM can spot the problems and generate the right answer anyway.

#### **Implementation—How We Train the System:**

- We use two strong LLMs (Llama and Qwen) and fine-tune them on two tasks:
    - **Defect Detection:** The LLM gets a list of documents and identifies which are helpful, which are noisy, irrelevant, or contain falsehoods.
    - **Utility Extraction:** The LLM answers questions using retrieved documents that may include some defective ones, and it's rewarded for producing correct answers despite that.
- During training, we deliberately introduce bad documents with varying probabilities (from none to all), so the model experiences a wide range of real-world scenarios.
- We use established datasets (Natural Questions, HotpotQA, TriviaQA) and compare our method to strong existing baselines 3726302.3730078.pdf.

#### **Results—Does It Work?**

Yes, and very well:

- **Clean Setting:** Even when all retrieved documents are good, our method (RbFT) can slightly _improve_ over standard RAG.
- **Normal/Hard Settings:** When some or all input documents are defective, RbFT greatly outperforms all other methods, showing much higher accuracy and stability—for example, up to 37% better exact match scores than the next best approach in the hardest scenarios 3726302.3730078.pdf.

#### **Key Takeaways and Analogy**

Think of vanilla RAG like a student who copies from whatever sources the library gives them—if the library gives junk, the answers are junk. RbFT is like teaching the student to spot bad sources, ignore them, and rely on their own reasoning and cross-referencing skills, so even if half the library is wrong, the student still gets the answer right.

#### **Conclusion**

RAG systems are only as strong as their weakest link. By focusing on making the LLM resilient to poor retrieved input, not just trusting the retriever, we build RAG systems that perform reliably—even when, inevitably, retrieval goes wrong. This is a step towards making LLM-powered applications more robust and trustworthy in the real world