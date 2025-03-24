const customFetch = async (path: string, config?: RequestInit) => {
  return await fetch(`/api/dataentities/CF/${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-valtech-WBVDVZ",
      "X-VTEX-API-AppToken":
        "RWHZZGDCSOHIIHQFRBTJPHQWWEJRFIXNTZXEJOGCHNUQSETYDKWNUMKWKDOUIEYKPXASBWJAATTIEQFTNZRBXDQQTSLDVVVNIOCPMJDJOHQTMGQVQCGLHDEATOENQHFJ",
    },
    ...config,
  });
};

export const getDocuments = async () => {
  try {
    const data = await (
      await customFetch("search?_fields=_all", {
        headers: {
          "REST-Range": "resources=0-99",
        },
      })
    ).json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createDocument = async (data: { CookieFortune: string }) => {
  try {
    const response = await (
      await customFetch("documents", {
        method: "POST",
        body: JSON.stringify(data),
      })
    ).json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const response = await customFetch(`documents/${id}`, { method: "DELETE" });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
