export interface IAuthProps {
    email: string;
    password: string;
}

enum GroupEnum {
    ADMINISTRADOR,
    VISITANTE,
    GERENTE,
    GUIA
}
export interface ILoginReturn {
    id: string;
    email: string;
    token: string;
    group: GroupEnum
}