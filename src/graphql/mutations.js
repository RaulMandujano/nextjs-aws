/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCharacterData = /* GraphQL */ `
  mutation CreateCharacterData(
    $input: CreateCharacterDataInput!
    $condition: ModelCharacterDataConditionInput
  ) {
    createCharacterData(input: $input, condition: $condition) {
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
export const updateCharacterData = /* GraphQL */ `
  mutation UpdateCharacterData(
    $input: UpdateCharacterDataInput!
    $condition: ModelCharacterDataConditionInput
  ) {
    updateCharacterData(input: $input, condition: $condition) {
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
export const deleteCharacterData = /* GraphQL */ `
  mutation DeleteCharacterData(
    $input: DeleteCharacterDataInput!
    $condition: ModelCharacterDataConditionInput
  ) {
    deleteCharacterData(input: $input, condition: $condition) {
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
