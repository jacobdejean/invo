/*
  render-pdf has an action setup to recieve invoice form data, render with cloudflare, then stream pdf back via the form navigation
*/

import type { Route } from "./+types/render-pdf";
import invariant from "tiny-invariant";

export async function action({ request, params }: Route.ActionArgs) {
  const invoiceFormData = await request.formData();
  const invoiceData = fromFormData(invoiceFormData);
  return createPdfResponse(invoiceData);
}

async function createPdfResponse(invoiceData: any) {
  try {
    const cloudflareAccountId =
      process.env.CLOUDFLARE_ACCOUNT_ID ?? "env missing variable";
    const cloudflareApiToken =
      process.env.CLOUDFLARE_API_TOKEN ?? "env missing variable";
    const domain = process.env.PRODUCTION_HOSTNAME ?? "env missing variable";
    const renderUrl = new URL(`https://${domain}/render-web`);

    console.log("Generating PDF", renderUrl.toString(), invoiceData);

    const result = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/browser-rendering/pdf`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cloudflareApiToken}`,
        },
        body: JSON.stringify({
          url: renderUrl.toString(),
          cookies: [
            {
              name: "invoiceData",
              value: invoiceData.toString(),
              domain,
              path: "/",
              expires: Date.now() / 1000 + 3600, // Expires in 1 hour
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
            },
          ],
          viewport: {
            // A4
            width: 794,
            height: 1123,
          },
        }),
      }
    );

    if (!result.ok) {
      const errorText = await result.text();
      return new Response(errorText, {
        status: result.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const contentType = result.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/pdf")) {
      const errorBody = JSON.stringify({
        error: "Expected PDF but received different content type",
      });
      return new Response(errorBody, {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const pdfBlob = await result.blob();

    return new Response(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${invoiceData?.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to render PDF" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

function fromFormData(formData: FormData) {
  return {
    invoiceName: formData.get("invoiceName"),
    invoiceNumber: formData.get("invoiceNumber"),
    issueDate: formData.get("issueDate"),
    dueDate: formData.get("dueDate"),
    logo: formData.get("logo"),
    senderIdentity: {
      name: formData.get("senderName"),
      email: formData.get("senderEmail"),
      phone: formData.get("senderPhone"),
      address: formData.get("senderAddress"),
      city: formData.get("senderCity"),
      state: formData.get("senderState"),
      postalCode: formData.get("senderPostalCode"),
      country: formData.get("senderCountry"),
    },
    customerIdentity: {
      name: formData.get("customerName"),
      email: formData.get("customerEmail"),
      phone: formData.get("customerPhone"),
      address: formData.get("customerAddress"),
      city: formData.get("customerCity"),
      state: formData.get("customerState"),
      postalCode: formData.get("customerPostalCode"),
      country: formData.get("customerCountry"),
    },
    lineItems: Array.from(
      {
        length: parseInt(formData.get("lineItemCount")?.toString() || "0", 10),
      },
      (_, index) => ({
        name: formData.get(`lineItem[${index}].name`),
        quantity: parseInt(
          formData.get(`lineItem[${index}].quantity`)?.toString() || "0",
          10
        ),
        unitPrice: parseFloat(
          formData.get(`lineItem[${index}].unitPrice`)?.toString() || "0"
        ),
        note: formData.get(`lineItem[${index}].note`),
        productId: formData.get(`lineItem[${index}].productId`),
      })
    ),
    memo: formData.get("memo"),
    discount: parseFloat(formData.get("discount")?.toString() || "0"),
    shippingFee: parseFloat(formData.get("shippingFee")?.toString() || "0"),
    taxRate: parseFloat(formData.get("taxRate")?.toString() || "0"),
  };
}
