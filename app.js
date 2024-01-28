//The measures of central tendency
class Statistics {
  constructor(data) {
    this.data = data;
  }

  // Compute the mean
  mean() {
    const sum = this.data.reduce((acc, curr) => acc + curr, 0);
    return sum / this.data.length;
  }

  // Compute the median
  median() {
    const sortedData = this.data.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
      return (sortedData[mid - 1] + sortedData[mid]) / 2;
    } else {
      return sortedData[mid];
    }
  }

  // Compute the mode
  mode() {
    const frequencyMap = new Map();
    this.data.forEach((num) => {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    let maxFrequency = 0;
    let modes = [];

    frequencyMap.forEach((frequency, num) => {
      if (frequency > maxFrequency) {
        modes = [num];
        maxFrequency = frequency;
      } else if (frequency === maxFrequency) {
        modes.push(num);
      }
    });

    if (modes.length === 0) {
      return [];
    } else {
      return modes;
    }
  }
}

// The measure of central tendency output
const data = [1, 22, 83, 47, 65, 54, 33, 10, 8, 7, 22, 30, 50];
const stats = new Statistics(data);

console.log("Mean:", stats.mean());
console.log("Median:", stats.median());
console.log("Mode:", stats.mode());

console.log("-----------------------------------");

//The measures of dispersion
class DispersionStatistics {
  constructor(content) {
    this.content = content;
  }

  // Calculate the range
  range() {
    const sortedData = this.content.sort((a, b) => a - b);
    return sortedData[sortedData.length - 1] - sortedData[0];
  }

  // Calculate the interquartile range
  interquartileRange() {
    const sortedData = this.content.sort((a, b) => a - b);
    const q1 = this.quantile(0.25);
    const q3 = this.quantile(0.75);
    return q3 - q1;
  }

  // Calculate a specific quantile
  quantile(p) {
    const sortedData = this.content.sort((a, b) => a - b);
    const index = (sortedData.length - 1) * p;
    const lowerIndex = Math.floor(index);
    const fraction = index - lowerIndex;
    if (lowerIndex === sortedData.length - 1) {
      return sortedData[lowerIndex];
    }
    return (
      sortedData[lowerIndex] +
      fraction * (sortedData[lowerIndex + 1] - sortedData[lowerIndex])
    );
  }

  // Calculate the variance
  variance() {
    const mean = this.mean();
    const squaredDiffs = this.content.map((x) => Math.pow(x - mean, 2));
    return (
      squaredDiffs.reduce((acc, val) => acc + val, 0) / this.content.length
    );
  }

  // Calculate the standard deviation
  standardDeviation() {
    return Math.sqrt(this.variance());
  }

  // Calculate the mean absolute deviation
  meanAbsoluteDeviation() {
    const mean = this.mean();
    const absoluteDiffs = this.content.map((x) => Math.abs(x - mean));
    return (
      absoluteDiffs.reduce((acc, val) => acc + val, 0) / this.content.length
    );
  }

  // Calculate the mean
  mean() {
    return (
      this.content.reduce((acc, val) => acc + val, 0) / this.content.length
    );
  }
}

// The measures of dispersion output
const content = [24, 71, 10, 93, 32, 55, 63, 18, 26];
const stat = new DispersionStatistics(content);
console.log("Range:", stat.range());
console.log("Interquartile Range:", stat.interquartileRange());
console.log("Variance:", stat.variance());
console.log("Standard Deviation:", stat.standardDeviation());
console.log("Mean Absolute Deviation:", stat.meanAbsoluteDeviation());
