export interface TranslationResource {
  nav: {
    brand: string;
    tabStandard: string;
    tabScientific: string;
    switchToLight: string;
    switchToDark: string;
    browseCalculators: string;
    openMemory: string;
    openHistory: string;
    openSettings: string;
  };
  footer: {
    text: string;
  };
  sidebar: {
    history: string;
    memory: string;
    settings: string;
    calculators: string;
  };
  modes: {
    searchPlaceholder: string;
    noMatches: string;
    comingSoon: string;
    category: {
      Core: string;
      Finance: string;
      'Health & Date': string;
      Utility: string;
      Math: string;
    };
  };
  settings: {
    theme: string;
    themeOptions: {
      light: string;
      dark: string;
      amoled: string;
      'high-contrast': string;
    };
    accentColor: string;
    accentColorSwatch: string;
    highContrastNote: string;
    fontSize: string;
    buttonSize: string;
    animationSpeed: string;
    decimalPrecision: string;
    historyLimit: string;
    layoutDensity: string;
    density: {
      comfortable: string;
      compact: string;
    };
    defaultCalculator: string;
    rememberLastUsed: string;
    language: string;
    preferences: string;
    soundEffects: string;
    hapticFeedback: string;
    reduceMotion: string;
    resetToDefaults: string;
    resetModalTitle: string;
    resetModalBody: string;
    confirmReset: string;
  };
  common: {
    cancel: string;
    closeDialog: string;
    backToCalculators: string;
  };
  pages: {
    percentage: {
      title: string;
      calculationType: string;
      modeOf: string;
      modeIs: string;
      modeChange: string;
      valueX: string;
      ofValueY: string;
      fromValue: string;
      toValue: string;
      ofResultLabel: string;
      percentOfLabel: string;
      changeLabel: string;
    };
    discount: {
      title: string;
      originalPrice: string;
      discount: string;
      youSave: string;
      finalPrice: string;
    };
    gst: {
      title: string;
      gstMode: string;
      addGst: string;
      removeGst: string;
      amountExclGst: string;
      amountInclGst: string;
      gstRate: string;
      baseAmount: string;
      gstAmount: string;
      totalAmount: string;
    };
    tip: {
      title: string;
      billAmount: string;
      tip: string;
      splitBetween: string;
      people: string;
      tipAmount: string;
      totalBill: string;
      perPerson: string;
    };
    bmi: {
      title: string;
      unitSystem: string;
      metric: string;
      imperial: string;
      height: string;
      weight: string;
      bmi: string;
      category: string;
    };
    age: {
      title: string;
      dateOfBirth: string;
      asOf: string;
      age: string;
      totalDaysLived: string;
    };
    simpleInterest: {
      title: string;
      principal: string;
      annualRate: string;
      time: string;
      years: string;
      interest: string;
      totalAmount: string;
    };
    compoundInterest: {
      title: string;
      principal: string;
      annualRate: string;
      time: string;
      years: string;
      compoundingFrequency: string;
      yearly: string;
      halfYearly: string;
      quarterly: string;
      monthly: string;
      interest: string;
      totalAmount: string;
    };
    emi: {
      title: string;
      loanAmount: string;
      annualInterestRate: string;
      tenure: string;
      tenureUnit: string;
      years: string;
      months: string;
      monthlyEmi: string;
      totalInterest: string;
      totalPayment: string;
    };
    loan: {
      title: string;
      loanAmount: string;
      annualInterestRate: string;
      tenure: string;
      years: string;
      monthlyPayment: string;
      totalInterest: string;
      totalPayment: string;
      yearlyBreakdown: string;
      year: string;
      principalPaid: string;
      interestPaid: string;
      balance: string;
    };
    mortgage: {
      title: string;
      homePrice: string;
      downPayment: string;
      annualInterestRate: string;
      loanTerm: string;
      years: string;
      loanAmount: string;
      monthlyPayment: string;
      totalInterest: string;
      totalCost: string;
    };
    investment: {
      title: string;
      initialInvestment: string;
      monthlyContribution: string;
      expectedAnnualReturn: string;
      duration: string;
      years: string;
      futureValue: string;
      totalContributions: string;
      interestEarned: string;
    };
    profitLoss: {
      title: string;
      costPrice: string;
      sellingPrice: string;
      profit: string;
      loss: string;
      percentage: string;
    };
    margin: {
      title: string;
      cost: string;
      revenue: string;
      profit: string;
      grossMargin: string;
      markup: string;
    };
    splitBill: {
      title: string;
      billAmount: string;
      numberOfPeople: string;
      tip: string;
      eachPersonPays: string;
      tipAmount: string;
      totalWithTip: string;
    };
    ratio: {
      title: string;
      calculationType: string;
      simplifyRatio: string;
      solveProportion: string;
      simplifiedRatio: string;
    };
    average: {
      title: string;
      numbers: string;
      placeholderExample: string;
      mean: string;
      median: string;
      mode: string;
      min: string;
      max: string;
      sum: string;
      count: string;
    };
    currency: {
      title: string;
      amount: string;
      exchangeRate: string;
      convertedAmount: string;
    };
    unitConverter: {
      title: string;
      category: string;
      value: string;
      from: string;
      to: string;
      result: string;
    };
    lcmGcd: {
      title: string;
      numbers: string;
      placeholderExample: string;
      gcd: string;
      lcm: string;
    };
    statistics: {
      title: string;
      numbers: string;
      placeholderExample: string;
      mean: string;
      range: string;
      stdDevPopulation: string;
      variancePopulation: string;
      stdDevSample: string;
      varianceSample: string;
    };
    probability: {
      title: string;
      calculationType: string;
      permutation: string;
      combination: string;
      eventProbability: string;
      favorableOutcomes: string;
      totalItemsN: string;
      totalOutcomes: string;
      chosenItemsR: string;
      probability: string;
      permutationLabel: string;
      combinationLabel: string;
    };
    quadratic: {
      title: string;
      roots: string;
      discriminant: string;
    };
    equationSolver: {
      title: string;
      solution: string;
      noSolution: string;
      infiniteSolutions: string;
    };
    matrix: {
      title: string;
      operation: string;
      matrixA: string;
      matrixB: string;
      determinant: string;
      cellAriaLabel: string;
    };
    vector: {
      title: string;
      dimension: string;
      twoD: string;
      threeD: string;
      operation: string;
      vectorA: string;
      vectorB: string;
      result: string;
      componentAriaLabel: string;
    };
    polynomial: {
      title: string;
      operation: string;
      evaluateOp: string;
      addOp: string;
      multiplyOp: string;
      pCoefficients: string;
      pCoefficientsPlaceholder: string;
      qCoefficients: string;
      qCoefficientsPlaceholder: string;
      result: string;
      evaluateLabel: string;
    };
    baseConverter: {
      title: string;
      from: string;
      to: string;
      value: string;
      result: string;
      binaryBase2: string;
      octalBase8: string;
      decimalBase10: string;
      hexadecimalBase16: string;
    };
    romanNumeral: {
      title: string;
      direction: string;
      numberToRoman: string;
      romanToNumber: string;
      numberInput: string;
      romanNumeralInput: string;
      romanNumeralPlaceholder: string;
      romanNumeralResultLabel: string;
      numberResultLabel: string;
      outOfRange: string;
      invalid: string;
    };
    timezoneConverter: {
      title: string;
      dateTime: string;
      fromTimezone: string;
      toTimezone: string;
      convertedTime: string;
    };
    dateCalculator: {
      title: string;
      calculationType: string;
      differenceBetweenDates: string;
      addSubtractDays: string;
      firstDate: string;
      secondDate: string;
      startDate: string;
      daysToAdd: string;
      difference: string;
      totalDays: string;
      resultingDate: string;
    };
    programmer: {
      title: string;
      inputBase: string;
      valueA: string;
      valueB: string;
      bitwiseOperation: string;
      aInAllBases: string;
      resultInAllBases: string;
      binary: string;
      octal: string;
      decimal: string;
      hex: string;
      hexadecimal: string;
    };
    randomNumber: {
      title: string;
      minimum: string;
      maximum: string;
      howMany: string;
      generate: string;
      result: string;
    };
  };
}
