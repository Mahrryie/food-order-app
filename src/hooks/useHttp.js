import { useCallback, useEffect, useState } from "react";

const GENERIC_ERROR_MSG = "Something went wrong";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message ?? GENERIC_ERROR_MSG);
  }

  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);

      try {
        const responseData = await sendHttpRequest(url, {
          ...config,
          body: data,
        });
        setData(responseData);
      } catch (error) {
        setError(error.message ?? GENERIC_ERROR_MSG);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config.method === "GET" || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, error, isLoading, sendRequest, clearData };
}
