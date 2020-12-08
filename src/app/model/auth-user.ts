export interface AuthUser {
  id: number;
  token: string;
  nome: string;
  email: string;
  permissions: string[];
}
