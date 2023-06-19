import { CheckboxRefs, FormCategoryEquipmentProps } from "../../app/interface";
import { useRef, useState } from "react";
import { BriefcaseIcon, CakeIcon, HeartIcon } from "@heroicons/react/20/solid";
import {
  BBQIcon,
  BoardGamesIcon,
  FamilyIcon,
  GeneralPartyIcon,
  KaraokeIcon,
  MahjongIcon,
  VideoGamesIcon,
  WeddingIcon,
} from "../../assets/MaterialIcons";
import { FormIconButtonGroup } from "./FormIcons";
import { TvIcon } from "@heroicons/react/24/outline";

export default function RoomFormCategoryEquipment(
  props: FormCategoryEquipmentProps
) {
  const checkboxRefs: CheckboxRefs = {
    General: useRef<HTMLInputElement>(null),
    Dates: useRef<HTMLInputElement>(null),
    Families: useRef<HTMLInputElement>(null),
    Businesses: useRef<HTMLInputElement>(null),
    Birthdays: useRef<HTMLInputElement>(null),
    Weddings: useRef<HTMLInputElement>(null),
    Mahjong: useRef<HTMLInputElement>(null),
    BBQ: useRef<HTMLInputElement>(null),
    Karaoke: useRef<HTMLInputElement>(null),
    VideoGames: useRef<HTMLInputElement>(null),
    BoardGames: useRef<HTMLInputElement>(null),
    TV: useRef<HTMLInputElement>(null),
  };

  return (
    <>
      <FormIconButtonGroup
        question="What is your partyroom designed for?"
        options={[
          {
            id: 1,
            label: "General",
            icon: GeneralPartyIcon,
          },
          {
            id: 4,
            label: "Dates",
            icon: HeartIcon,
          },
          {
            id: 2,
            label: "Families",
            icon: FamilyIcon,
          },
          {
            id: 5,
            label: "Businesses",
            icon: BriefcaseIcon,
          },
          {
            id: 3,
            label: "Birthdays",
            icon: CakeIcon,
          },
          {
            id: 6,
            label: "Weddings",
            icon: WeddingIcon,
          },
        ]}
        selected={props.selectedCategory}
        setSelected={props.setSelectedCategory}
        name={"dont_use" as any}
        register={props.register}
      ></FormIconButtonGroup>
      <FormIconButtonGroup
        question="What are your partyroom's key items?"
        options={[
          {
            id: 1,
            label: "Mahjong",
            icon: MahjongIcon,
          },
          {
            id: 2,
            label: "Video Games",
            icon: VideoGamesIcon,
          },
          {
            id: 3,
            label: "BBQ",
            icon: BBQIcon,
          },
          {
            id: 4,
            label: "Board Games",
            icon: BoardGamesIcon,
          },
          {
            id: 5,
            label: "Karaoke",
            icon: KaraokeIcon,
          },
          {
            id: 6,
            label: "Streaming",
            icon: TvIcon,
          },
        ]}
        selected={props.selectedEquipment}
        setSelected={props.setSelectedEquipment}
        name={"dont_use" as any}
        register={props.register}
      ></FormIconButtonGroup>
    </>
  );
}
