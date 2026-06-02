export type MathLessonContent = {
  title: string;
  area: string;
  intro: string;
  sections: Record<string, string>;
};

export const mathLessonContent: Record<string, MathLessonContent> = {
  "/ml-math/statistics/p-value": {
    "title": "P Value",
    "area": "Statistics",
    "intro": "P Value explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**P Value** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **P Value** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **P Value** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**P Value** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/basic-statistics": {
    "title": "Basic Statistics",
    "area": "Statistics",
    "intro": "Basic Statistics explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Basic Statistics** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Basic Statistics** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Basic Statistics** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Basic Statistics** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/sampling-distribution": {
    "title": "Sampling Distribution",
    "area": "Statistics",
    "intro": "Sampling Distribution explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Sampling Distribution** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Sampling Distribution** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Sampling Distribution** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Sampling Distribution** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/ab-testing": {
    "title": "Ab Testing",
    "area": "Statistics",
    "intro": "Ab Testing explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Ab Testing** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Ab Testing** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Ab Testing** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Ab Testing** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/bayesian-frequentist": {
    "title": "Bayesian Frequentist",
    "area": "Statistics",
    "intro": "Bayesian Frequentist explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Bayesian Frequentist** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Bayesian Frequentist** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Bayesian Frequentist** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Bayesian Frequentist** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/correlation": {
    "title": "Correlation",
    "area": "Statistics",
    "intro": "Correlation explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Correlation** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Correlation** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Correlation** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Correlation** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/resampling": {
    "title": "Resampling",
    "area": "Statistics",
    "intro": "Resampling explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Resampling** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Resampling** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Resampling** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Resampling** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/t-test": {
    "title": "T Test",
    "area": "Statistics",
    "intro": "T Test explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**T Test** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **T Test** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **T Test** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**T Test** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/confidence-interval": {
    "title": "Confidence Interval",
    "area": "Statistics",
    "intro": "Confidence Interval explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Confidence Interval** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Confidence Interval** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Confidence Interval** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Confidence Interval** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/population-sample": {
    "title": "Population Sample",
    "area": "Statistics",
    "intro": "Population Sample explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Population Sample** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Population Sample** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Population Sample** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Population Sample** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/central-limit-theorem": {
    "title": "Central Limit Theorem",
    "area": "Statistics",
    "intro": "Central Limit Theorem explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Central Limit Theorem** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Central Limit Theorem** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Central Limit Theorem** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Central Limit Theorem** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/maximum-likelihood-estimation": {
    "title": "Maximum Likelihood Estimation",
    "area": "Statistics",
    "intro": "Maximum Likelihood Estimation explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Maximum Likelihood Estimation** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Maximum Likelihood Estimation** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Maximum Likelihood Estimation** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Maximum Likelihood Estimation** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/type-one-vs-two": {
    "title": "Type One vs Two",
    "area": "Statistics",
    "intro": "Type One vs Two explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Type One vs Two** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Type One vs Two** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Type One vs Two** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Type One vs Two** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/anova": {
    "title": "Anova",
    "area": "Statistics",
    "intro": "Anova explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Anova** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Anova** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Anova** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Anova** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/statistics/hypothesis-testing": {
    "title": "Hypothesis Testing",
    "area": "Statistics",
    "intro": "Hypothesis Testing explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nStatistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.",
    "sections": {
      "Intuition": "**Hypothesis Testing** builds intuition before formulas. In Statistics, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Hypothesis Testing** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Hypothesis Testing** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Hypothesis Testing** connects directly to ML practice in Statistics: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/bayes-theorm": {
    "title": "Bayes Theorm",
    "area": "Probability",
    "intro": "Bayes Theorm explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Bayes Theorm** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Bayes Theorm** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Bayes Theorm** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Bayes Theorm** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/joint-marginal": {
    "title": "Joint Marginal",
    "area": "Probability",
    "intro": "Joint Marginal explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Joint Marginal** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Joint Marginal** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Joint Marginal** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Joint Marginal** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/chebyshev-inequality": {
    "title": "Chebyshev Inequality",
    "area": "Probability",
    "intro": "Chebyshev Inequality explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Chebyshev Inequality** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Chebyshev Inequality** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Chebyshev Inequality** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Chebyshev Inequality** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/lln": {
    "title": "LLN",
    "area": "Probability",
    "intro": "LLN explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**LLN** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **LLN** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **LLN** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**LLN** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/conditional-probability": {
    "title": "Conditional Probability",
    "area": "Probability",
    "intro": "Conditional Probability explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Conditional Probability** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Conditional Probability** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Conditional Probability** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Conditional Probability** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/random-variables": {
    "title": "Random Variables",
    "area": "Probability",
    "intro": "Random Variables explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Random Variables** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Random Variables** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Random Variables** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Random Variables** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/markov-chains": {
    "title": "Markov Chains",
    "area": "Probability",
    "intro": "Markov Chains explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Markov Chains** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Markov Chains** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Markov Chains** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Markov Chains** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/monte-carlo": {
    "title": "Monte Carlo",
    "area": "Probability",
    "intro": "Monte Carlo explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Monte Carlo** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Monte Carlo** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Monte Carlo** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Monte Carlo** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/distributions": {
    "title": "Distributions",
    "area": "Probability",
    "intro": "Distributions explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Distributions** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Distributions** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Distributions** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Distributions** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/probability/covariance-matrix": {
    "title": "Covariance Matrix",
    "area": "Probability",
    "intro": "Covariance Matrix explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nProbability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.",
    "sections": {
      "Intuition": "**Covariance Matrix** builds intuition before formulas. In Probability, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Covariance Matrix** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Covariance Matrix** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Covariance Matrix** connects directly to ML practice in Probability: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/newtons-method": {
    "title": "Newtons Method",
    "area": "Optimization",
    "intro": "Newtons Method explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Newtons Method** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Newtons Method** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Newtons Method** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Newtons Method** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/adaptive-rates": {
    "title": "Adaptive Rates",
    "area": "Optimization",
    "intro": "Adaptive Rates explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Adaptive Rates** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Adaptive Rates** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Adaptive Rates** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Adaptive Rates** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/regularization": {
    "title": "Regularization",
    "area": "Optimization",
    "intro": "Regularization explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Regularization** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Regularization** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Regularization** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Regularization** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/momentum-nesterov": {
    "title": "Momentum Nesterov",
    "area": "Optimization",
    "intro": "Momentum Nesterov explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Momentum Nesterov** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Momentum Nesterov** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Momentum Nesterov** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Momentum Nesterov** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/lagrange-multipliers": {
    "title": "Lagrange Multipliers",
    "area": "Optimization",
    "intro": "Lagrange Multipliers explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Lagrange Multipliers** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Lagrange Multipliers** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Lagrange Multipliers** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Lagrange Multipliers** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/loss-landscapes": {
    "title": "Loss Landscapes",
    "area": "Optimization",
    "intro": "Loss Landscapes explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Loss Landscapes** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Loss Landscapes** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Loss Landscapes** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Loss Landscapes** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/batch-normalization": {
    "title": "Batch Normalization",
    "area": "Optimization",
    "intro": "Batch Normalization explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Batch Normalization** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Batch Normalization** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Batch Normalization** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Batch Normalization** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/sgd-variants": {
    "title": "Sgd Variants",
    "area": "Optimization",
    "intro": "Sgd Variants explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Sgd Variants** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Sgd Variants** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Sgd Variants** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Sgd Variants** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/optimization/convex-optimization": {
    "title": "Convex Optimization",
    "area": "Optimization",
    "intro": "Convex Optimization explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nOptimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.",
    "sections": {
      "Intuition": "**Convex Optimization** builds intuition before formulas. In Optimization, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Convex Optimization** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Convex Optimization** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Convex Optimization** connects directly to ML practice in Optimization: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/kl-divergence": {
    "title": "KL Divergence",
    "area": "Information Theory",
    "intro": "KL Divergence explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers KL Divergence in the context of machine learning.",
    "sections": {
      "Intuition": "**KL Divergence** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **KL Divergence** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **KL Divergence** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**KL Divergence** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/information-gain": {
    "title": "Information Gain",
    "area": "Information Theory",
    "intro": "Information Gain explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Information Gain in the context of machine learning.",
    "sections": {
      "Intuition": "**Information Gain** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Information Gain** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Information Gain** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Information Gain** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/cross-entropy": {
    "title": "Cross Entropy",
    "area": "Information Theory",
    "intro": "Cross Entropy explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Cross Entropy in the context of machine learning.",
    "sections": {
      "Intuition": "**Cross Entropy** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Cross Entropy** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Cross Entropy** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Cross Entropy** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/perplexity": {
    "title": "Perplexity",
    "area": "Information Theory",
    "intro": "Perplexity explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Perplexity in the context of machine learning.",
    "sections": {
      "Intuition": "**Perplexity** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Perplexity** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Perplexity** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Perplexity** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/jensen-shannon": {
    "title": "Jensen Shannon",
    "area": "Information Theory",
    "intro": "Jensen Shannon explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Jensen Shannon in the context of machine learning.",
    "sections": {
      "Intuition": "**Jensen Shannon** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Jensen Shannon** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Jensen Shannon** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Jensen Shannon** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/mutual-information": {
    "title": "Mutual Information",
    "area": "Information Theory",
    "intro": "Mutual Information explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Mutual Information in the context of machine learning.",
    "sections": {
      "Intuition": "**Mutual Information** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Mutual Information** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Mutual Information** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Mutual Information** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/information-theory/shannon-entropy": {
    "title": "Shannon Entropy",
    "area": "Information Theory",
    "intro": "Shannon Entropy explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Shannon Entropy in the context of machine learning.",
    "sections": {
      "Intuition": "**Shannon Entropy** builds intuition before formulas. In Information Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Shannon Entropy** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Shannon Entropy** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Shannon Entropy** connects directly to ML practice in Information Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/projections-least-squares": {
    "title": "Projections Least Squares",
    "area": "Linear Algebra",
    "intro": "Projections Least Squares explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Projections Least Squares** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Projections Least Squares** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Projections Least Squares** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Projections Least Squares** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/pca": {
    "title": "PCA",
    "area": "Linear Algebra",
    "intro": "PCA explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**PCA** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **PCA** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **PCA** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**PCA** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/determinants-inverses": {
    "title": "Determinants Inverses",
    "area": "Linear Algebra",
    "intro": "Determinants Inverses explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Determinants Inverses** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Determinants Inverses** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Determinants Inverses** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Determinants Inverses** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/dot-norm": {
    "title": "Dot Norm",
    "area": "Linear Algebra",
    "intro": "Dot Norm explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Dot Norm** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Dot Norm** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Dot Norm** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Dot Norm** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/matrix-multiplication": {
    "title": "Matrix Multiplication",
    "area": "Linear Algebra",
    "intro": "Matrix Multiplication explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Matrix Multiplication** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Matrix Multiplication** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Matrix Multiplication** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Matrix Multiplication** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/orthogonality": {
    "title": "Orthogonality",
    "area": "Linear Algebra",
    "intro": "Orthogonality explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Orthogonality** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Orthogonality** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Orthogonality** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Orthogonality** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/svd": {
    "title": "SVD",
    "area": "Linear Algebra",
    "intro": "SVD explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**SVD** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **SVD** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **SVD** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**SVD** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/matrix-calculus": {
    "title": "Matrix Calculus",
    "area": "Linear Algebra",
    "intro": "Matrix Calculus explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Matrix Calculus** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Matrix Calculus** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Matrix Calculus** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Matrix Calculus** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/positive-definite": {
    "title": "Positive Definite",
    "area": "Linear Algebra",
    "intro": "Positive Definite explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Positive Definite** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Positive Definite** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Positive Definite** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Positive Definite** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/lu-qr-decomposition": {
    "title": "LU QR Decomposition",
    "area": "Linear Algebra",
    "intro": "LU QR Decomposition explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**LU QR Decomposition** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **LU QR Decomposition** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **LU QR Decomposition** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**LU QR Decomposition** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/linear-algebra/eigenvalue-eigenvector": {
    "title": "Eigenvalue Eigenvector",
    "area": "Linear Algebra",
    "intro": "Eigenvalue Eigenvector explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nLinear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.",
    "sections": {
      "Intuition": "**Eigenvalue Eigenvector** builds intuition before formulas. In Linear Algebra, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Eigenvalue Eigenvector** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Eigenvalue Eigenvector** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Eigenvalue Eigenvector** connects directly to ML practice in Linear Algebra: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/graph-theory/computational-graphs": {
    "title": "Computational Graphs",
    "area": "Graph Theory",
    "intro": "Computational Graphs explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Computational Graphs in the context of machine learning.",
    "sections": {
      "Intuition": "**Computational Graphs** builds intuition before formulas. In Graph Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Computational Graphs** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Computational Graphs** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Computational Graphs** connects directly to ML practice in Graph Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/graph-theory/random-walks": {
    "title": "Random Walks",
    "area": "Graph Theory",
    "intro": "Random Walks explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Random Walks in the context of machine learning.",
    "sections": {
      "Intuition": "**Random Walks** builds intuition before formulas. In Graph Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Random Walks** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Random Walks** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Random Walks** connects directly to ML practice in Graph Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/graph-theory/gnn-intro": {
    "title": "GNN Intro",
    "area": "Graph Theory",
    "intro": "GNN Intro explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers GNN Intro in the context of machine learning.",
    "sections": {
      "Intuition": "**GNN Intro** builds intuition before formulas. In Graph Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **GNN Intro** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **GNN Intro** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**GNN Intro** connects directly to ML practice in Graph Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/graph-theory/graph-representations": {
    "title": "Graph Representations",
    "area": "Graph Theory",
    "intro": "Graph Representations explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Graph Representations in the context of machine learning.",
    "sections": {
      "Intuition": "**Graph Representations** builds intuition before formulas. In Graph Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Graph Representations** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Graph Representations** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Graph Representations** connects directly to ML practice in Graph Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/graph-theory/message-passing": {
    "title": "Message Passing",
    "area": "Graph Theory",
    "intro": "Message Passing explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Message Passing in the context of machine learning.",
    "sections": {
      "Intuition": "**Message Passing** builds intuition before formulas. In Graph Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Message Passing** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Message Passing** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Message Passing** connects directly to ML practice in Graph Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/graph-theory/spectral-graph": {
    "title": "Spectral Graph",
    "area": "Graph Theory",
    "intro": "Spectral Graph explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nThis lesson covers Spectral Graph in the context of machine learning.",
    "sections": {
      "Intuition": "**Spectral Graph** builds intuition before formulas. In Graph Theory, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Spectral Graph** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Spectral Graph** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Spectral Graph** connects directly to ML practice in Graph Theory: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/partial-derivatives": {
    "title": "Partial Derivatives",
    "area": "Calculus",
    "intro": "Partial Derivatives explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Partial Derivatives** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Partial Derivatives** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Partial Derivatives** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Partial Derivatives** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/taylor-series": {
    "title": "Taylor Series",
    "area": "Calculus",
    "intro": "Taylor Series explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Taylor Series** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Taylor Series** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Taylor Series** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Taylor Series** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/vector-fields": {
    "title": "Vector Fields",
    "area": "Calculus",
    "intro": "Vector Fields explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Vector Fields** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Vector Fields** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Vector Fields** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Vector Fields** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/local-vs-saddle": {
    "title": "Local vs Saddle",
    "area": "Calculus",
    "intro": "Local vs Saddle explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Local vs Saddle** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Local vs Saddle** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Local vs Saddle** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Local vs Saddle** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/backpropagation": {
    "title": "Backpropagation",
    "area": "Calculus",
    "intro": "Backpropagation explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Backpropagation** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Backpropagation** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Backpropagation** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Backpropagation** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/integration-auc": {
    "title": "Integration AUC",
    "area": "Calculus",
    "intro": "Integration AUC explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Integration AUC** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Integration AUC** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Integration AUC** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Integration AUC** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/chain-rule": {
    "title": "Chain Rule",
    "area": "Calculus",
    "intro": "Chain Rule explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Chain Rule** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Chain Rule** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Chain Rule** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Chain Rule** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/jacobian-hessian": {
    "title": "Jacobian Hessian",
    "area": "Calculus",
    "intro": "Jacobian Hessian explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Jacobian Hessian** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Jacobian Hessian** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Jacobian Hessian** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Jacobian Hessian** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  },
  "/ml-math/calculus/limits-continuity": {
    "title": "Limits Continuity",
    "area": "Calculus",
    "intro": "Limits Continuity explained through ML-focused intuition, formulas, and interactive checkpoints.\n\nCalculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.",
    "sections": {
      "Intuition": "**Limits Continuity** builds intuition before formulas. In Calculus, focus on what the quantity *means* for a dataset or model, not just how to compute it.\n\n",
      "Formula": "Key identities for **Limits Continuity** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.\n\n| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |",
      "Worked Example": "Walk through a tiny numeric example for **Limits Continuity** by hand, then replicate it in NumPy with `shape` prints at each step.\n\n",
      "ML Connection": "**Limits Continuity** connects directly to ML practice in Calculus: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.\n\n"
    }
  }
};
