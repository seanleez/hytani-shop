export type ISOString = string;

export enum ESortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export type TGetItemsResBody<T extends Record<string, any>> = {
  data: T[];
  total?: number;
};

export type TGetItemsCommonQuery<T extends Record<string, any> = Record<string, any>> = {
  sort?: `${keyof T & string},${ESortDirection}`;
  selectedFields?: `${keyof T & string}`;
  page?: string;
  size?: string;
};
