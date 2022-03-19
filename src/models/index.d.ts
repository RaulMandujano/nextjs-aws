import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CharacterDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class CharacterData {
  readonly id: string;
  readonly name?: string | null;
  readonly birthday?: string | null;
  readonly occupation?: string | null;
  readonly img?: string | null;
  readonly status?: string | null;
  readonly nickname?: string | null;
  readonly appearance?: string | null;
  readonly portrayed?: string | null;
  readonly category?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CharacterData, CharacterDataMetaData>);
  static copyOf(source: CharacterData, mutator: (draft: MutableModel<CharacterData, CharacterDataMetaData>) => MutableModel<CharacterData, CharacterDataMetaData> | void): CharacterData;
}