import { bernoulli, bernoulliCDF, binomial, binomialCDF, geometric, geometricCDF, poisson, poissonCDF, hypergeometric, hypergeometricCDF, uniform, uniformCDF, negativeBinomial, negativeBinomialCDF } from "./calculateValues.js";

const distributions = {
    bernoulli: {
      name: "Bernoulli",
      func: bernoulli,
      xLabel: "Number of Successes",
      params: [{ name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 }],
    },
    bernoulliCDF: {
      name: "Bernoulli CDF",
      func: bernoulliCDF,
      xLabel: "Number of Successes",
      params: [{ name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 }],
    },
    binomial: {
      name: "Binomial",
      func: binomial,
      xLabel: "Number of Successes",
      params: [
        { name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 },
        { name: "N", label: "Samples N", min: 1, max: 20, step: 1, default: 10}
      ],
    },
    binomialCDF: {
      name: "Binomial CDF",
      func: binomialCDF,
      xLabel: "Number of Successes",
      params: [
        { name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 },
        { name: "N", label: "Samples N", min: 1, max: 20, step: 1, default: 10}
      ],
    },
    geometric: {
      name: "Geometric",
      func: geometric,
      xLabel: "Number of Failures",
      params: [{ name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 }],
    },
    geometricCDF: {
      name: "Geometric CDF",
      func: geometricCDF,
      xLabel: "Number of Failures",
      params: [{ name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 }],
    },
    poisson: {
      name: "Poisson",
      func: poisson,
      xLabel: "Number of Arrivals",
      params: [{ name: "lambda", label: "Lambda λ", min: 0, max: 20, step: 0.1, default: 5 }],
    },
    poissonCDF: {
      name: "Poisson CDF",
      func: poissonCDF,
      xLabel: "Number of Arrivals",
      params: [{ name: "lambda", label: "Lambda λ", min: 0, max: 20, step: 0.1, default: 5 }],
    },
    hypergeometric: {
      name: "Hypergeometric",
      func: hypergeometric,
      xLabel: "Number of Successes",
      params: [
        { name: "M", label: "Population M", min: 1, max: 20, step: 1, default: 10 },
        { name: "K", label: "Successes K", min: 0, max: 20, step: 1, default: 10 },
        { name: "m", label: "Sample size m", min: 1, max: 10, step: 1, default: 5 },
      ],
    },
    hypergeometricCDF: {
      name: "Hypergeometric CDF",
      func: hypergeometricCDF,
      xLabel: "Number of Successes",
      params: [
        { name: "M", label: "Population M", min: 1, max: 20, step: 1, default: 10 },
        { name: "K", label: "Successes K", min: 0, max: 20, step: 1, default: 10 },
        { name: "m", label: "Sample size m", min: 1, max: 10, step: 1, default: 5 },
      ],
    },
    uniform: {
      name: "Uniform",
      func: uniform,
      xLabel: "Outcomes",
      params: [
        { name: "min", label: "Minimum", min: 0, max: 10, step: 1, default: 0 },
        { name: "max", label: "Maximum", min: 0, max: 10, step: 1, default: 10 },
      ]
    },
    uniformCDF: {
      name: "Uniform CDF",
      func: uniformCDF,
      xLabel: "Outcomes",
      params: [
        { name: "min", label: "Minimum", min: 0, max: 10, step: 1, default: 0 },
        { name: "max", label: "Maximum", min: 0, max: 10, step: 1, default: 10 },
      ]
    },
    negativeBinomial: {
      name: "Negative Binomial",
      func: negativeBinomial,
      xLabel: "Number of Failures",
      params: [
        { name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 },
        { name: "r", label: "Sucesses r", min: 0, max: 5, step: 0.01, default: 3 },
      ]
    },
    negativeBinomialCDF: {
      name: "Negative Binomial CDF",
      func: negativeBinomialCDF,
      xLabel: "Number of Failures",
      params: [
        { name: "p", label: "Probability p", min: 0, max: 1, step: 0.01, default: 0.5 },
        { name: "r", label: "Sucesses r", min: 0, max: 5, step: 0.01, default: 3 },
      ]
    }
  };

export default distributions