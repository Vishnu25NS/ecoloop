import React, { createContext, useState, useContext, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signInAnonymously, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, onSnapshot, serverTimestamp, addDoc, deleteDoc } from 'firebase/firestore';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState('user');
  const [app, setApp] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const [credits, setCredits] = useState(0);
  const [userPickups, setUserPickups] = useState([]);
  const [classificationHistory, setClassificationHistory] = useState([]);
  const [assignedPickups, setAssignedPickups] = useState([]);
  const [availablePickups, setAvailablePickups] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBGBkMdgCNUw20jvUgW1SryZmqmfheV4oU",
      authDomain: "ihack-612ec.firebaseapp.com",
      projectId: "ihack-612ec",
      storageBucket: "ihack-612ec.firebasestorage.app",
      messagingSenderId: "488351564735",
      appId: "1:488351564735:web:86ccb28a3d2f47a8cdd70a",
      measurementId: "G-414K3BTH0Q"
    };
    
    const appId = "ihack-612ec";

    const firebaseApp = initializeApp(firebaseConfig);
    const firebaseDb = getFirestore(firebaseApp);
    const firebaseAuth = getAuth(firebaseApp);

    setApp(firebaseApp);
    setDb(firebaseDb);
    setAuth(firebaseAuth);

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid);
        const userDocRef = doc(firebaseDb, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser({ ...user, ...userData, roles: userData.roles || ['user'] });
          if (userData.roles && userData.roles.length > 0) {
            setMode(userData.roles.includes('user') ? 'user' : userData.roles[0].toLowerCase());
          }
        } else {
          setUser(user);
          setMode('user');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserId(null);
      }
      setIsAuthReady(true);
    });

    const initAuth = async () => {
      try {
        const initialAuthToken = null;
        if (initialAuthToken) {
          await signInWithCustomToken(firebaseAuth, initialAuthToken);
        } else {
          await signInAnonymously(firebaseAuth);
        }
      } catch (error) {
        console.error("Error during initial auth:", error);
      }
    };
    initAuth();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db || !userId || !isAuthenticated || !isAuthReady) return;
    const appId = "ihack-612ec";

    const creditsRef = doc(db, 'artifacts', appId, 'users', userId, 'profile', 'data');
    const creditsUnsub = onSnapshot(creditsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCredits(data.credits || 0);
      }
    });

    const pickupsRef = collection(db, 'artifacts', appId, 'users', userId, 'pickups');
    const pickupsUnsub = onSnapshot(pickupsRef, (snapshot) => {
      const pickups = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setUserPickups(pickups);
    });

    const historyRef = collection(db, 'artifacts', appId, 'users', userId, 'classificationHistory');
    const historyUnsub = onSnapshot(historyRef, (snapshot) => {
      const history = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setClassificationHistory(history);
    });

    const assignedPickupsRef = collection(db, 'artifacts', appId, 'public', 'data', 'assignedPickups');
    const assignedPickupsQuery = query(assignedPickupsRef, where("collectorId", "==", userId));
    const assignedPickupsUnsub = onSnapshot(assignedPickupsQuery, (snapshot) => {
      const assigned = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setAssignedPickups(assigned);
    });

    const availablePickupsRef = collection(db, 'artifacts', appId, 'public', 'data', 'availablePickups');
    const availablePickupsUnsub = onSnapshot(availablePickupsRef, (snapshot) => {
      const available = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setAvailablePickups(available);
    });

    return () => {
      creditsUnsub();
      pickupsUnsub();
      historyUnsub();
      assignedPickupsUnsub();
      availablePickupsUnsub();
    };
  }, [db, userId, isAuthenticated, isAuthReady]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'artifacts', "ihack-612ec", 'users', user.uid, 'profile', 'data');
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUser({ ...user, ...userData, roles: userData.roles || ['user'] });
        setMode(userData.roles.includes('user') ? 'user' : 'collector');
        setIsAuthenticated(true);
        setUserId(user.uid);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (email, password, name, mobile, location, roles) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'artifacts', "ihack-612ec", 'users', user.uid, 'profile', 'data');
      const userData = {
        name,
        email,
        mobile,
        location,
        roles: roles.length > 0 ? roles : ['user'],
        credits: 0,
        timestamp: serverTimestamp()
      };
      await setDoc(userDocRef, userData);
      setUser({ ...user, ...userData });
      setMode(userData.roles.includes('user') ? 'user' : 'collector');
      setIsAuthenticated(true);
      setUserId(user.uid);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
    setUserId(null);
    setMode('user');
  };

  const switchMode = (newMode) => {
    if (user?.roles?.includes(newMode)) {
      setMode(newMode);
    }
  };

  const addCredits = async (amount) => {
    if (!userId || !db) return;
    const userProfileRef = doc(db, 'artifacts', "ihack-612ec", 'users', userId, 'profile', 'data');
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      const currentCredits = docSnap.data().credits || 0;
      await setDoc(userProfileRef, { credits: currentCredits + amount }, { merge: true });
    }
  };

  const addClassificationToHistory = async (item) => {
    if (!userId || !db) return;
    const historyRef = collection(db, 'artifacts', "ihack-612ec", 'users', userId, 'classificationHistory');
    await addDoc(historyRef, { ...item, timestamp: serverTimestamp() });
    addCredits(25);
  };

  const addPickup = async (pickup) => {
    if (!userId || !db) return;
    const userPickupsRef = collection(db, 'artifacts', "ihack-612ec", 'users', userId, 'pickups');
    await addDoc(userPickupsRef, {
      ...pickup,
      userId: userId,
      userName: user.name,
      timestamp: serverTimestamp()
    });
    const availablePickupsRef = collection(db, 'artifacts', "ihack-612ec", 'public', 'data', 'availablePickups');
    await addDoc(availablePickupsRef, {
      ...pickup,
      userId: userId,
      userName: user.name,
      userPhone: user.mobile,
      pickupLocation: user.location,
      timestamp: serverTimestamp(),
      coordinates: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 }
    });
    addCredits(50);
  };
  
  const scheduleNewPickup = async (pickup) => {
    if (!userId || !db) return;
    const availablePickupsRef = collection(db, 'artifacts', "ihack-612ec", 'public', 'data', 'availablePickups');
    const assignedPickupsRef = collection(db, 'artifacts', "ihack-612ec", 'public', 'data', 'assignedPickups');
    
    const assignedPickupData = {
      ...pickup,
      collectorId: userId,
      collectorName: user.name,
      assignedAt: serverTimestamp(),
    };
    
    await addDoc(assignedPickupsRef, assignedPickupData);
    await deleteDoc(doc(availablePickupsRef, pickup.id));
    
    // Add pickup to user's personal pickups list
    const userPickupsRef = collection(db, 'artifacts', "ihack-612ec", 'users', pickup.userId, 'pickups');
    await addDoc(userPickupsRef, {
      ...pickup,
      collectorId: userId,
      collectorName: user.name,
      assignedAt: serverTimestamp(),
      status: 'In Progress'
    });
  };

  const updatePickupStatus = async (pickupId, newStatus, notes = '') => {
    if (!db || !userId) return;
    const pickupRef = doc(db, 'artifacts', "ihack-612ec", 'public', 'data', 'assignedPickups', pickupId);
    await setDoc(pickupRef, { status: newStatus, notes }, { merge: true });
  };
  
  const contextValue = {
    user,
    isAuthenticated,
    mode,
    credits,
    userPickups,
    classificationHistory,
    assignedPickups,
    availablePickups,
    login,
    signup,
    logout,
    switchMode,
    addCredits,
    addClassificationToHistory,
    addPickup,
    scheduleNewPickup,
    updatePickupStatus,
    isAuthReady,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
