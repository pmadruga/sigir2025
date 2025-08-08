## A Reproducibility Study of Graph-Based Legal Case Retrieval
https://dl.acm.org/doi/10.1145/3726302.3730282

Imagine you are a lawyer trying to find previous legal cases similar to the one you're working on. This is called **legal case retrieval**, and it's crucial for making good legal arguments. Traditionally, computers help with this by comparing the words in case texts using language models (like special algorithms trained on legal documents). But recently, researchers noticed that we can improve this by also looking at how cases relate to each other, not just their words.

###  **CaseLink: A New Approach** 
Recently, a method called **CaseLink** was introduced. Instead of looking at each legal case alone, CaseLink builds a **graph**: think of every case as a point (node), with lines (edges) connecting them when they're related—like when one case references another or shares a legal charge. This graph is then processed by a type of AI called a **graph neural network (GNN)**, which can uncover meaningful connections not obvious from the text alone.

### **Why Our Study?** 
But there's a problem: when new research like this comes out, other scientists sometimes struggle to get the same results when they try to redo the experiments (that's called a **reproducibility crisis**). This could be due to missing details, code no longer working, or changes in AI models. Our paper focuses on rigorously testing whether CaseLink's results can be reproduced, and whether its approach really works well on different, newer datasets.

### **Our Research Steps**

1. **Reproduce CaseLink's Original Results**  
    We tried to get the same results as the original CaseLink paper by repeating their experiments on datasets from two years of a legal competition (COLIEE 2022 and 2023). We ran into several hurdles, like issues with code spread across multiple repositories and out-of-date AI models. Even after sorting these out, our results were quite different from the original numbers—even though we followed the setup as closely as possible.
    
2. **Test on New Data**  
    We also tested the method on an even newer dataset (COLIEE 2024) to see if its performance holds up over time. We found that while CaseLink did better than on the previous year's data, it still didn't match its performance from two years ago. This suggests the method isn't consistently great—its success seems to depend on the dataset.
    
3. **Try Better Graph Representations**  
    The original method treated every node and edge type in the graph the same (homogeneous). We experimented with a richer graph structure (heterogeneous), where edges and nodes could represent different things (like cases vs. legal charges, different types of relationships). We wanted to see if this led to better performance.
    
4. **Swap Closed AI Models for Open Ones**  
    The original method used a commercial AI model (GPT-3.5) that is accessed through a company and can change or disappear anytime. For reproducibility, we swapped it for an open model (Llama-3.1), which anyone can use freely, to see how that affected results and if the system becomes more robust in the long run.
    

### **What Did We Learn?**

- **Reproducibility is Hard:** Even when following instructions and having access to code, it's challenging to exactly reproduce others' results, especially when commercial tools (like GPT-3.5) change or are discontinued.
- **Generalizability is Limited:** Performance can change a lot depending on the dataset and details of the experimental setup.
- **Open and Richer Methods Help:** Using open AI models and more detailed graph representations can aid in reproducibility and might, in some cases, improve performance.

### **Why does this matter?** 
For researchers and practitioners in the legal field, this work:

- Raises awareness that published AI results are not always easy to repeat or trust.
- Shares all our code and setups to make it easier for others to build on our findings.
- Suggests directions for future work: focusing on reproducible methods and richer representations of legal data.

### **In Short:**  
We tested a promising new AI method for finding related legal cases, found it's not as reproducible or consistently strong as originally claimed, and explored ways to improve both its reliability and transparency for the legal and research communities