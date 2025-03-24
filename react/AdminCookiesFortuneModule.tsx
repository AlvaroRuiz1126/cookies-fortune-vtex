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
import { NewCookieModal, Notification } from "./components";

const AdminCookiesFortuneModule = () => {
  const [cookiesFortune, setCookiesFortune] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [itemFrom, setItemFrom] = useState(1);
  const [itemTo, setItemTo] = useState(5);
  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState<{
    display: boolean;
    text: string;
    type: "success" | "error" | "warning";
  }>({
    display: false,
    type: "success",
    text: "",
  });
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
                const deleteResponse = await deleteDocument(rowData.id);

                if (deleteResponse?.status === 204) {
                  showAlertMessage("Cookie deleted successfully", "success");
                  setCookiesFortune(
                    cookiesFortune.filter((item: any) => item.id !== rowData.id)
                  );
                }
              }}
            />
          ),
        },
      },
    }),
    [cookiesFortune]
  );

  const showAlertMessage = (
    text: string,
    type: "success" | "error" | "warning"
  ) => {
    setShowAlert({ display: true, type, text });
  };

  const handleNextClick = () => {
    const newPage = page + 1;
    const newItemFrom = itemTo + 1;
    const newItemTo = newPage * 5;

    setPage(newPage);
    setItemFrom(newItemFrom);
    setItemTo(newItemTo);
    setTableItems(cookiesFortune.slice(newItemFrom - 1, newItemTo));
  };

  const handlePrevClick = () => {
    if (page === 1) return;

    const newPage = page - 1;
    const newItemFrom = itemFrom - 5;
    const newItemTo = itemFrom - 1;

    setItemFrom(newItemFrom);
    setItemTo(newItemTo);
    setPage(newPage);
    setTableItems(cookiesFortune.slice(newItemFrom - 1, newItemTo));
  };

  const handleModal = (open: boolean) => {
    setOpenModal(open);
  };

  // const updateCookiesFortuneList = () => {
  //   setCookiesFortune()
  // };

  useEffect(() => {
    getDocuments().then((resp) => {
      setCookiesFortune(resp);
      setTableItems(resp.slice(itemFrom - 1, itemTo));
    });
  }, []);

  return (
    <Layout>
      <div className="pt7">
        <PageBlock>
          {showAlert.display && (
            <div className="mv4">
              <Notification
                autoClose={3000}
                type={showAlert.type}
                text={showAlert.text}
                onClose={() =>
                  setShowAlert({ display: false, type: "success", text: "" })
                }
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <h4 className="t-heading-4 mt0 mb0">List of Cookies Fortune</h4>
            <ButtonWithIcon
              icon={<IconPlus />}
              onClick={() => handleModal(true)}
            >
              New Cookie
            </ButtonWithIcon>
          </div>

          <Table
            fullWidth
            items={tableItems}
            schema={tableSchema}
            pagination={{
              onNextClick: handleNextClick,
              onPrevClick: handlePrevClick,
              currentItemFrom: itemFrom,
              currentItemTo: itemTo,
              textShowRows: "Show rows",
              textOf: "of",
              totalItems: cookiesFortune.length,
            }}
          />
        </PageBlock>

        <NewCookieModal
          openModal={openModal}
          handleModal={handleModal}
          showAlertMessage={showAlertMessage}
        />
      </div>
    </Layout>
  );
};

export default AdminCookiesFortuneModule;
