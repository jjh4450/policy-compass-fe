import { create } from "zustand";

export type CompanySize = "소기업" | "중기업" | "대기업";

export interface EnterpriseFormData {
  name: string;
  bizRegNo: string;
  companySize: CompanySize | "";
  regionId: number | null;
  sectorCode: string;
  establishedDate: string;
  employeesCount: number | null;
  revenueAmount: number | null;
}

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
