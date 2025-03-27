import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { useFetcher } from "react-router";
import useInvoiceStore, { type Invoice } from "~/store";
import { BasicInvoice } from "./templates/basic";
import posthog from "posthog-js";

export type PreviewProps = {};

export default function Preview({}: PreviewProps) {
  const invoice = useInvoiceStore();
  return (
    <div className="grow min-h-full relative overflow-hidden flex items-start justify-center p-4">
      <div className="relative w-full max-w-[595px] overflow-hidden">
        <div>
          <div className="bg-white w-full aspect-[1/1.414] shadow-lg border border-neutral-300 overflow-auto scale-100 origin-top">
            <BasicInvoice data={invoice} />
          </div>
          <Button size={"4"} className="!mt-6 !w-full" type="submit">
            Download invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
