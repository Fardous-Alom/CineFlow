"use client";
import { useRef } from "react";
import makeStore from "../lib/store/store";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  if(!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
