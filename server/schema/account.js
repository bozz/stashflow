module.exports = `
  type Account {
    id: ID!
    key: String!
    type: String!
    name: String!
    bank: String!
    iban: String
    bic: String
    description: String
  }
  type Query {
    getAccount(id: ID!): Account!
    getAllAccounts(query: GetAllInput): [Account]
  }
  type Mutation {
    createAccount(input: CreateAccountInput): Account
    updateAccount(input: UpdateAccountInput): Account
    deleteAccount(input: DeleteAccountInput): Boolean!
  }

  input CreateAccountInput {
    key: String!
    type: String!
    name: String!
    bank: String!
    iban: String
    bic: String
    description: String
  }
  input UpdateAccountInput {
    id: ID!,
    key: String
    type: String
    name: String
    bank: String
    iban: String
    bic: String
    description: String
  }
  input DeleteAccountInput {
    id: ID!
  }
`;
