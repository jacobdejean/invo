import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { useFetcher } from "react-router";
import useInvoiceStore, { type Invoice } from "~/store";

export type PreviewProps = {};

export default function Preview({}: PreviewProps) {
  const invoice = useInvoiceStore();
  const renderPdfFetcher = useFetcher({ key: "render_pdf" });
  return (
    <div className="grow min-h-full relative overflow-hidden flex items-start justify-center p-4">
      <div className="relative w-full max-w-[595px] overflow-hidden">
        <div>
          <div className="bg-white w-full aspect-[1/1.414] shadow-lg border border-neutral-300 overflow-auto scale-100 origin-top">
            <Invoice data={invoice} />
          </div>
          <Button
            size={"3"}
            className="!mt-6 !w-full"
            onClick={() => {
              const invoiceSettings =
                document.getElementById("invoice-settings");
              const data = new FormData(invoiceSettings as HTMLFormElement);
              console.log(data);
              renderPdfFetcher.submit(
                {
                  type: "render_pdf",
                  settings: JSON.stringify(Object.fromEntries(data)),
                },
                {
                  method: "post",
                }
              );
            }}
          >
            Download invoice
          </Button>
        </div>
      </div>
    </div>
  );
}

export type InvoiceProps = {
  data: Invoice;
};

export function Invoice({ data }: InvoiceProps) {
  if (!data) {
    return (
      <div id="invoice-element">
        <div className="text-center text-gray-500">Preview unavailable</div>
      </div>
    );
  }

  const subtotal =
    data?.lineItems?.reduce(
      (total, item) => total + (item.quantity || 0) * (item.unitPrice || 0),
      0
    ) || 0;

  const taxRate = parseFloat(String(data.taxRate || "0")) / 100;
  const taxAmount = subtotal * taxRate;

  const total = subtotal + taxAmount;

  return (
    <>
      <div id="invoice-element">
        <div className="p-8 text-sm">
          <div className="mb-6">
            {data?.logo ? (
              <img src={data?.logo} className="max-w-32 mb-3" />
            ) : (
              <h2 className="text-2xl font-bold mb-2">Invoice</h2>
            )}
            <p className="text-gray-600">
              <span className="font-semibold">Invoice #:</span>{" "}
              {data.invoiceNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Issued:</span> {data.issueDate}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Due by:</span> {data.dueDate}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div>
              <h3 className="text-base font-semibold mb-1">From:</h3>
              <p className="text-gray-600">
                <strong>
                  {data.senderIdentity?.name ?? data.senderIdentity?.email}
                </strong>
                <br />
                {data.senderIdentity?.phone && (
                  <>
                    {data.senderIdentity.phone}
                    <br />
                  </>
                )}
                {data.senderIdentity?.address && (
                  <>
                    {data.senderIdentity.address}
                    <br />
                  </>
                )}
                {data.senderIdentity?.city && data.senderIdentity.city}
                {data.senderIdentity?.state &&
                  (data.senderIdentity?.city ? ", " : "") +
                    data.senderIdentity.state}
                {data.senderIdentity?.postalCode &&
                  " " + data.senderIdentity.postalCode}
                {data.senderIdentity?.country && (
                  <>
                    <br />
                    {data.senderIdentity.country}
                  </>
                )}
                {data.senderIdentity?.email && (
                  <>
                    <br />
                    {data.senderIdentity.email}
                  </>
                )}
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">Bill To:</h3>
              <p className="text-gray-600">
                <strong>{data.customerIdentity?.name}</strong>
                <br />
                {data.customerIdentity?.phone && (
                  <>
                    {data.customerIdentity.phone}
                    <br />
                  </>
                )}
                {data.customerIdentity?.address && (
                  <>
                    {data.customerIdentity.address}
                    <br />
                  </>
                )}
                {data.customerIdentity?.city && data.customerIdentity.city}
                {data.customerIdentity?.state &&
                  (data.customerIdentity?.city ? ", " : "") +
                    data.customerIdentity.state}
                {data.customerIdentity?.postalCode &&
                  " " + data.customerIdentity.postalCode}
                {data.customerIdentity?.country && (
                  <>
                    <br />
                    {data.customerIdentity.country}
                  </>
                )}
                {data.customerIdentity?.email && (
                  <>
                    <br />
                    {data.customerIdentity.email}
                  </>
                )}
              </p>
            </div>
          </div>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-200 text-left">
                  Description
                </th>
                <th className="p-2 border border-gray-200 text-right w-20">
                  Quantity
                </th>
                <th className="p-2 border border-gray-200 text-right w-24">
                  Unit Price
                </th>
                <th className="p-2 border border-gray-200 text-right w-24">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems?.map((lineItem: any, index: number) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-200">
                    {lineItem.name}
                  </td>
                  <td className="p-2 border border-gray-200 text-right">
                    {lineItem.quantity}
                  </td>
                  <td className="p-2 border border-gray-200 text-right">
                    {typeof lineItem.unitPrice === "number"
                      ? lineItem.unitPrice.toFixed(2)
                      : lineItem.unitPrice}
                  </td>
                  <td className="p-2 border border-gray-200 text-right">
                    {(
                      (lineItem.quantity || 0) * (lineItem.unitPrice || 0)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr>
                <td
                  colSpan={3}
                  className="p-2 border border-gray-200 text-right font-semibold"
                >
                  Subtotal
                </td>
                <td className="p-2 border border-gray-200 text-right font-semibold">
                  {subtotal.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td
                  colSpan={3}
                  className="p-2 border border-gray-200 text-right"
                >
                  Tax ({data.taxRate || 0}%)
                </td>
                <td className="p-2 border border-gray-200 text-right">
                  {taxAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  className="p-2 border border-gray-200 text-right font-bold"
                >
                  Total
                </td>
                <td className="p-2 border border-gray-200 text-right font-bold">
                  {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6">
            {data.memo && (
              <div className="mb-4 p-3 bg-gray-50 rounded-sm">
                <strong>Notes:</strong>
                <br />
                {data.memo}
              </div>
            )}
            <p className="text-center text-gray-600 text-sm mt-4">
              Thank you for your business!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
