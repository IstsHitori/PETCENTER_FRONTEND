import { create } from "zustand";
import { createAuthSlice, IAuthSlice } from "./AuthSlice";
import { createPatientSlice, IPatientSlice } from "./PatientSlice";
import { devtools } from "zustand/middleware";
import { createHistorySlice, IHistorySlice } from "./HistorySlice";

export const useVeterinarieStore = create<
  IAuthSlice & IPatientSlice & IHistorySlice
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createPatientSlice(...a),
    ...createHistorySlice(...a),
  }))
);
