interface Infrastructure {
    id: number;
    type: string;
  }
  
  interface ParkInfrastructure {
    id: number;
    status: boolean;
    parkId: number;
    infrastructureId: number;
    infrastructure: Infrastructure;
  }
  
  interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    phone: string;
    group: 'ADMINISTRADOR' | 'VISITANTE' | 'GERENTE' | 'GUIA';
  }
  
  interface Guide {
    id: number;
    gender: 'FEMININO' | 'MASCULINO' | 'NAO_RESPONDER';
    biography: string;
    nickname: string;
    birthDate: Date;
    approvalStatus: 'PENDENTE' | 'APROVADO' | 'REPROVADO';
    guideImage: string;
    userId: number;
    parkManagerId: number;
    user: User;
  }
  
  export interface ParkGuide {
    id: number;
    parkId: number;
    guideId: number;
    guide: Guide;
  }
  
  interface ForestType {
    id: number;
    name: string;
  }
  
  interface ParkForestType {
    id: number;
    parkId: number;
    forestTypeId: number;
    forestType: ForestType;
  }
  
  interface OpeningHours {
    id: number;
    dayWeek: 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO' | 'DOMINGO';
    startTime: Date;
    endTime: Date;
    parkId: number;
  }
  
  export interface Event {
    id: number;
    event_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    locationRef: string;
    eventImage: string;
    parkId: number;
  }
  
  export interface Activity {
    id: number;
    percurso: number;
    duracao: number;
    description: string;
    difficultyLevel: 'FACIL' | 'MEDIO' | 'DIFICIL';
    activityName: string;
    activityImage: string;
    parkId: number;
  }
  
  export interface GoodPractice {
    id: number;
    title: string;
    practiceImage: string;
    parkId: number;
  }
  
  interface Park {
    id: number;
    park_name: string;
    description: string;
    site: string;
    parkImage: string;
    street: string;
    number: string;
    zipCode: string;
    publicPlace: string;
    city: string;
    state: string;
    neighborhood: string;
    core: string;
    goodPractice: GoodPractice[];
    activity: Activity[];
    event: Event[];
    openingHours: OpeningHours[];
    parkForestType: ParkForestType[];
    parkGuide: ParkGuide[];
    parkInfrastructure: ParkInfrastructure[];
  }
  
  export interface ParkManager {
    id: number | null;
    cpf: string;
    rg: string;
    approvalStatus: 'PENDENTE' | 'APROVADO' | 'REPROVADO';
    parkId: number;
    userId: number;
    userManagerId: number;
    park: Park;
    user: User
  }