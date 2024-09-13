import admin from 'firebase-admin';
import serviceAccount from './hotel-booking-app-d2493-firebase-adminsdk-mhicn-89e2581220.json' assert { type: 'json' };

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// The UID of the user you want to give admin access
const uid = 'L6zJemBoeicHInt7AYI5ZwDyhwA3'; // Replace 'USER_UID' with the actual UID

// Grant admin claim to the user
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Admin role granted to user:', uid);
  })
  .catch((error) => {
    console.error('Error granting admin role:', error);
  });
