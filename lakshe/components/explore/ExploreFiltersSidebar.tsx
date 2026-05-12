"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { MapPin, Briefcase, Building2, Globe, X } from "lucide-react";

const ROLE_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

export interface ExploreFilters {
  location: string;
  roleTypes: string[];
  company: string;
  platform: string;
}

interface ExploreFiltersSidebarProps {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
}

function ExploreFiltersSidebar({ filters, onFiltersChange }: ExploreFiltersSidebarProps) {
  const toggleRoleType = (type: string) => {
    const updated = filters.roleTypes.includes(type)
      ? filters.roleTypes.filter((t) => t !== type)
      : [...filters.roleTypes, type];
    onFiltersChange({ ...filters, roleTypes: updated });
  };

  const clearAll = () => {
    onFiltersChange({
      location: "",
      roleTypes: [],
      company: "",
      platform: "",
    });
  };

  const hasActiveFilters =
    filters.location ||
    filters.roleTypes.length > 0 ||
    filters.company ||
    filters.platform;

  return (
    <Sidebar collapsible="none" className="text-white py-4 pr-4 border-r border-gray-400 min-h-screen">
      <SidebarHeader className="px-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 gap-0">
        {/* Location */}
        <SidebarGroup className="py-4 border-b border-gray-700">
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-2 px-0">
            <MapPin size={13} />
            Location
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="City, state, or remote"
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-gray-500 text-sm"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Company */}
        <SidebarGroup className="py-4 border-b border-gray-700">
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-2 px-0">
            <Building2 size={13} />
            Company
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="Company name"
              value={filters.company}
              onChange={(e) => onFiltersChange({ ...filters, company: e.target.value })}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-gray-500 text-sm"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role Type */}
        <SidebarGroup className="py-4 border-b border-gray-700">
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2 px-0">
            <Briefcase size={13} />
            Role Type
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            {ROLE_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.roleTypes.includes(type)}
                  onChange={() => toggleRoleType(type)}
                  className="accent-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Platform */}
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-2 px-0">
            <Globe size={13} />
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="e.g. LinkedIn, Indeed"
              value={filters.platform}
              onChange={(e) => onFiltersChange({ ...filters, platform: e.target.value })}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-gray-500 text-sm"
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default ExploreFiltersSidebar;
