import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContexts";

const SignOutButton = () => {
  const queryClient = useQueryClient(); //helps up work with anything round the application
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, { //calling the signout in apiclient
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); //invalidating the token will result in singout (validateToken is from AppContext)
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;