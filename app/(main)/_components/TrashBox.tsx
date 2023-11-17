"use client";

import { Spinner } from "@/components/Spinner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (id: string) => {
    router.push(`/documents/${id}`);
  };

  const onRestore = (e: React.MouseEvent, documentId: Id<"documents">) => {
    e.stopPropagation();
    const promse = restore({ id: documentId });
    toast.promise(promse, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Error restoring Note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promse = remove({ id: documentId });
    toast.promise(promse, {
      loading: "Removing note...",
      success: "Note removed",
      error: "Error removing Note",
    });
    if (params.documentId === documentId) router.push("/documents");
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page Title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foregroundpb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
            className="text-sm text-primary  w-full flex items-center justify-between rounded-sm hover:bg-primary/5 cursor-pointer"
          >
            <span className="flex-1 truncate px-2">{doc.title}</span>
            <div className="flex item-center">
              <div
                role="button"
                onClick={(e) => onRestore(e, doc._id)}
                className="rounded-sm p-2 hover:bg-neutral-200  dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
