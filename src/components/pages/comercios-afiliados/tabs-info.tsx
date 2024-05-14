/* eslint-disable @next/next/no-img-element */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useBusinessInfoData from "./useBusinessInfoData";
import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Prize } from "@/types/prize";

interface ProductMap {
  [key: string]: Product[]; // O utiliza ProductType en lugar de string si ProductType es un tipo específico
}

interface PrizeMap {
  [key: string]: Product[]; // O utiliza ProductType en lugar de string si ProductType es un tipo específico
}

const TabsInfo = ({ slug }: { slug: string }) => {
  const { isLoaded, business } = useBusinessInfoData(slug);
  const { name, description, logoUrl, coverImageUrl, Product, Prize } = business || {};

  const menu: ProductMap =
    Product?.reduce((acc, item) => {
      const key = `${item.productType?.name}`;

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as ProductMap) ?? {};

  const premios: PrizeMap =
    Prize?.reduce((acc, item) => {
      const key = `${item.points} Pts | ${item.name}`;

      console.log("🚀 >>  Prize?.reduce >>  item.ProductPrize:", item);

      acc[key] = item.ProductPrize?.map((product) => product.product) || ([] as Product[]);

      return acc;
    }, {} as PrizeMap) ?? {};

  if (!isLoaded) {
    return (
      <div className="flex items-start justify-between flex-col">
        <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200 mt-10" />
        <div className=" w-64 h-10 rounded-md animate-pulse bg-slate-200 mt-5" />
        <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
      </div>
    );
  }

  return (
    <main>
      <div className=" flex flex-row items-center my-8">
        <Avatar
          className={` w-20 h-20 border-neutral-300 rounded-full border overflow-hidden ${logoUrl ? "" : " text-3xl"}`}
        >
          <AvatarImage width={80} height={80} alt={name || ""} src={logoUrl ?? ""} className="h-full object-cover" />
          <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
            {(name || "").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h1 className=" ml-2 text-2xl font-medium uppercase">BIENVENIDOS A {name}</h1>
      </div>
      <Tabs defaultValue="main">
        <TabsList>
          <TabsTrigger value="main">Inicio</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="prize">Premios</TabsTrigger>
          <TabsTrigger value="schedule-location">Horario y Ubicacion</TabsTrigger>
          <TabsTrigger value="gallery">Galleria de Fotos</TabsTrigger>
        </TabsList>
        <div className="mx-4">
          <TabsContent value="main">{description}</TabsContent>
          <TabsContent value="menu">
            <Accordion type="single" collapsible className="w-full">
              {Object.keys(menu || {}).map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>{key}</AccordionTrigger>
                  <AccordionContent>
                    {menu?.[key].map((item) => (
                      <>
                        <div className=" flex flex-row gap-2 items-center">
                          <Avatar>
                            <AvatarImage src={item.image ?? ""} alt="-" className=" object-cover" />
                            <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
                              {name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{item.name}</span>
                        </div>
                        <br />
                      </>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="prize">
            <Accordion type="single" collapsible className="w-full">
              {Object.keys(premios || {}).map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>{key}</AccordionTrigger>
                  <AccordionContent>
                    {premios?.[key].length === 0 && <div>No hay productos asociados!</div>}
                    {premios?.[key].map((item) => (
                      <>
                        <div className=" flex flex-row gap-2 items-center">
                          <Avatar>
                            <AvatarImage src={item.image ?? ""} alt="-" className=" object-cover" />
                            <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
                              {name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{item.name}</span>
                        </div>
                        <br />
                      </>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="schedule-location">
            <span className=" font-semibold text-lg">HORARIOS</span>
            <p>Lunes a Domingo 12:00hrs a 00:00hrs</p>
            <br />

            <span className=" font-semibold text-lg">DIRECCIÓN</span>
            <p>{business.address}</p>

            <br />
            <span className=" font-semibold text-lg">SÍGUENOS</span>
            <p>@lacerveceriadebarriomx @lacerveceriadebarriomx @lacerveceriadebarriomx</p>
            <br />
            <span className=" font-semibold text-lg">CONTACTO</span>
            <p>info@lacerveceriadebarrio.mx</p>
          </TabsContent>
          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
                  alt=""
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default TabsInfo;
