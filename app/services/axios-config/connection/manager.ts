import { api } from "..";
import { ILanguagesProps } from "./types/ILanguagesProps";

export class ManagerService {
    async createManagerAccount(formData: any): Promise<void> {

        await api.post(`/manager/create-account`, formData);
    }

}

export const managerService = new ManagerService();
