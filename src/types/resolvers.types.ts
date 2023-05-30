export type CommonResolversFunction<K, T> = (
  _: any,
  args: { [key: string]: K },
  context: any
) => Promise<T>;

export type CommonService<K, T> = {
  Query?: {
    [key: string]: CommonResolversFunction<K, T>;
  };
  Mutation?: {
    [key: string]: CommonResolversFunction<K, T>;
  };
};
