import React from 'react';
import { GroupBy, SortBy, AchievementSettings } from './types';
import { Toggle, TextField } from '@steambrew/client';
import { SteamTooltip } from '../SteamComponents';
import { clearAppCache, getCacheDate } from '../utils/cache';

interface HeaderProps {
  settings: AchievementSettings;
  onSettingsChange: (settings: Partial<AchievementSettings>) => void;
  achievementCount: number;
  groupCount: number;
  onExpandAllClick: () => void;
  onCacheCleared?: () => void;
  appId: string;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onSettingsChange,
  achievementCount,
  groupCount,
  onExpandAllClick,
  onCacheCleared,
  appId,
}) => {
  return (
    <div className="achievements-header">
      <div className="left-controls">
        <div>
          <span>{achievementCount} achievements grouped by ({groupCount})</span>
          <select 
            value={settings.groupBy} 
            onChange={(e) => onSettingsChange({ groupBy: e.target.value as GroupBy })}
          >
            {Object.values(GroupBy).map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <span>sorted by</span>
          <select 
            value={settings.sortBy}
            onChange={(e) => onSettingsChange({ sortBy: e.target.value as SortBy })}
          >
            {Object.values(SortBy).map(sortBy => (
              <option key={sortBy} value={sortBy}>{sortBy}</option>
            ))}
          </select>
        </div>
        <div className='toggle-container'>
          <div onClick={() => onSettingsChange({ reverse: !settings.reverse })}>
            <Toggle value={settings.reverse} onChange={(value) => onSettingsChange({ reverse: value })} />
            <span>reverse</span>
          </div>
          <div onClick={() => onSettingsChange({ showPoints: !settings.showPoints })}>
            <Toggle value={settings.showPoints} onChange={(value) => onSettingsChange({ showPoints: value })} />
            <span>show points</span>
          </div>
          <div onClick={() => onSettingsChange({ showUnlocked: !settings.showUnlocked })}>
            <Toggle value={settings.showUnlocked} onChange={(value) => onSettingsChange({ showUnlocked: value })} />
            <span>show unlocked</span>
          </div>
          <div className='search-container'>
            <TextField
              value={settings.searchQuery || ''}
              onChange={(e) => onSettingsChange({ searchQuery: e.target.value })}
              placeholder="Search achievements..."
            />
          </div>
        </div>
      </div>
      <div className="right-controls">
        <button onClick={onExpandAllClick}>
          {settings.expandAll ? 'Collapse All' : 'Expand All'}
        </button>
        <SteamTooltip toolTipContent={
          <span>
            Cache was last updated on<br/>{getCacheDate(appId)?.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true}) ?? 'never'}
            <br/><br/>
            Clears the SteamHunters cache for this game.
            <br/>
            Use this if achievement data seems outdated or incorrect.
          </span>
        } nDelayShowMS={100} direction='top'>
          <button onClick={() => {
            clearAppCache(appId);
            onCacheCleared?.();
          }}>
            Clear cache
          </button>
        </SteamTooltip>
      </div>
    </div>
  );
};
