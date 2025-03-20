import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Section,
  Slider,
  Tabs,
  Text,
  Heading,
  TextArea,
} from "@radix-ui/themes";
import WebNav from "~/components/web-nav";
import WebFooter from "~/components/web-footer";
import {
  FileText,
  Percent,
  Image,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  Home,
  Truck,
  ShoppingCart,
  Package,
  Notebook,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import { Form } from "radix-ui";
import Preview from "~/components/preview";
import useInvoiceStore from "~/store";
import SettingsInput from "~/components/settings-text-field";
import SettingsArea from "~/components/settings-text-area";
import { useFetcher } from "react-router";
import invariant from "tiny-invariant";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Invoice - invo.dev" },
    { name: "description", content: "Welcome to Invo.dev!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const requestUrl = new URL(request.url);
  const actionData = await request.formData();
  const actionType = actionData.get("type");
  const actionSettings = actionData.get("settings");
  if (actionType === "render_pdf") {
    const cloudflareAccountId = "";
    const cloudflareApiToken = "";
    const renderUrl = new URL(`${requestUrl.host}/render`);
    invariant(actionSettings, "Bad input");
    const inputSettings = JSON.parse(actionSettings.toString());
    Object.entries(inputSettings).forEach(([key, value]) =>
      renderUrl.searchParams.set(key, String(value))
    );
    console.log("Rendering", renderUrl.toString(), inputSettings);
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
          viewport: {
            width: 794,
            height: 1123,
          },
        }),
      }
    );
  }
}

