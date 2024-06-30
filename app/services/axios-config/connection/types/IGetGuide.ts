export interface IGetGuide {
  biography: string;
  guideImage: string;
  user: {
    name: string;
    email: string;
    phone: string;
  },
  specialtyGuide: {
    specialty: {
      specialtyName: string;
    }
  }[],
  languageGuide: {
    language: {
      languageName: string
    }
  }[],
  park: {
    id: number;
    description: string;
    parkImage: string;
    park_name: string;
  }[]
}