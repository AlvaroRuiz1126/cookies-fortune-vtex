import React, { useEffect, useMemo, useState } from "react";
import {
  ButtonWithIcon,
  IconDelete,
  IconPlus,
  Layout,
  PageBlock,
  Table,
} from "vtex.styleguide";
import { deleteDocument, getDocuments } from "./service";
import { NewCookieModal } from "./components";

// const tableSchema = {
//   properties: {
//     CookieFortune: {
//       title: "Cookie Text",
//     },
//     accountName: {
//       title: "Author",
//       width: 200,
//     },
//   },
// };

const AdminCookiesFortuneModule = () => {
  const [cookiesFortune, setCookiesFortune] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const tableSchema = useMemo(
    () => ({
      properties: {
        CookieFortune: {
          title: "Cookie Text",
        },
        accountName: {
          title: "Author",
          width: 200,
        },
        id: {
          title: "Actions",
          width: 80,
          cellRenderer: ({ rowData }: { rowData: any }) => (
            <ButtonWithIcon
              icon={<IconDelete />}
              variation="danger"
              onClick={async () => {
                console.log("rowData", rowData);
                await deleteDocument(rowData.id);
              }}
            />
          ),
        },
      },
    }),
    []
  );

  const handleModal = (open: boolean) => {
    setOpenModal(open);
  };

  // const updateCookiesFortuneList = () => {
  //   setCookiesFortune()
  // };

  useEffect(() => {
    getDocuments().then(setCookiesFortune);
  }, []);
  console.log("cookiesFortune", cookiesFortune);

  return (
    <Layout>
      <PageBlock>
        <div className="flex items-center justify-between">
          <h4 className="t-heading-4 mt0 mb0"> List of Cookies Fortune </h4>
          <ButtonWithIcon icon={<IconPlus />} onClick={() => handleModal(true)}>
            New Cookie
          </ButtonWithIcon>
        </div>

        <Table fullWidth items={cookiesFortune} schema={tableSchema} />
      </PageBlock>

      <NewCookieModal openModal={openModal} handleModal={handleModal} />
    </Layout>
  );
};

export default AdminCookiesFortuneModule;
