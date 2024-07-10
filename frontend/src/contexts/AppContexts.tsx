import React, { useContext, useState } from "react"; // Importing necessary React functions and hooks
import Toast from "../components/Toast"; // Importing Toast component for displaying toast messages
import { useQuery } from "react-query";
import * as apiClient from "../api-client";


type ToastMessage = { // Defining the type for toast messages
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = { // Defining the type for AppContext
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean; 
};

const AppContext = React.createContext<AppContext | undefined>(undefined); // Creating the context with a default undefined value

export const AppContextProvider = ({ // Defining the context provider component
  children, // Accepting children components as props
}: {
  children: React.ReactNode; // Defining the type for children
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined); // State to manage the current toast message

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });


  return (
    <AppContext.Provider // Providing the context to the component tree
      value={{
        showToast: (toastMessage) => { // Function to show a toast message
          setToast(toastMessage); // Setting the toast state
        },
        isLoggedIn: !isError //if the validtoken in apiclient returns true
      }}
    >
      {toast && ( // Conditionally rendering the Toast component if a toast message exists
        <Toast
          message={toast.message} // Passing the toast message
          type={toast.type} // Passing the toast type
          onClose={() => setToast(undefined)} // Clearing the toast message on close
        />
      )}
      {children}
    </AppContext.Provider> 
  );
};

export const useAppContext = () => { // Custom hook to use the AppContext
  const context = useContext(AppContext); // Getting the context value
  return context as AppContext; // Casting and returning the context value
};