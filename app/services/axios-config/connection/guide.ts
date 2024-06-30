import { api } from "..";
import { ILoginReturn } from "./types/IAuthProps";
import { IGetGuide } from "./types/IGetGuide";
import { ILanguagesProps } from "./types/ILanguagesProps";

export class GuideService {
    async createGuideAccount(formData: FormData): Promise<ILoginReturn> {

        return await api.post(`/guide/create-account`, formData);
    }

    async getGuideByParkIdAndGuideId(parkId: number, guideId: number): Promise<IGetGuide> {

        return await api.get(`/guide/get-guide/${parkId}/${guideId}`);
    }

    async getGuideProfile(userId: number): Promise<IGetGuide> {

        return await api.get(`/guide/get-guide-profile/${userId}`);
    }

    async listLanguages(): Promise<ILanguagesProps[]> {
        return await api.get('/guide/list-languages');
    }

    async listSpeciality(): Promise<ILanguagesProps[]> {
        return await api.get('/guide/list-specialitys');
    }
}

export const guideService = new GuideService();
