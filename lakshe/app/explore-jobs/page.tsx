"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ExploreFiltersSidebar, {
  ExploreFilters,
} from "@/components/explore/ExploreFiltersSidebar";
import ExploreJobCard, { Job } from "@/components/explore/ExploreJobCard";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useFetchUser } from "@/hooks/useFetchUser";

const PAGE_SIZE = 10;

export default function ExploreJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useFetchUser();
  const [filters, setFilters] = useState<ExploreFilters>({
    location: "",
    roleTypes: [],
    company: "",
    platform: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("jobs_listings")
          .select("*");

        if (error) throw error;

        const mapped: Job[] = (data ?? []).map((row: any) => ({
          id: String(row.id),
          jobTitle: row.job_title ?? "",
          company: row.company ?? "",
          location: row.location ?? "",
          salary: row.salary ?? "",
          roleType: row.role_type ?? "",
          postedAt: row.posted_at ?? "",
          description: row.description ?? "",
          applicantCount: row.applicant_count ?? "",
          expiresAt: row.expires_at ?? "",
          companyAddress: row.company_address ?? "",
          applyLink: row.apply_link ?? "",
          platform: row.platform ?? "",
          jobUrl: row.job_url ?? "",
        }));

        setJobs(mapped);
      } catch (err: any) {
        setError(err.message ?? "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (
        searchQuery &&
        !job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.company &&
        !job.company.toLowerCase().includes(filters.company.toLowerCase())
      ) {
        return false;
      }
      if (filters.roleTypes.length > 0 && !filters.roleTypes.includes(job.roleType)) {
        return false;
      }
      if (
        filters.platform &&
        !job.platform.toLowerCase().includes(filters.platform.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [jobs, searchQuery, filters]);

  // Reset to page 1 whenever filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const pagedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <ExploreFiltersSidebar filters={filters} onFiltersChange={setFilters} />

        <main className="flex-1 min-w-0 px-4 md:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
              Explore Jobs
            </h1>
            <p className="text-muted-foreground text-sm mb-5">
              Find your next opportunity
            </p>
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search by title, company, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-transparent border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-44 w-full rounded-xl bg-secondary" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-destructive text-base">{error}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <SlidersHorizontal size={13} />
                  Most recent
                </div>
              </div>

              {pagedJobs.length > 0 ? (
                <>
                  <div className="flex flex-col gap-4">
                    {pagedJobs.map((job) => (
                      <ExploreJobCard key={job.id} job={job} profileId={userId} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        Page {currentPage} of {totalPages} &mdash; showing{" "}
                        {(currentPage - 1) * PAGE_SIZE + 1}–
                        {Math.min(currentPage * PAGE_SIZE, filteredJobs.length)} of{" "}
                        {filteredJobs.length}
                      </p>

                      <div className="flex items-center gap-1 mx-auto sm:mx-0">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => p - 1)}
                          className="h-8 w-8 p-0 border-border text-muted-foreground bg-transparent hover:bg-secondary disabled:opacity-30"
                        >
                          <ChevronLeft size={14} />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(
                            (page) =>
                              page === 1 ||
                              page === totalPages ||
                              Math.abs(page - currentPage) <= 2
                          )
                          .reduce<(number | "...")[]>((acc, page, idx, arr) => {
                            if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                              acc.push("...");
                            }
                            acc.push(page);
                            return acc;
                          }, [])
                          .map((item, idx) =>
                            item === "..." ? (
                              <span
                                key={`ellipsis-${idx}`}
                                className="px-1 text-xs text-muted-foreground"
                              >
                                …
                              </span>
                            ) : (
                              <Button
                                key={item}
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(item as number)}
                                className={`h-8 w-8 p-0 text-xs border-border bg-transparent ${
                                  currentPage === item
                                    ? "text-primary-foreground border-primary bg-primary hover:bg-primary/90"
                                    : "text-muted-foreground hover:bg-secondary"
                                }`}
                              >
                                {item}
                              </Button>
                            )
                          )}

                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((p) => p + 1)}
                          className="h-8 w-8 p-0 border-border text-muted-foreground bg-transparent hover:bg-secondary disabled:opacity-30"
                        >
                          <ChevronRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-muted-foreground text-base">
                    No jobs match your filters.
                  </p>
                  <p className="text-muted-foreground/60 text-sm mt-1">
                    Try adjusting your search or clearing some filters.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
