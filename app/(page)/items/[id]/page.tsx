import React from "react";
import { DetailContainer } from "@/app/components/detail/DetailContainer";

export const Detail = async ({ params }: { params: { id: string } }) => {
  return <DetailContainer id={params.id} />;
};

export default Detail;
