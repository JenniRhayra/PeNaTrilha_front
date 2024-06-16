import { api } from "..";
import { IForestType } from "./types/IForestType";
import { IParkManegerProp } from "./types/IParkProp";

export class ParkService {
    async createParkAccount(formData: FormData): Promise<void> {

        await api.post(`/park/create-account`, formData);
    }

    async listForestTypes(): Promise<IForestType[]> {
        return await api.get('/park/list-forest-type');
    }

    async listParks(): Promise<IParkManegerProp[]> {
        return await api.get('/park/list-park');
    }
}

export const parkService = new ParkService();
