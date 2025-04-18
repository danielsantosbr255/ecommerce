import { toast } from "react-toastify";

interface UseErrorHandler {
  handleError: (error: unknown, messageOverride?: string) => void;
}

const useErrorHandler = (): UseErrorHandler => {
  const handleError = (error: unknown, messageOverride?: string): void => {
    // console.error("Erro capturado:", error);
    console.log(error);

    let errorMessage = "Ocorreu um erro inesperado.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    toast.error(messageOverride || errorMessage || "Ocorreu um erro.");
  };

  return { handleError };
};

export default useErrorHandler;