export default function New() {
  const invoice = useInvoiceStore();

  return (
    <div className="page-wrapper">
      <Section className="max-sm:!p-0">
        <Container>
          <WebNav />
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container>
          <h1 className="text-6xl leading-none font-medium mb-4 max-sm:text-4xl">
            New invoice
          </h1>
          <Text mb={"4"}>
            Enter your business details, customer information, and line items to
            create an invoice. Once complete, you can preview and download as a
            PDF.
          </Text>
        </Container>
      </Section>
      <Section className="!pt-0 max-sm:!pb-0">
        <Container>
          <div className="flex !gap-6 max-lg:flex-col max-lg:items-center">
            <Form.Form
              key={invoice?.invoiceName}
              method="post"
              id="invoice-settings"
              className="flex pt-4 pb-4 items-stretch flex-none w-full max-w-[480px] relative"
            >
              <Flex direction="column" gap="0" className=" max-h-full">
                {/* Header */}
                <Flex direction="column" gap="4">
                  <SettingsInput
                    label={"Invoice Name"}
                    path={"invoiceName"}
                    defaultValue={invoice?.invoiceName}
                    icon={<FileText size={20} />}
                  />
                  <SettingsInput
                    label={"Invoice #"}
                    path={"invoiceNumber"}
                    defaultValue={invoice?.invoiceNumber}
                    icon={<FileText size={20} />}
                  />

                  {/* Invoice Details */}
                  <Grid columns="2" gap="4">
                    <SettingsInput
                      label={"Issue Date"}
                      path={"issueDate"}
                      defaultValue={invoice?.issueDate}
                      type="date"
                      icon={<Calendar size={20} />}
                    />
                    <SettingsInput
                      label={"Due Date"}
                      path={"dueDate"}
                      defaultValue={invoice?.dueDate}
                      type="date"
                      icon={<Calendar size={20} />}
                    />
                  </Grid>
                  <SettingsInput
                    label={"Logo"}
                    path={"logo"}
                    defaultValue={invoice?.logo}
                    type="url"
                    icon={<Image size={20} />}
                  />
                </Flex>

                {/* Billing Information */}
                <Grid columns="2" gap="6">
                  {/* Sender */}
                  <Flex direction="column" gap="3">
                    <Heading size="4" className="text-[#3D57C8] !mt-6">
                      Sender
                    </Heading>
                    <SettingsInput
                      label={"Name"}
                      path={"senderIdentity.name"}
                      defaultValue={invoice?.senderIdentity?.name}
                      icon={<User size={20} />}
                    />
                    <SettingsInput
                      label={"Email"}
                      path={"senderIdentity.email"}
                      defaultValue={invoice?.senderIdentity?.email}
                      icon={<Mail size={20} />}
                    />
                    <SettingsInput
                      label={"Phone"}
                      path={"senderIdentity.phone"}
                      defaultValue={invoice?.senderIdentity?.phone}
                      icon={<Phone size={20} />}
                    />
                    <SettingsInput
                      label={"Address"}
                      path={"senderIdentity.address"}
                      defaultValue={invoice?.senderIdentity?.address}
                      icon={<Home size={20} />}
                    />
                    <SettingsInput
                      label={"City"}
                      path={"senderIdentity.city"}
                      defaultValue={invoice?.senderIdentity?.city}
                      icon={<Building2 size={20} />}
                    />
                    <SettingsInput
                      label={"State"}
                      path={"senderIdentity.state"}
                      defaultValue={invoice?.senderIdentity?.state}
                      icon={<MapPin size={20} />}
                    />
                    <SettingsInput
                      label={"Postal Code"}
                      path={"senderIdentity.postalCode"}
                      defaultValue={invoice?.senderIdentity?.postalCode}
                      icon={<MapPin size={20} />}
                    />
                    <SettingsInput
                      label={"Country"}
                      path={"senderIdentity.country"}
                      defaultValue={invoice?.senderIdentity?.country}
                      icon={<MapPin size={20} />}
                    />
                  </Flex>

                  {/* Receiver */}
                  <Flex direction="column" gap="3">
                    <Heading size="4" className="text-[#3D57C8] !mt-6">
                      Receiver
                    </Heading>
                    <SettingsInput
                      label={"Name"}
                      path={"customerIdentity.name"}
                      defaultValue={invoice?.customerIdentity?.name}
                      icon={<User size={20} />}
                    />
                    <SettingsInput
                      label={"Email"}
                      path={"customerIdentity.email"}
                      defaultValue={invoice?.customerIdentity?.email}
                      icon={<Mail size={20} />}
                    />
                    <SettingsInput
                      label={"Phone"}
                      path={"customerIdentity.phone"}
                      defaultValue={invoice?.customerIdentity?.phone}
                      icon={<Phone size={20} />}
                    />
                    <SettingsInput
                      label={"Address"}
                      path={"customerIdentity.address"}
                      defaultValue={invoice?.customerIdentity?.address}
                      icon={<Home size={20} />}
                    />
                    <SettingsInput
                      label={"City"}
                      path={"customerIdentity.city"}
                      defaultValue={invoice?.customerIdentity?.city}
                      icon={<Building2 size={20} />}
                    />
                    <SettingsInput
                      label={"State"}
                      path={"customerIdentity.state"}
                      defaultValue={invoice?.customerIdentity?.state}
                      icon={<MapPin size={20} />}
                    />
                    <SettingsInput
                      label={"Postal Code"}
                      path={"customerIdentity.postalCode"}
                      defaultValue={invoice?.customerIdentity?.postalCode}
                      icon={<MapPin size={20} />}
                    />
                    <SettingsInput
                      label={"Country"}
                      path={"customerIdentity.country"}
                      defaultValue={invoice?.customerIdentity?.country}
                      icon={<MapPin size={20} />}
                    />
                  </Flex>
                </Grid>

                {/* Line Items */}
                <Flex direction="column" gap="4" className="static">
                  <Heading size="4" className="text-[#3D57C8] !mt-6">
                    Line Items
                  </Heading>
                  <Flex direction={"column"} gap={"4"}>
                    {invoice.lineItems?.map((item, i) => (
                      <LineItem key={i} item={item} index={i} />
                    ))}
                  </Flex>
                  <Button
                    variant="soft"
                    size={"3"}
                    type="button"
                    onClick={() => {
                      invoice.addLineItem();
                    }}
                  >
                    Add Item
                  </Button>
                  <Grid columns="2" gap="6">
                    <SettingsArea
                      label={"Memo"}
                      path={"memo"}
                      defaultValue={invoice?.memo}
                      icon={<Notebook size={20} />}
                    />
                    <Flex direction="column" gap="3">
                      <SettingsInput
                        label={"Discount %"}
                        path={"discount"}
                        defaultValue={invoice?.discount?.toString()}
                        icon={<Percent size={20} />}
                      />
                      <SettingsInput
                        label={"Shipping Fee"}
                        path={"shippingFee"}
                        defaultValue={invoice?.shippingFee?.toString()}
                        icon={<Truck size={20} />}
                      />
                      <SettingsInput
                        label={"Tax Rate %"}
                        path={"taxRate"}
                        defaultValue={invoice?.taxRate?.toString()}
                        icon={<Percent size={20} />}
                      />
                    </Flex>
                  </Grid>
                </Flex>
              </Flex>
            </Form.Form>
            <Preview />
          </div>
        </Container>
      </Section>
    </div>
  );
}

export type LineItemProps = {
  item: LineItem;
  index: number;
};

export function LineItem({ item, index }: LineItemProps) {
  return (
    <Flex direction={"column"} gap={"4"}>
      <Grid columns="3" gap="4">
        <SettingsInput
          label={"Item Name"}
          path={`lineItems[${index}].name`}
          defaultValue={item.name}
          icon={<ShoppingCart size={20} />}
        />
        <SettingsInput
          label={"Quantity"}
          path={`lineItems[${index}].quantity`}
          defaultValue={item.quantity?.toString()}
          type="number"
          icon={<Package size={20} />}
        />
        <SettingsInput
          label={"Price"}
          path={`lineItems[${index}].unitPrice`}
          defaultValue={item.unitPrice?.toString()}
          type="number"
          icon={<Receipt size={20} />}
        />
      </Grid>
    </Flex>
  );
}
