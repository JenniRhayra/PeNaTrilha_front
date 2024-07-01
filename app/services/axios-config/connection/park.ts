import { api } from "..";
import { IForestType } from "./types/IForestType";
import { Activity, Event, IListManyParksInfo, Park } from "./types/IListManyParksInfo";
import { IParkProp } from "./types/IParkProp";

export class ParkService {
    async createActivity(formData: FormData): Promise<void> {
        await api.post(`/park/create-activity`, formData);
    }
    
    async createParkAccount(formData: FormData): Promise<void> {

        await api.post(`/park/create-account`, formData);
    }

    async deleteActivity(id: number): Promise<void> {
        await api.delete(`/park/delete-activity/${id}`);
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

    async listManyActivityById(managerId: number): Promise<IListManyParksInfo> {
        return await api.get(`/park/list-many-activity-by-id/${managerId}`);
    }

    async listManyEventById(managerId: number): Promise<any> {
        return await api.get(`/park/list-many-events-by-id/${managerId}`);
    }

    async listManyGoodPracticeById(managerId: number): Promise<any> {
        return await api.get(`/park/list-many-good-practice-by-id/${managerId}`);
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

    async updateActivity(data: any): Promise<void> {
        return await api.put(`/park/update-activity`, data);
    }
}

export const parkService = new ParkService();
