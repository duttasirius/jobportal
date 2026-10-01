import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );

  const [filterCompany, setFilterCompany] = useState([]);

  // for search result & shows company based on search
  useEffect(() => {
    // Runs whenever the companies list changes
    // OR whenever the user types something in the search input.
    // Dependency array:
    // companies            -> Redux companies data
    // searchCompanyByText  -> Search text from Redux

    // If the search box is empty (or contains only spaces),
    // don't filter anything.
    // Example:
    // ""      -> true
    // "   "   -> true (trim() removes spaces)
    if (!searchCompanyByText.trim()) {
      // Show all companies.
      setFilterCompany(companies);

      // Stop executing the rest of the code.
      return;
    }

    // If the search box has text,
    // filter the companies array.
    const filteredCompany = companies.filter((company) =>
      // For every company:
      // 1. Convert company name to lowercase.
      // 2. Convert search text to lowercase.
      // 3. Check if company name contains the search text.
      //
      // Example:
      // Company name: "Google"
      // Search text: "goo"
      //
      // "google".includes("goo") -> true
      //
      // Company name: "Microsoft"
      // Search text: "goo"
      //
      // "microsoft".includes("goo") -> false
      company.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()),
    );

    // Save only the matching companies
    // into local state so the table displays them.
    setFilterCompany(filteredCompany);

    // This effect runs again whenever:
    // - companies changes
    // - searchCompanyByText changes
  }, [companies, searchCompanyByText]);

  return (
    <div className="rounded-xl border bg-white shadow-sm px-10">
      <Table>
        <TableCaption className="pb-4">
          A list of your registered companies.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>
                        {company.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <p className="font-medium">{company.name}</p>
                  </div>
                </TableCell>

                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-md p-2 hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="cursor-pointer gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="py-6 text-center text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
