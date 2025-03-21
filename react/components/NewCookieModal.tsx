import React, { useState } from "react";
import { Button, Input, Modal } from "vtex.styleguide";
import { createDocument } from "../service";

interface Props {
  openModal: boolean;
  handleModal: (open: boolean) => void;
}

export const NewCookieModal = ({ openModal, handleModal }: Props) => {
  const [cookieText, setCookieText] = useState("");

  const handleCreate = async () => {
    if (!cookieText.trim().length) return;

    await createDocument({ CookieFortune: cookieText });
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={() => handleModal(false)}
      bottomBar={
        <div className="nowrap">
          <span className="mr4">
            <Button variation="tertiary" onClick={() => handleModal(false)}>
              Cancel
            </Button>
          </span>
          <span>
            <Button
              variation="primary"
              onClick={() => {
                handleCreate();
                handleModal(false);
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
            onChange={(e: any) => setCookieText(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
