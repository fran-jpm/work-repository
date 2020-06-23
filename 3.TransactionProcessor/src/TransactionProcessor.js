class TransactionProcessor {
  // QUESTION: COMPLETE ALL CLASS FUNCTIONS TO PASS THE TESTS

  constructor(transactions) {
    this.transactions = transactions;
  }

  print(tx) {
    console.log(
      `ID: ${tx.id} - Brand: ${tx.brand} - Currency: ${tx.currency} - Amount: ${tx.amount}`
    );
  }

  // Check valid transactions rules
  static isValidTransaction(transaction) {
    // ...
    return transaction.id > 0 && transaction.amount >= 0 && ["visa", "mastercard", "amex"].includes(transaction.brand) && ["EUR", "GBP", "USD"].includes(transaction.currency) 
  }

  // Remove invalid transactions
  filterInvalidTransactions() {
    // ...
    this.transactions = this.transactions.filter(transaction => !TransactionProcessor.isValidTransaction(transaction));
    return this;
  }

  // Return transactions of given currency
  getTransactionsByCurrency(currency) {
    // ...
    this.transactions = this.transactions.filter(transaction => transaction.currency === currency);
    return this;
  }

  // Return transactions of given brand
  getTransactionsByBrand(brand) {
    // ...
    this.transactions = this.transactions.filter(transaction => transaction.brand === brand);
    return this;
  }

  // BONUS:
  // Apply multiple filters. Filters parameter should be an array of functions (predicates)
  filterTransaction(filters) {
    // ...
    this.transactions = this.transactions.filter( t => filters.every(filter => filter(t)))
    return this;
  }

  // Return the total amount of current transactions array
  sum() {
    let total = this.transactions.reduce((cont, item) => {
      cont += TransactionProcessor.isValidTransaction(item) ? item.amount : 0
      return cont
    }, 0)
    return Math.round(total * 100) / 100;
  }
}

module.exports = TransactionProcessor;
