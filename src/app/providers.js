"use client";

import { Provider } from "jotai";

export default function Providers({ children }) {
  return <Provider>{children}</Provider>;
}
