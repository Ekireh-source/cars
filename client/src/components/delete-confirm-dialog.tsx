"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteRequest } from "@/lib/fetch"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  car: {
    id: any
    make: string
    model: string
    price: number
  }
}

export function DeleteConfirmDialog({ isOpen, onClose, car }: DeleteConfirmDialogProps) {

  const handleDeleteCar = async () => {
    const deleteCar = await deleteRequest(`cars/${car.id}/`)
    onClose();
    
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the {car.make} {car.model} ({car.price}) from your database. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCar} className="bg-destructive text-destructive-foreground">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

