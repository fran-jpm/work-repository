const request = require("supertest");
const app = require("../../app");

let players = [
    { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
    { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
    { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
    { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] }
  ];
  let objects = [
    { id: 1, name: "spoon", value: -1 },
    { id: 2, name: "knife", value: -10 },
    { id: 3, name: "sword", value: -20 },
    { id: 4, name: "potion", value: +20 }
  ];

describe("TransactionProcessor.isValidTransaction method", () => {
  test("isValidTransaction true - ok", () => {
    expect(true).toBe(true);
  });

  test("It should response the GET method", () => {
    return request(app)
      .get("/players")
      .expect(200);
  });
});

// describe("TransactionProcessor.filterInvalidTransactions method", () => {
//   beforeAll(() => {
//     processor = new TransactionProcessor(transactions);
//   });

//   test("filterInvalidTransactions empty array - 0", () => {
//     const processorEmpty = new TransactionProcessor([]);
//     expect(
//       processorEmpty.filterInvalidTransactions().transactions
//     ).toHaveLength(0);
//   });

//   test("filterInvalidTransactions with valid array", () => {
//     expect(processor.filterInvalidTransactions().transactions).toHaveLength(1);
//   });
// });

// describe("TransactionProcessor.getTransactionsByCurrency method ", () => {
//   beforeAll(() => {
//     processor = new TransactionProcessor(transactions);
//   });

//   test("getTransactionsByCurrency empty array", () => {
//     const processorEmpty = new TransactionProcessor([]);
//     expect(
//       processorEmpty.getTransactionsByCurrency("EUR").transactions
//     ).toHaveLength(0);
//   });

//   test("getTransactionsByCurrency with valid currency", () => {
//     expect(
//       processor.getTransactionsByCurrency("EUR").transactions
//     ).toHaveLength(1);
//   });

//   test("getTransactionsByCurrency with false currency", () => {
//     expect(
//       processor.getTransactionsByCurrency("eURo").transactions
//     ).toHaveLength(0);
//   });
// });

// describe("TransactionProcessor.getTransactionsByBrand method", () => {
//   beforeAll(() => {
//     processor = new TransactionProcessor(transactions);
//   });

//   test("getTransactionsByBrand empty array", () => {
//     const processorEmpty = new TransactionProcessor([]);
//     expect(
//       processorEmpty.getTransactionsByBrand("visa").transactions
//     ).toHaveLength(0);
//   });

//   test("getTransactionsByBrand with valid brand", () => {
//     expect(processor.getTransactionsByBrand("visa").transactions).toHaveLength(1);
//   });

//   test("getTransactionsByBrand with false brand", () => {
//     expect(processor.getTransactionsByBrand("v1sa").transactions).toHaveLength(
//       0
//     );
//   });
// });

// describe("TransactionProcessor.filterTransaction method", () => {
//   beforeAll(() => {
//     processor = new TransactionProcessor(transactions);
//   });

//   test("filterTransaction empty array", () => {
//     const processorEmpty = new TransactionProcessor([]);
//     expect(processorEmpty.filterTransaction([]).transactions).toHaveLength(0);
//   });

//   test("filterTransaction with predicates", () => {
//     const lowAmountFilter = tx => tx.amount < 10;
//     const visaFilter = tx => tx.brand === "visa";
//     const euroFilter = tx => tx.currency === "EUR";

//     expect(
//       processor.filterTransaction([lowAmountFilter, visaFilter, euroFilter])
//         .transactions
//     ).toHaveLength(1);
//   });

//   test("filterTransaction with no result predicates", () => {
//     const yenFilter = tx => tx.currency === "JPY";

//     expect(processor.filterTransaction([yenFilter]).transactions).toHaveLength(
//       0
//     );
//   });
// });

// describe("TransactionProcessor.sum method", () => {
//   beforeAll(() => {
//     processor = new TransactionProcessor(transactions);
//   });

//   test("sum transactions empty array", () => {
//     const processorEmpty = new TransactionProcessor([]);
//     expect(processorEmpty.sum()).toBe(0);
//   });

//   test("sum transactions valid array", () => {
//     expect(processor.sum()).toBe(6.06);
//   });
// });

// describe("Fluent method", () => {
//   beforeAll(() => {
//     processor = new TransactionProcessor(transactions);
//   });

//   test("filter empty array visa and sum", () => {
//     const processorEmpty = new TransactionProcessor([]);
//     expect(processorEmpty.getTransactionsByBrand("visa").sum()).toBe(0);
//   });

//   test("filter visa and sum", () => {
//     expect(processor.getTransactionsByBrand("visa").sum()).toBe(1.01);
//   });
// });