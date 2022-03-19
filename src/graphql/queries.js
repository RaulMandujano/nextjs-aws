/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCharacterData = /* GraphQL */ `
  query GetCharacterData($id: ID!) {
    getCharacterData(id: $id) {
      id
      name
      birthday
      occupation
      img
      status
      nickname
      appearance
      portrayed
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCharacterData = /* GraphQL */ `
  query ListCharacterData(
    $filter: ModelCharacterDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacterData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        birthday
        occupation
        img
        status
        nickname
        appearance
        portrayed
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCharacterData = /* GraphQL */ `
  query SyncCharacterData(
    $filter: ModelCharacterDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCharacterData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        birthday
        occupation
        img
        status
        nickname
        appearance
        portrayed
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
