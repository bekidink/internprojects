// useAxios.js
import { useState, useCallback } from "react";
import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (config: AxiosRequestConfig<any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance(config);
      setData(response.data);
      return response.data;
    } catch (err:any) {
      setError(err);
      throw err; // re-throw error for further handling if needed
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, fetchData };
};

export default useAxios;
