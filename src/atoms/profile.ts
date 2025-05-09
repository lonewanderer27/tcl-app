import { Avatar } from "@/types/avatar.types";
import { SystemAvatars } from "../constants";
import { atom } from "recoil";

export const profileImagesAtom = atom<Avatar[]>({
  key: "profileImages",
  default: [
    ...SystemAvatars
  ],
})