"use client"

import { useState } from "react"
import { CarList } from "@/components/car-list"
import { CarForm } from "@/components/car-form"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"


// Sample initial data


export default function Company() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCar, setCurrentCar] = useState<any>(null)

  // Filter cars based on search query
 

  // Add a new car
  const handleAddCar = (car: any) => {
    const newCar = {
      id: Date.now().toString(),
      ...car,
    }
    
    setIsAddModalOpen(false)
  }

  // Update an existing car
  // const handleUpdateCar = (updatedCar: any) => {
  //   const postCars = async ()=> {
  //     const cars = post<any>("cars/")
  //   }
  //   setIsEditModalOpen(false)
  // }

  // Delete a car
  // const handleDeleteCar = () => {

  //   setIsDeleteDialogOpen(false)
  // }

  // Open edit modal with car data
  const handleEditClick = (car: any) => {
    setCurrentCar(car)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation dialog
  const handleDeleteClick = (car: any) => {
    setCurrentCar(car)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">Car Management Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cars..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Car
          </Button>
        </div>

        <CarList onEdit={handleEditClick} onDelete={handleDeleteClick} />

        {isAddModalOpen && (
          <CarForm
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add New Car"
          />
        )}

        {isEditModalOpen && currentCar && (
          <CarForm
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            initialData={currentCar}
            title="Edit Car"
          />
        )}

        {isDeleteDialogOpen && currentCar && (
          <DeleteConfirmDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            car={currentCar}
          />
        )}
      </main>
    </div>
  )
}

