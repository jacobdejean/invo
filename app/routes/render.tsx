import { useLoaderData } from "react-router";
import { useSearchParams } from "react-router";
import { Invoice } from "~/components/preview";
import type { Route } from "./+types/render";

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const params = requestUrl.searchParams;
  return {
    invoiceName: params.get("invoiceName"),
    invoiceNumber: params.get("invoiceNumber"),
    issueDate: params.get("issueDate"),
    dueDate: params.get("dueDate"),
    logo: params.get("logo"),
    senderIdentity: {
      name: params.get("senderName"),
      email: params.get("senderEmail"),
      phone: params.get("senderPhone"),
      address: params.get("senderAddress"),
      city: params.get("senderCity"),
      state: params.get("senderState"),
      postalCode: params.get("senderPostalCode"),
      country: params.get("senderCountry"),
    },
    customerIdentity: {
      name: params.get("customerName"),
      email: params.get("customerEmail"),
      phone: params.get("customerPhone"),
      address: params.get("customerAddress"),
      city: params.get("customerCity"),
      state: params.get("customerState"),
      postalCode: params.get("customerPostalCode"),
      country: params.get("customerCountry"),
    },
    lineItems: Array.from(
      { length: parseInt(params.get("lineItemCount") || "0", 10) },
      (_, index) => ({
        name: params.get(`lineItem[${index}].name`),
        quantity: parseInt(
          params.get(`lineItem[${index}].quantity`) || "0",
          10
        ),
        unitPrice: parseFloat(
          params.get(`lineItem[${index}].unitPrice`) || "0"
        ),
        note: params.get(`lineItem[${index}].note`),
        productId: params.get(`lineItem[${index}].productId`),
      })
    ),
    memo: params.get("memo"),
    discount: parseFloat(params.get("discount") || "0"),
    shippingFee: parseFloat(params.get("shippingFee") || "0"),
    taxRate: parseFloat(params.get("taxRate") || "0"),
  };
}

export default function Render() {
  const data = useLoaderData();
  return <Invoice data={data} />;
}
