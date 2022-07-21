import { FC, PropsWithChildren } from 'react';

declare module 'react' {
  // Custom Type for a React functional component with props AND CHILDREN
  export type FCChildren<P = unknown> = FC<PropsWithChildren<P>>;
}
