import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
const ConfirmDeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  itemDescription,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose} className='rounded-md'>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center flex-col">
            <img
              src="/alert.png"
              alt="alert"
              width={100}
              height={100}
              className="mb-2"
            />
            Are you sure?{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone.
            <br />
            This will permanently delete <p className="font-bold text-red-400 capitalize ">{itemDescription}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:flex md:justify-center md:flex-col md:w-full md:gap-2">
          <AlertDialogCancel className="bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background transition-all duration-300 ease-in" onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700 transition-all w-full duration-300 ease-in -ml-2"
            onClick={onConfirm}
            style={{marginLeft: 0}}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
