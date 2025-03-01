import { Button } from "@radix-ui/themes";
import { useState } from "react";
import useInvoiceStore from "~/store";

export default function Preview() {
  return (
    <div className="grow min-h-full relative overflow-hidden flex items-start justify-center p-4">
      <div className="relative w-full max-w-[595px] overflow-hidden">
        <Invoice />
      </div>
    </div>
  );
}

function Invoice() {
  const invoice = useInvoiceStore();

  if (!invoice) {
    return (
      <div
        id="invoice-element"
        className="bg-white w-full aspect-[1/1.414] shadow-lg border border-neutral-300 flex items-center justify-center"
      >
        <div className="text-center text-gray-500">Preview unavailable</div>
      </div>
    );
  }

  // Calculate subtotal
  const subtotal =
    invoice?.lineItems?.reduce(
      (total, item) => total + (item.quantity || 0) * (item.unitPrice || 0),
      0
    ) || 0;

  // Calculate tax
  const taxRate = parseFloat(invoice.taxRate || "0") / 100;
  const taxAmount = subtotal * taxRate;

  // Calculate total
  const total = subtotal + taxAmount;

  return (
    <>
      <div
        id="invoice-element"
        className="bg-white w-full aspect-[1/1.414] shadow-lg border border-neutral-300 overflow-auto scale-100 origin-top"
      >
        <div className="p-8 text-sm">
          <div className="mb-6">
            {invoice?.logo ? (
              <img src={invoice?.logo} className="max-w-32 mb-3" />
            ) : (
              <h2 className="text-2xl font-bold mb-2">Invoice</h2>
            )}
            <p className="text-gray-600">
              <span className="font-semibold">Invoice #:</span>{" "}
              {invoice.invoiceNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Issued:</span> {invoice.issueDate}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Due by:</span> {invoice.dueDate}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div>
              <h3 className="text-base font-semibold mb-1">From:</h3>
              <p className="text-gray-600">
                <strong>
                  {invoice.senderIdentity?.name ??
                    invoice.senderIdentity?.email}
                </strong>
                <br />
                {invoice.senderIdentity?.phone && (
                  <>
                    {invoice.senderIdentity.phone}
                    <br />
                  </>
                )}
                {invoice.senderIdentity?.address && (
                  <>
                    {invoice.senderIdentity.address}
                    <br />
                  </>
                )}
                {invoice.senderIdentity?.city && invoice.senderIdentity.city}
                {invoice.senderIdentity?.state &&
                  (invoice.senderIdentity?.city ? ", " : "") +
                    invoice.senderIdentity.state}
                {invoice.senderIdentity?.postalCode &&
                  " " + invoice.senderIdentity.postalCode}
                {invoice.senderIdentity?.country && (
                  <>
                    <br />
                    {invoice.senderIdentity.country}
                  </>
                )}
                {invoice.senderIdentity?.email && (
                  <>
                    <br />
                    {invoice.senderIdentity.email}
                  </>
                )}
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">Bill To:</h3>
              <p className="text-gray-600">
                <strong>{invoice.customerIdentity?.name}</strong>
                <br />
                {invoice.senderIdentity?.phone && (
                  <>
                    {invoice.senderIdentity.phone}
                    <br />
                  </>
                )}
                {invoice.customerIdentity?.address && (
                  <>
                    {invoice.customerIdentity.address}
                    <br />
                  </>
                )}
                {invoice.customerIdentity?.city &&
                  invoice.customerIdentity.city}
                {invoice.customerIdentity?.state &&
                  (invoice.customerIdentity?.city ? ", " : "") +
                    invoice.customerIdentity.state}
                {invoice.customerIdentity?.postalCode &&
                  " " + invoice.customerIdentity.postalCode}
                {invoice.customerIdentity?.country && (
                  <>
                    <br />
                    {invoice.customerIdentity.country}
                  </>
                )}
                {invoice.customerIdentity?.email && (
                  <>
                    <br />
                    {invoice.customerIdentity.email}
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
              {invoice.lineItems?.map((lineItem, index) => (
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
                  Tax ({invoice.taxRate || 0}%)
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
            {invoice.memo && (
              <div className="mb-4 p-3 bg-gray-50 rounded-sm">
                <strong>Notes:</strong>
                <br />
                {invoice.memo}
              </div>
            )}
            <p className="text-center text-gray-600 text-sm mt-4">
              Thank you for your business!
            </p>
          </div>
        </div>
      </div>
      <Button size={"3"} className="!mt-6 !w-full">
        Download invoice
      </Button>
    </>
  );
}
