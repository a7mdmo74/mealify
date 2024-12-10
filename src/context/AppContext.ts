import { createContext, useContext } from "react";
import { CartItem, Meal } from "@/lib/typing";

interface AppContextType {
  cartData: Meal[];
  savedData: CartItem[];
  getSavedItems: (userId: string | null) => Promise<void>;
  setCartData: (data: Meal[]) => void;
  setSavedData: (data: CartItem[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
