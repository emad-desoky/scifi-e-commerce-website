import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFetch(method, url, key, dynamicKey = null) {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await fetch(url);
    return res.json();
  };

  const postData = async (newData) => {
    // Accept dynamic data as `newData`
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData), // Use the passed dynamic data
    });

    if (res.ok) queryClient.invalidateQueries();

    return res.json();
  };

  const putData = async (updateData) => {
    // Accept dynamic data for PUT
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData), // Pass the update data
    });

    if (res.ok) queryClient.invalidateQueries();

    return res.json();
  };

  const deleteData = async (params) => {
    // Convert the `params` object into a query string
    const queryString = new URLSearchParams(params).toString();

    // Use the query string in the fetch URL
    const res = await fetch(`${url}?${queryString}`, {
      method: "DELETE",
    });

    if (res.ok) queryClient.invalidateQueries();

    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    return res.json();
  };

  const query = useQuery({
    queryKey: [key, dynamicKey].filter(Boolean),
    queryFn: fetchData,
    enabled: method === "GET",
  });

  // Define the mutation functions
  const postMutation = useMutation({
    mutationKey: [key],
    mutationFn: postData,
  }); // Pass postData as the mutation function
  const putMutation = useMutation({ mutationKey: [key], mutationFn: putData }); // Pass putData as the mutation function
  const deleteMutation = useMutation({
    mutationKey: [key],
    mutationFn: deleteData,
  }); // Pass deleteData as the mutation function

  // Return the appropriate mutation or query result based on the method
  switch (method) {
    case "GET":
      return query;
    case "POST":
      return postMutation; // Return the mutation object for POST
    case "PUT":
      return putMutation; // Return the mutation object for PUT
    case "DELETE":
      return deleteMutation; // Return the mutation object for DELETE
    default:
      console.log(`${method} is not supported`);
      return null;
  }
}
