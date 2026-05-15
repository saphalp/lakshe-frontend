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

function ExploreFiltersSidebar({
  filters,
  onFiltersChange,
}: ExploreFiltersSidebarProps) {
  const toggleRoleType = (type: string) => {
    const updated = filters.roleTypes.includes(type)
      ? filters.roleTypes.filter((t) => t !== type)
      : [...filters.roleTypes, type];
    onFiltersChange({ ...filters, roleTypes: updated });
  };

  const clearAll = () => {
    onFiltersChange({ location: "", roleTypes: [], company: "", platform: "" });
  };

  const hasActiveFilters =
    filters.location ||
    filters.roleTypes.length > 0 ||
    filters.company ||
    filters.platform;

  return (
    <Sidebar
      collapsible="none"
      className="py-4 pr-4 border-r border-border min-h-screen bg-background"
    >
      <SidebarHeader className="px-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 gap-0">
        <SidebarGroup className="py-4 border-b border-border">
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-2 px-0">
            <MapPin size={12} />
            Location
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="City, state, or remote"
              value={filters.location}
              onChange={(e) =>
                onFiltersChange({ ...filters, location: e.target.value })
              }
              className="bg-transparent border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 text-sm h-9"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="py-4 border-b border-border">
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-2 px-0">
            <Building2 size={12} />
            Company
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="Company name"
              value={filters.company}
              onChange={(e) =>
                onFiltersChange({ ...filters, company: e.target.value })
              }
              className="bg-transparent border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 text-sm h-9"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="py-4 border-b border-border">
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider mb-3 flex items-center gap-2 px-0">
            <Briefcase size={12} />
            Role Type
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2.5">
            {ROLE_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.roleTypes.includes(type)}
                  onChange={() => toggleRoleType(type)}
                  className="accent-primary w-4 h-4 cursor-pointer rounded"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-2 px-0">
            <Globe size={12} />
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="e.g. LinkedIn, Indeed"
              value={filters.platform}
              onChange={(e) =>
                onFiltersChange({ ...filters, platform: e.target.value })
              }
              className="bg-transparent border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 text-sm h-9"
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default ExploreFiltersSidebar;
