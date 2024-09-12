import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminRole } from "../firebaseauth"; // Import role checking function

const PrivateAdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(getAuth());
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (user) {
        const admin = await checkAdminRole(user.uid);
        setIsAdmin(admin);
      }
      setCheckingAdmin(false);
    };

    if (user) {
      checkRole();
    } else {
      setCheckingAdmin(false);
    }
  }, [user]);

  if (loading || checkingAdmin) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateAdminRoute;
