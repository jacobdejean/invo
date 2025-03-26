import type { Invoice } from "~/store";

export type InvoiceProps = {
  data: Invoice;
};

export function BasicInvoice({ data }: InvoiceProps) {
  if (!data) {
    return (
      <div id="invoice-element">
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          Preview unavailable
        </div>
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
        <div style={{ padding: "2rem", fontSize: "0.875rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            {data?.logo ? (
              <img
                src={data?.logo}
                style={{ maxWidth: "8rem", marginBottom: "0.75rem" }}
              />
            ) : (
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Invoice
              </h2>
            )}
            <p style={{ color: "#4b5563" }}>
              <span style={{ fontWeight: "600" }}>Invoice #:</span>{" "}
              {data.invoiceNumber}
            </p>
            <p style={{ color: "#4b5563" }}>
              <span style={{ fontWeight: "600" }}>Issued:</span>{" "}
              {data.issueDate}
            </p>
            <p style={{ color: "#4b5563" }}>
              <span style={{ fontWeight: "600" }}>Due by:</span> {data.dueDate}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                From:
              </h3>
              <p style={{ color: "#4b5563" }}>
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
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                Bill To:
              </h3>
              <p style={{ color: "#4b5563" }}>
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

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1.5rem",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <th
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "left",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    width: "5rem",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    width: "6rem",
                  }}
                >
                  Unit Price
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    width: "6rem",
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems?.map((lineItem: any, index: number) => (
                <tr key={index}>
                  <td
                    style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                  >
                    {lineItem.name}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #e5e7eb",
                      textAlign: "right",
                    }}
                  >
                    {lineItem.quantity}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #e5e7eb",
                      textAlign: "right",
                    }}
                  >
                    {typeof lineItem.unitPrice === "number"
                      ? lineItem.unitPrice.toFixed(2)
                      : lineItem.unitPrice}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #e5e7eb",
                      textAlign: "right",
                    }}
                  >
                    {(
                      (lineItem.quantity || 0) * (lineItem.unitPrice || 0)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr>
                <td
                  colSpan={3}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  Subtotal
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  {subtotal.toFixed(2)}
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f9fafb" }}>
                <td
                  colSpan={3}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                  }}
                >
                  Tax ({data.taxRate || 0}%)
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                  }}
                >
                  {taxAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  Total
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #e5e7eb",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: "1.5rem" }}>
            {data.memo && (
              <div
                style={{
                  marginBottom: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.125rem",
                }}
              >
                <strong>Notes:</strong>
                <br />
                {data.memo}
              </div>
            )}
            <p
              style={{
                textAlign: "center",
                color: "#4b5563",
                fontSize: "0.875rem",
                marginTop: "1rem",
              }}
            >
              Thank you for your business!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
