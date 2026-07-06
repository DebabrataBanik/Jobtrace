import { useState, useEffect } from "react";
import { getPageSizeByWidth } from "../utils/getPageSizeByWidth";
import { type PaginationState } from "@tanstack/react-table";

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: getPageSizeByWidth(window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      setPagination((prev) => ({
        ...prev,
        pageSize: getPageSizeByWidth(window.innerWidth),
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { pagination, setPagination };
}
