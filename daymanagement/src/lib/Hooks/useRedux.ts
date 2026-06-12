// hooks/useRedux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState, store } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Optional: Hook to check if Redux is hydrated
export const useReduxHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if localStorage was loaded
    const checkHydration = () => {
      const state = store.getState();
      if (state && Object.keys(state).length > 0) {
        setIsHydrated(true);
      }
    };

    checkHydration();
    const unsubscribe = store.subscribe(checkHydration);
    return () => unsubscribe();
  }, []);

  return isHydrated;
};
