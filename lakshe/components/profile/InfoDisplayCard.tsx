import { Pencil, Trash } from "lucide-react";
import React from "react";

function InfoDisplayCard() {
  return (
    <div className="bg-card rounded-lg flex flex-col gap-3 p-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Senior Product Designer</p>
          <p className="text-sm text-primary">TechFlow Inc.</p>
          <p className="text-sm text-gray-400">
            Jan 2021 - Present (3 years 2 months)
          </p>
        </div>
        <div className="flex gap-2">
          <Pencil />
          <Trash />
        </div>
      </div>
      <div className="py-2 bg-">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book.Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.{" "}
        </p>
      </div>
    </div>
  );
}

export default InfoDisplayCard;
