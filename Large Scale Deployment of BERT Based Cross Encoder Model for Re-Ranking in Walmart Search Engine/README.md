# Large Scale Deployment of BERT Based Cross Encoder Model for Re-Ranking in Walmart Search Engine

**Authors:** Ajit Puthenputhussery, Changsung Kang, Alessandro Magnani, and team  
**Institution:** Walmart Global Tech  
**Conference:** SIGIR 2025  

## Status
This paper is accepted at SIGIR 2025 but not yet publicly available. The SIGIR 2025 proceedings will be published in the ACM Digital Library approximately 2 weeks before the conference (July 13-18, 2025).

## Abstract Summary
The paper describes the deployment of BERT-based cross-encoder models for re-ranking in Walmart's search engine, focusing on large-scale production implementation.

## Key Technical Details
- Uses cross-encoder architecture with BERT-Base (110M parameters)
- Knowledge distillation from 7B parameter LLMs (Llama2-7B, Mistral-7B)
- Processes query with item metadata (title, product type, brand, color, gender)
- Achieves 60x size reduction while maintaining teacher performance
- +13.27% improvement in R@P=95% and +0.8% ATC rate in production

## Availability
Check the following sources for updates:
- ACM Digital Library: https://dl.acm.org/conference/sigir
- ArXiv for potential preprints
- Walmart's research publications page