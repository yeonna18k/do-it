import React from "react";
import { DetailContainer } from "@/app/components/detail/DetailContainer";

export default function Detail({ params }: { params: { id: string } }) {
  return <DetailContainer id={params.id} />;
}
