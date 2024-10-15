import { b64DecodeUnicode } from "@/lib/b64";

export function decodeTeamName(teamId: string) {
  try {
    return b64DecodeUnicode(decodeURIComponent(teamId));
  } catch (e) {
    console.error(e);
    return "Invalid Team Name";
  }
}
