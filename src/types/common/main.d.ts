type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
type PropsWithClassName<P = unknown> = P & { className?: string };
type PropsWithChildrenAndClassName<P = unknown> = PropsWithClassName<P> &
  PropsWithChildren<P>;

type ZodShape<T> = {
  // Require all the keys from T
  [key in keyof T]-?: undefined extends T[key]
    ? // When optional, require the type to be optional in zod
    z.ZodOptionalType<z.ZodType<T[key]>>
    : z.ZodType<T[key]>;
};
