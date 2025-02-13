export type ApiName = string;

export interface AchievementData {
  name: string;
  description: string;
  steamPercentage: number;
  points: number;
  localPercentage: number;
  apiName: ApiName;
  strImage: string;
  unlocked: boolean;
}

export interface AchievementGroupData {
  name: string;
  achievementApiNames: ApiName[];
}

/*
Example SteamAchievementData object
{
    "strID": "ACH_ALPS",
    "strName": "Je Suis Perdu!",
    "strDescription": "You've had one heck of a ski holiday.",
    "bAchieved": true,
    "rtUnlocked": 1735426639,
    "strImage": "https://cdn.steamstatic.com/steamcommunity/public/images/apps/427410/e91840161b6907cd389c801e7b83aa2841000f6b.jpg",
    "bHidden": true,
    "flMinProgress": 0,
    "flCurrentProgress": 0,
    "flMaxProgress": 0,
    "flAchieved": 11.300000190734863
}
*/
export interface SteamAchievementData {
  strID: string;
  strName: string;
  strDescription: string;
  bAchieved: boolean;
  rtUnlocked: number;
  strImage: string; // Image URL
  bHidden: boolean;
  flMinProgress: number;
  flCurrentProgress: number;
  flMaxProgress: number;
  flAchieved: number;
}

export enum SortBy {
  SteamHunters = 'SH%',
  Steam = 'Steam%',
  Name = 'Name',
  Default = 'Default'
}

export enum GroupBy {
    DLCAndUpdate = "DLC & update",
    Nothing = "nothing",
    Unlocked = "unlocked"
  }

export interface RequestAchievementGroupsResponse {
  groups: AchievementGroupData[];
}