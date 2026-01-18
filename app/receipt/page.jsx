import React, { Suspense } from "react";
import ReceiptPage from "../components/Receipt";

const Page = () => {
  return (
    <Suspense fallback={<div>Some internal Error</div>}>
      <ReceiptPage />
    </Suspense>
  );
};

export default Page;
