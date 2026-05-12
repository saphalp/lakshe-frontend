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
      <div className="flex w-full px-40">
        <ExploreFiltersSidebar filters={filters} onFiltersChange={setFilters} />

        <main className="flex-1 min-w-0 p-10 text-white">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1">Explore Jobs</h1>
            <p className="text-gray-400 text-sm mb-5">Find your next opportunity</p>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search by title, company, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-gray-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-44 w-full rounded-xl bg-gray-800" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-red-400 text-base">{error}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-400">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
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
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                      <p className="text-xs text-gray-500">
                        Page {currentPage} of {totalPages} &mdash; showing{" "}
                        {(currentPage - 1) * PAGE_SIZE + 1}–
                        {Math.min(currentPage * PAGE_SIZE, filteredJobs.length)} of{" "}
                        {filteredJobs.length}
                      </p>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => p - 1)}
                          className="h-8 w-8 p-0 border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 disabled:opacity-30"
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
                              <span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-500">
                                …
                              </span>
                            ) : (
                              <Button
                                key={item}
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(item as number)}
                                className={`h-8 w-8 p-0 text-xs border-gray-600 bg-transparent ${
                                  currentPage === item
                                    ? "text-white border-indigo-500 bg-indigo-600 hover:bg-indigo-700"
                                    : "text-gray-300 hover:bg-gray-800"
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
                          className="h-8 w-8 p-0 border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 disabled:opacity-30"
                        >
                          <ChevronRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-gray-400 text-base">No jobs match your filters.</p>
                  <p className="text-gray-500 text-sm mt-1">
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
