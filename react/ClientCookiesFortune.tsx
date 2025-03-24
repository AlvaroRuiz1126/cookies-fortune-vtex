import React, { useState } from "react";
import { Button, Spinner, Tag } from "vtex.styleguide";
import { getDocuments } from "./service";

function ClientCookieForutne() {
  const [cookie, setCookie] = useState("");
  const [loading, setLoading] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState<string | null>(null);

  const handleCookie = async () => {
    setLoading(true);
    const cookiesList = await getDocuments();
    const randomCookie =
      cookiesList[Math.floor(Math.random() * cookiesList.length)];

    setCookie(randomCookie?.CookieFortune);

    const randomNumber = Math.floor(
      Math.random() * (99999999 - 10000000 + 1) + 10000000
    );
    const numberToStr = randomNumber.toString();
    const formattedNumber = numberToStr.replace(
      /(\d{2})(\d{2})(\d{4})/,
      "$1-$2-$3"
    );

    setLuckyNumber(formattedNumber);
    setLoading(false);
  };

  return (
    <div className="flex flex-column items-center justify-between">
      <div className="mb4">
        <Button onClick={handleCookie}>Get Cookie</Button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-column items-center w-100">
          {cookie.trim().length > 0 && (
            <>
              <p className="mv0">Cookie Message</p>
              <h3 className="mv4">
                <Tag bgColor="#134CD8" color="#FFFFFF" size="large">
                  {cookie}
                </Tag>
              </h3>
            </>
          )}
          {luckyNumber && (
            <>
              <p className="mv0">Lucky number</p>
              <h5 className="mv4">
                <Tag size="large" variation="low">
                  {luckyNumber}
                </Tag>
              </h5>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientCookieForutne;
