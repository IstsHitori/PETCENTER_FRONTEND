import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice, IAuthSlice } from "./AuthSlice";
import { createPatientSlice, IPatientSlice } from "./PatientSlice";
import { createProductSlice, IProductSlice } from "./ProductSlice";
import { createHistorySlice, IHistorySlice } from "./HistorySlice";
import { createCategorySlice, ICategorySlice } from "./CategorySlice";
import { createServiceSlice,IServiceSlice } from "./ServiceSlice";

export const useVeterinarieStore = create<
  IAuthSlice & IPatientSlice & IHistorySlice & IProductSlice & ICategorySlice & IServiceSlice
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createPatientSlice(...a),
    ...createHistorySlice(...a),
    ...createProductSlice(...a),
    ...createCategorySlice(...a),
    ...createServiceSlice(...a),
  }))
);
