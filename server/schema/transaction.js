module.exports = `
  type Transaction {
    id: ID!
    account: Account!
    name: String!
    type: String!
    date: String!
    amount: Float!
    currency: String
    description: String
  }
  type Query {
    getTransaction(id: ID!): Transaction!
    getAllTransactions(query: GetAllInput): [Transaction]!
  }
  type Mutation {
    createTransaction(input: CreateTransactionInput): Transaction
    updateTransaction(input: UpdateTransactionInput): Transaction
    deleteTransaction(input: DeleteTransactionInput): Boolean!
  }

  input GetAllInput {
    filter: String
    sort: SortInput
    page: Int
    pageLength: Int
  }
  input SortInput {
    field: String!
    order: String!
  }
  input CreateTransactionInput {
    accountId: ID!
    name: String!
    type: String!
    date: String!
    amount: Float!
    currency: String
    description: String
  }
  input UpdateTransactionInput {
    id: ID!
    accountId: ID
    name: String
    type: String
    date: String
    amount: Float
    currency: String
    description: String
  }
  input DeleteTransactionInput {
    id: ID!
  }
`;
