import React, { useState } from "react";
import { Button, Input, Modal, Tag } from "vtex.styleguide";
import { createDocument } from "../service";

interface Props {
  openModal: boolean;
  handleModal: (open: boolean) => void;
  showAlertMessage: (
    text: string,
    type: "success" | "error" | "warning"
  ) => void;
}

export const NewCookieModal = ({
  openModal,
  handleModal,
  showAlertMessage,
}: Props) => {
  const [cookieText, setCookieText] = useState("");
  const [error, setError] = useState(false);

  const handleCreate = async () => {
    if (!cookieText.trim().length) {
      setError(true);

      return;
    }

    const createResponse = await createDocument({ CookieFortune: cookieText });

    if (createResponse.DocumentId) {
      showAlertMessage("Cookie created successfully", "success");
    }

    setError(false);
    setCookieText("");
    handleModal(false);
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={() => {
        setError(false);
        handleModal(false);
      }}
      bottomBar={
        <div className="nowrap">
          <span className="mr4">
            <Button
              variation="tertiary"
              onClick={() => {
                setError(false);
                handleModal(false);
              }}
            >
              Cancel
            </Button>
          </span>
          <span>
            <Button
              variation="primary"
              onClick={() => {
                handleCreate();
              }}
            >
              Create
            </Button>
          </span>
        </div>
      }
    >
      <div className="mv7">
        <div>
          <h2>New cookie</h2>
        </div>

        <div className="w100">
          <Input
            placeholder="New Cookie Text"
            size="large"
            value={cookieText}
            onChange={(e: any) => {
              if (e.target.value.trim().length) setError(false);

              setCookieText(e.target.value);
            }}
          />
          {error && (
            <span className="mt4">
              <Tag type="error">Fill cookie text field</Tag>
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};
