
export interface User {
    email: string;
    name: string;
    phone: string;
    group: string
}

export interface Manager {
    cpf: string;
    rg: string;
    user: User
}

export interface Guide {
    id: number;
    biography: string;
    nickname: string;
    birthDate: Date;
    guideImage: string;
    user: User;
    gender: string;
    specialtyGuide?: {
        id: number;
        specialtyId: number;
        guideId: number;
        specialty: {
          id: number;
          specialtyName: string;
        }
      }[];
      languageGuide?: {
        language: {
            languageName: string
        }
      }[]
}

export interface Event {
    id: number;
    event_name: string;
    eventImage: string;
    locationRef: string;
    start_date: string;
}

export interface Infrastructure {
    id: number;
    status: boolean;
    parkId: number;
    infrastructureId: number;
    infrastructure: {
        id: number;
        type: string;
    }
}

enum DifficultyLevel {
    FACIL,
    MEDIO ,
    DIFICIL,
  }

export interface Activity {
    id: number;
    description: string;
    percurso: number;
    duracao: number;
    isMonitored: boolean;
    difficultyLevel: DifficultyLevel
    activityName: string;
    activityImage: string;
}

export interface Park {
    id: number;
    description: string;
    site: string;
    parkImage: string;
    park_name: string;
    city: string;
    core: string;
    neighborhood: string
    number: string;
    publicPlace: string;
    state: string;
    street: string;
    zipCode: string;
    openingHours?: string;
    florestType?: string;
    guide: Guide[];
    events: Event[];
    infrastructure?: Infrastructure[];
    activity: Activity[];
}

export interface IListManyParksInfo {
    park: Park[]
}