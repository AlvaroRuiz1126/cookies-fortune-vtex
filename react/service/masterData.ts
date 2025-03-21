const customFetch = async (path: string, config?: RequestInit) => {
  return await fetch(`/api/dataentities/CF/${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-valtech-WBVDVZ",
      "X-VTEX-API-AppToken":
        "RWHZZGDCSOHIIHQFRBTJPHQWWEJRFIXNTZXEJOGCHNUQSETYDKWNUMKWKDOUIEYKPXASBWJAATTIEQFTNZRBXDQQTSLDVVVNIOCPMJDJOHQTMGQVQCGLHDEATOENQHFJ",
    },
    // cache: 'no-cache',
    ...config,
  });
};

export const getDocuments = async () => {
  const data = await (
    await customFetch("search?_fields=_all", {
      headers: {
        "REST-Range": "resources=0-99",
      },
    })
  ).json();

  return data;
};

export const createDocument = async (data: { CookieFortune: string }) => {
  const response = await (
    await customFetch("documents", {
      method: "POST",
      body: JSON.stringify(data),
    })
  ).json();
  console.log(response);

  return response;
};

export const deleteDocument = async (id: string) => {
  const response = await customFetch(`documents/${id}`, { method: "DELETE" });

  return response;
};
