import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice, IAuthSlice } from "./AuthSlice";
import { createPatientSlice, IPatientSlice } from "./PatientSlice";
import { createProductSlice, IProductSlice } from "./ProductSlice";
import { createHistorySlice, IHistorySlice } from "./HistorySlice";
import { createCategorySlice, ICategorySlice } from "./CategorySlice";

export const useVeterinarieStore = create<
  IAuthSlice & IPatientSlice & IHistorySlice & IProductSlice & ICategorySlice
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createPatientSlice(...a),
    ...createHistorySlice(...a),
    ...createProductSlice(...a),
    ...createCategorySlice(...a)
  }))
);
