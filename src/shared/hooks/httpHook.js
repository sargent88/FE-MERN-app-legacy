const { useState, useCallback, useRef, useEffect } = require("react");

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
      activeHttpRequests.current = [];

      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (requestController) => requestController !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(responseData.error);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        if (err.name === "AbortError") {
          console.info("Request was aborted:", url);
          return;
        } else {
          setError(err.message);
          console.error("HTTP Error:", err);
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      console.info("Component is unmounting. Aborting requests...");
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, errorHandler };
};
