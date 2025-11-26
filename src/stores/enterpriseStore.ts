import { create } from "zustand";
import type { EnterpriseFormData } from "@/shared/types/enterprise";

interface EnterpriseStore {
  formData: EnterpriseFormData;
  companyId: string | null;
  setFormData: (data: Partial<EnterpriseFormData>) => void;
  setCompanyId: (id: string | null) => void;
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
  companyId: null,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setCompanyId: (id) => set({ companyId: id }),
  resetFormData: () => set({ formData: initialFormData, companyId: null }),
}));
