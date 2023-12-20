// import * as math from 'mathjs'

function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function choose(n, i) {
    return factorial(n) / (factorial(i) * factorial(n - i));
}

export function bernoulli(i,params) {
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;
    if (i === 1) {
        return p
    } else if (i === 0) {
        return 1 - p
    } else {
        return 0
    }
}

export function bernoulliCDF(i, params) {
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;
    if (i === 0) {
        return 1-p
    } else {
        return 1
    }
}

export function binomial(i,params) {
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;
    const N = params && params.hasOwnProperty("N") ? params.N : 10;
    if (i > N) {
        return 0
    } else {
        return choose(N,i) * Math.pow(p, i) * Math.pow(1 - p, N - i); 
    }
}

export function binomialCDF(i,params) {
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;
    const N = params && params.hasOwnProperty("N") ? params.N : 10;
    if (i > N) {
        return 1;
    } else {
        let value = 0;
        for (let j=0; j<=i; j++) {
            value += choose(N,j) * Math.pow(p, j) * Math.pow(1 - p, N - j); 
        }
        return value
    }
}

export function geometric(i,params) {
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;
    return Math.pow(1-p, i) * p
}

export function geometricCDF(i,params) {
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;
    let value = 0;
    for (let j=0; j<=i; j++) {
        value += Math.pow(1-p, j) * p; 
    }
    return value
}

export function poisson(i,params) {
    const lambda = params && params.hasOwnProperty("lambda") ? params.lambda : 5;
    return Math.pow(lambda, i) / factorial(i) * Math.exp(-lambda)
}

export function poissonCDF(i,params) {
    const lambda = params && params.hasOwnProperty("lambda") ? params.lambda : 5;
    let value = 0;
    for (let j=0; j<=i; j++) {
        value += Math.pow(lambda, j) / factorial(j) * Math.exp(-lambda) 
    }
    return value
}

export function hypergeometric(i,params) {
    const M = params && params.hasOwnProperty("M") ? params.M : 10;
    const K = params && params.hasOwnProperty("K") ? params.K : 10;
    const m = params && params.hasOwnProperty("m") ? params.m : 5;

    if (Math.max(0, m+K-M) > i) {
        return 0
    } else if (Math.min(K, m) < i) {
        return 0
    } else {
        return choose(K, i)*choose(M-K, m-i)/choose(M, m)
    }
}

export function hypergeometricCDF(i,params) {
    const M = params && params.hasOwnProperty("M") ? params.M : 10;
    const K = params && params.hasOwnProperty("K") ? params.K : 10;
    const m = params && params.hasOwnProperty("m") ? params.m : 5;

    
    let value = 0;
    for (let j=0; j<=i; j++) {
        value += hypergeometric(j, params)
    }
    return value
}

export function uniform(i,params) {
    const minVal = params && params.hasOwnProperty("min") ? params.min : 0;
    const maxVal = params && params.hasOwnProperty("max") ? params.max : 10;

    if (i < minVal || i > maxVal) {
        return 0
    } else {
        return 1/(maxVal - minVal + 1)
    }
}

export function uniformCDF(i,params) {
    const minVal = params && params.hasOwnProperty("min") ? params.min : 0;
    const maxVal = params && params.hasOwnProperty("max") ? params.max : 10;

    if (i < minVal) {
        return 0
    } else if (i > maxVal) {
        return 1
    } else {
        return (i - minVal + 1)/(maxVal - minVal + 1)
    }
}

export function negativeBinomial(i,params) {
    const r = params && params.hasOwnProperty("r") ? params.r : 3;
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;

    return math.gamma(r + i) / math.gamma(r) / factorial(i) * math.pow(p, r) * Math.pow(1 - p, i)
}

export function negativeBinomialCDF(i,params) {
    const r = params && params.hasOwnProperty("r") ? params.r : 3;
    const p = params && params.hasOwnProperty("p") ? params.p : 0.5;

    let value = 0;
    for (let j=0; j<=i; j++) {
        value += math.gamma(r + j) / math.gamma(r) / factorial(j) * math.pow(p, r) * Math.pow(1 - p, j)
    }
    return value
}