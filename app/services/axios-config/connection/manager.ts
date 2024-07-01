import { api } from "..";
import { ParkManager } from "./types/IGetManagerProfile";

export class ManagerService {
    async approveGuide(id: number, status: string, managerId: number): Promise<void> {
        await api.post(`/manager/approve-guide`, { id, status, managerId });
    }

    async createManagerAccount(formData: any): Promise<void> {

        await api.post(`/manager/create-account`, formData);
    }

    async getManagerProfile(userId: number): Promise<ParkManager> {

        return await api.get(`/manager/get-manager-profile/${userId}`);
    }

}

export const managerService = new ManagerService();
