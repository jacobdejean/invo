/*
  render-web route renders invoice data as a web page
*/

import { useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/render-web";
import { BasicInvoice } from "~/components/templates/basic";

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const params = requestUrl.searchParams;
  console.log("PARAMS", params);
  const session = await getSession(request.headers.get("Cookie"));
  const invoiceDataStr = session.get("invoiceData");
  invariant(invoiceDataStr, "Bad input: missing necessary cookies");
  const invoiceData = JSON.parse(invoiceDataStr);
  return invoiceData;
}

export default function Render() {
  const data = useLoaderData();
  return <BasicInvoice data={data} />;
}
