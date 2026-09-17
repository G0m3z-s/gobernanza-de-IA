import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Membership } from '../types';

interface AuthContextType {
  user: User | { uid: string; email: string; displayName: string } | null;
  loading: boolean;
  currentOrgId: string | null;
  setCurrentOrgId: (orgId: string | null) => void;
  mockLogin: () => void;
  memberships: Membership[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  currentOrgId: null,
  setCurrentOrgId: () => {},
  mockLogin: () => {},
  memberships: []
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    localStorage.removeItem('mockUser');

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const q = query(collection(db, 'memberships'), where('userId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const userMemberships = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Membership));
          setMemberships(userMemberships);
          
          if (userMemberships.length === 1) {
            setCurrentOrgId(userMemberships[0].organizationId);
          } else {
            setCurrentOrgId(null);
          }
        } catch (e) {
          console.error("Error fetching memberships", e);
          setCurrentOrgId(null);
        }
      } else {
        setCurrentOrgId(null);
        setMemberships([]);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const mockLogin = () => {
    const fakeUser = {
      uid: 'demo-user-123',
      email: 'demo@empresa.com',
      displayName: 'Usuario Demo'
    };
    localStorage.setItem('mockUser', JSON.stringify(fakeUser));
    setUser(fakeUser);
    setCurrentOrgId('org-nova');
  };

  return (
    <AuthContext.Provider value={{ user, loading, currentOrgId, setCurrentOrgId, mockLogin, memberships }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
