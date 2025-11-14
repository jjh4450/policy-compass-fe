import { create } from "zustand";
import type { EnterpriseFormData } from "@/shared/types/enterprise";

interface EnterpriseStore {
  formData: EnterpriseFormData;
  setFormData: (data: Partial<EnterpriseFormData>) => void;
  resetFormData: () => void;
}

const initialFormData: EnterpriseFormData = {
  name: "",
  bizRegNo: "",
  companySize: "",
  regionId: null,
  sectorCode: "",
  establishedDate: "",
  employeesCount: null,
  revenueAmount: null,
};

export const useEnterpriseStore = create<EnterpriseStore>((set) => ({
  formData: initialFormData,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetFormData: () => set({ formData: initialFormData }),
}));
