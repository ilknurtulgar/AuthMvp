//DTO, frontend (Next.js) tarafından bize gönderilecek verinin (e-posta, 
// kullanıcı adı, şifre) şablonudur. Gelişi güzel veriler gelmesini engeller.
export class RegisterDto {
  email: string;
  username: string;
  password: string;
}
