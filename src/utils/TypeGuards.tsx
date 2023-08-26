import { IUser } from '../interfaces/interfaces';

export const isUser = (obj: object): obj is IUser => {
  return (obj as IUser).username !== undefined;
};
