import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Check if user is logging in for the first time
async function checkFirstTimeLogin(userId) {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // First time login - Create user document
      const userData = {
        userId: userId,
        createdAt: new Date(),
        isFirstLogin: true,
        basicInfo: {
          name: '',
          email: '',
          phoneNumber: '',
        },
        settings: {
          notifications: true,
          theme: 'light',
        },
        lastLogin: new Date(),
      };

      await setDoc(userRef, userData);
      return { isFirstTime: true, userData };
    } else {
      // Existing user - Update last login
      const userData = userDoc.data();
      await setDoc(
        userRef,
        {
          ...userData,
          lastLogin: new Date(),
          isFirstLogin: false,
        },
        { merge: true }
      );
      return { isFirstTime: false, userData };
    }
  } catch (error) {
    console.error('Error checking first time login:', error);
    throw error;
  }
}

export default checkFirstTimeLogin;
