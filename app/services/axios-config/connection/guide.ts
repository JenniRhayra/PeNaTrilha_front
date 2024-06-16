import { api } from "..";
import { ILanguagesProps } from "./types/ILanguagesProps";

export class GuideService {
    async createGuideAccount(formData: FormData): Promise<void> {

        await api.post(`/guide/create-account`, formData);
    }

    async listLanguages(): Promise<ILanguagesProps[]> {
        return await api.get('/guide/list-languages');
    }

    async listSpeciality(): Promise<ILanguagesProps[]> {
        return await api.get('/guide/list-specialitys');
    }
}

export const guideService = new GuideService();
