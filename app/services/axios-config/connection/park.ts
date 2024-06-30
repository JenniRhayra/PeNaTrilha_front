import { api } from "..";
import { IForestType } from "./types/IForestType";
import { Activity, Event, IListManyParksInfo, Park } from "./types/IListManyParksInfo";
import { IParkProp } from "./types/IParkProp";

export class ParkService {
    async createParkAccount(formData: FormData): Promise<void> {

        await api.post(`/park/create-account`, formData);
    }

    async listActivityById(id: number): Promise<Partial<Activity>> {
        return await api.get(`/park/list-activity-by-id/${id}`);
    }

    async listEventById(id: number): Promise<Partial<Event>> {
        return await api.get(`/park/list-event-by-id/${id}`);
    }

    async listForestTypes(): Promise<IForestType[]> {
        return await api.get('/park/list-forest-type');
    }

    async listManyParkInfo(): Promise<IListManyParksInfo> {
        return await api.get('/park/list-many-parks-info');
    }

    async listManyParkInfoById(id: number): Promise<Park> {
        return await api.get(`/park/list-many-parks-info/${id}`)
    }

    async listParks(): Promise<IParkProp[]> {
        return await api.get('/park/list-park');
    }
}

export const parkService = new ParkService();
