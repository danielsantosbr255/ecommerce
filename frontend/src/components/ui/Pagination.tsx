import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const MAX_PAGES_DISPLAYED = 20;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
  pageSize: number;
}

interface PaginationLinkProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  ariaLabel: string;
}

const ArrowPagination = ({ href, children, disabled, ariaLabel }: PaginationLinkProps) => {
  if (disabled) {
    return (
      <span className={`text-primary/50 p-2 cursor-not-allowed`} aria-disabled="true" aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className="text-primary p-2" aria-label={ariaLabel}>
      {children}
    </Link>
  );
};

const PaginationLink = ({ href, children, disabled, isActive, ariaLabel }: PaginationLinkProps) => {
  const commonClasses = `px-3 py-1 rounded shadow transition-colors duration-200`;
  const activeClasses = `bg-primary text-white`;
  const inactiveClasses = `bg-white text-primary hover:bg-gray-100`;
  const disabledClasses = `bg-gray-200 text-gray-500 cursor-not-allowed`;

  if (disabled) {
    return (
      <span className={`${commonClasses} ${disabledClasses}`} aria-disabled="true" aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "page" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

const Pagination = ({ currentPage, totalPages, query, pageSize }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfMaxDisplayed = Math.floor(MAX_PAGES_DISPLAYED / 2);
    let startPage = Math.max(1, currentPage - halfMaxDisplayed);
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    // Ajusta startPage e endPage para garantir que MAX_PAGES_DISPLAYED sejam exibidas
    if (endPage - startPage + 1 < MAX_PAGES_DISPLAYED) {
      startPage = Math.max(1, endPage - MAX_PAGES_DISPLAYED + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className="flex items-center justify-center gap-2">
      {/* Botão de página anterior */}
      <ArrowPagination
        href={`/search?q=${query}&page=${currentPage - 1}&pageSize=${pageSize}`}
        disabled={currentPage <= 1}
        ariaLabel="Página anterior"
      >
        <IoIosArrowBack />
      </ArrowPagination>

      {/* Números das páginas */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1 text-primary">
            ...
          </span>
        ) : (
          <PaginationLink
            key={page}
            href={`/search?q=${query}&page=${page}&pageSize=${pageSize}`}
            isActive={currentPage === page}
            ariaLabel={`Página ${page}`}
          >
            {page}
          </PaginationLink>
        )
      )}

      {/* Botão de próxima página */}
      <ArrowPagination
        href={`/search?q=${query}&page=${currentPage + 1}&pageSize=${pageSize}`}
        disabled={currentPage >= totalPages}
        ariaLabel="Próxima página"
      >
        <IoIosArrowBack className="rotate-180" />
      </ArrowPagination>
    </section>
  );
};

export default Pagination;
