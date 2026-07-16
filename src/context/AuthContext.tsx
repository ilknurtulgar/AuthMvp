// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import api from '../lib/axios';

// // "Hafızamızda" tutacağımız verilerin şablonu
// interface AuthContextType {
//   user: any;
//   setUser: (user: any) => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Sayfa ilk açıldığında "Ben kimim?" diye backend'e sorar
//   useEffect(() => {
//     api.get('/auth/me')
//       .then((res) => setUser(res.data))
//       .catch(() => setUser(null)) // Giriş yapmamışsa hata verir, null kalır
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Uygulamanın her yerinden (navbar, profil vb.) veriye erişmemizi sağlayan kanca
// export const useAuth = () => useContext(AuthContext);