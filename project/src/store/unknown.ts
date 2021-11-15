enum UnknownActionType {
  Unknown = 'data/unknown',
}

const unknownAction = () => ({
  type: UnknownActionType.Unknown,
} as const);

export {
  UnknownActionType,
  unknownAction
};
