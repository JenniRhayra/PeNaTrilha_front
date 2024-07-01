interface Language {
  id: number;
  languageName: string;
}

interface Specialty {
  id: number;
  specialtyName: string;
}

interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
}

interface Park {
  id: number;
  park_name: string;
}

export interface Guide {
  id: number;
  gender: string;
  biography: string;
  nickname: string;
  birthDate: string;
  approvalStatus: string;
  guideImage: string;
  userId: number;
  parkManagerId: number | null;
  languages: Language[];
  specialties: Specialty[];
  park: Park[];
  user: User;
}
